const router = require('express').Router();
const checkAuth = require('../../middlewares/authmiddleware');
const prisma = require('../../prisma');
function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}
router.get('/index', checkAuth, async (req, res) => {
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
router.get('/:id', checkAuth, async(req,res) => {
    try {
        if (!checkUUID(req.user.id)) {
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

module.exports = router

