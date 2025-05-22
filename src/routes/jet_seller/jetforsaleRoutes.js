const router = require('express').Router();
const checkAuth = require('../../middlewares/authmiddleware');
const prisma = require('../../prisma');
function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}
router.get('/index', checkAuth, async (req, res) => {
    try {
        const jets = await prisma.jet.findMany(); // Fetches all jet records from the database

        res.status(200).send({
            success: true,
            message: "Jet listings retrieved successfully",
            data: jets // Returns the list of jets
        });

    } catch (error) {
        console.error("Error fetching jets:", error); // Log the error for debugging
        res.status(500).send({
            success: false, // Typically, success is false for errors
            message: "Internal Server Error",
            error: error.message // Send only the error message (avoid leaking sensitive details)
        });
    }
});

router.post('/messages/new', checkAuth, async (req, res) => {
    try {
      // Extract data from request body
      const { customerName, customerEmail, customerCountry, listingId, vendorId, message } = req.body;
  
      // Basic validation: ensure all required fields are present
      if (!customerName || !customerEmail || !customerCountry || !listingId || !vendorId || !message) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }
  
      // Create new message
      const newMessage = await prisma.jetForSaleMessages.create({
        data: {
          customerName,
          customerEmail,
          customerCountry,
          listingId,
          vendorId,
          message
        },
      });
  
      // Return success response
      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: newMessage,
      });
    } catch (error) {
      console.error('Error sending message:', error); // Log for debugging
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
});
router.get('/user/:id', async (req, res) => {
    try {
        if (!checkUUID(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        const vendor = await prisma.vendor.findUnique({
            where: { id: req.params.id },
            select: {
                id: true,
                companyName:true,
                brandImage:true,
                name: true,
                phone: true,
                status: true,
                description:true,
                serviceType:true,
                createdAt: true,
                website:true
            }
        });

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        // Check if vendor is approved
        if (vendor.status !== "APPROVED") {
            return res.status(403).json({
                success: false,
                message: "Vendor account not approved",
                status: vendor.status
            });
        }

        return res.status(200).json({
            success: true,
            message: "Vendor verified successfully",
            vendor: vendor
        });

    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during verification",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get('/:id', checkAuth, async(req,res) => {
    try {
        if (!checkUUID(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        const jet = await prisma.jet.findUnique({
            where:{
                id:req.params.id
            }
        })
        if(!jet){
           return res.status(404).send({
                success:false,
                message:"Listing Not Found"
            })
        }
        const vendor = await prisma.user.findUnique({
            where:{id: req.user.id}
        })
        if (!vendor){
           return res.status(401).send({
                success:false,
                message:"Please Login Before U Can Preview This Page"
            })
        }
        res.status(200).send({
            success:true,
            data:jet
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal Server error " + error.message 
        })
    }
})
router.put('/views/:id', checkAuth, async (req, res) => {
    try {
        const { id } = req.params;

        // Find the jet and increment its views count
        const updatedJet = await prisma.jet.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        res.status(200).send({
            success: true,
            message: "View count updated successfully",
            data: updatedJet
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
router.get("/seller/:id", checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const jets = await prisma.jet.findMany({
      where: { vendorId: id },
    });

    if (!jets.length) {
      return res.status(404).json({
        success: false,
        message: "No jets",
      });
    }

    res.json({
      success: true,
      message: "Jets retrieved",
      data: jets,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});
   
module.exports = router

