const router = require('express').Router();
const checkAuth = require('../../middlewares/authmiddleware');
const prisma = require('../../prisma');
const validator = require('validator')
function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}
router.get('/index',  async (req, res) => {
    try {
        const jets = await prisma.jetForCharter.findMany({
            where: {
                status: 'APPROVED' // Only fetch jets with APPROVED status
            }
        });

        res.status(200).send({
            success: true,
            message: "Approved jet listings retrieved successfully",
            data: jets
        });

    } catch (error) {
        console.error("Error fetching approved jets:", error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
router.get('/:id', async(req,res) => {
    try {
        if (!checkUUID(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        const jet = await prisma.jetForCharter.findUnique({
            where:{
                id:req.params.id,
                status:"APPROVED"
            }
        })
        if(!jet){
           return res.status(404).send({
                success:false,
                message:"Listing Not Found"
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

router.post('/messages/new', async (req, res) => {
    try {
      // Extract data from request body
      const {
        customerName,
        customerEmail,
        customerCountry,
        departureLocation,
        arrivalLocation,
        departureDate,
        returnDate,
        passengerCount,
        specialRequests,
        listingId,
        vendorId,
      } = req.body;
  
      // Validation
      const errors = {};
  
      if (!customerName?.trim()) errors.customerName = 'Full name is required';
      if (!customerEmail?.trim()) {
        errors.customerEmail = 'Email is required';
      } else if (!validator.isEmail(customerEmail)) {
        errors.customerEmail = 'Invalid email format';
      }
      if (!departureLocation?.trim())
        errors.departureLocation = 'Departure location is required';
      if (!arrivalLocation?.trim())
        errors.arrivalLocation = 'Arrival location is required';
      if (!departureDate) {
        errors.departureDate = 'Departure date is required';
      } else if (new Date(departureDate) < new Date().setHours(0, 0, 0, 0)) {
        errors.departureDate = 'Departure date cannot be in the past';
      }
      if (!passengerCount) {
        errors.passengerCount = 'Number of passengers is required';
      } else if (!Number.isInteger(Number(passengerCount)) || Number(passengerCount) <= 0) {
        errors.passengerCount = 'Passenger count must be a positive integer';
      }
      if (returnDate && new Date(returnDate) < new Date(departureDate)) {
        errors.returnDate = 'Return date must be after departure date';
      }
      if (!listingId) errors.listingId = 'Listing ID is required';
      if (!vendorId) errors.vendorId = 'Vendor ID is required';
  
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }
  
      // Create new message
      const newMessage = await prisma.jetForCharterMessages.create({
        data: {
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerCountry: customerCountry?.trim() || null,
          departureLocation: departureLocation.trim(),
          arrivalLocation: arrivalLocation.trim(),
          departureDate: new Date(departureDate),
          returnDate: returnDate ? new Date(returnDate) : null,
          passengerCount: Number(passengerCount),
          specialRequests: specialRequests?.trim() || null,
          listingId,
          vendorId,
        },
      });
  
      // Return success response
      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: newMessage,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.code === 'P2002') {
        // Prisma unique constraint violation
        res.status(400).json({
          success: false,
          message: 'A message with this data already exists',
        });
      } else if (error.code === 'P2003') {
        // Prisma foreign key constraint
        res.status(400).json({
          success: false,
          message: 'Invalid listing or vendor ID',
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Something went wrong',
        });
      }
    }
  });

module.exports = router

