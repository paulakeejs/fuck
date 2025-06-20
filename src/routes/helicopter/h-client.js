const router = require('express').Router();
const verifyToken = require('../../middlewares/vendorauthmiddleware');
const prisma = require('../../prisma');
const {addDays} = require('date-fns')

function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

router.get('/vendor/:id', async (req, res) => {
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
                country:true,
                website:true,
                name: true,
                email: true,
                phone: true,
                status: true,
                serviceType:true,
                createdAt: true,
                brandImage:true
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
router.get('/listings', async (req, res) => {
    try {
      const listings = await prisma.helicopterForSaleListing.findMany({
        where: {
          status: {
            in: ['APPROVED', 'SOLD']
          }
        },
        include: {
          cabinFeatures: true
        }
      });
  
      return res.status(200).json({
        success: true,
        listings
      });
    } catch (error) {
      console.error('Error fetching helicopter listings:', error.message, error.stack);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
});
router.get('/helicopters/sale/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!checkUUID(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid helicopter ID format'
            });
        }
        const helicopter = await prisma.helicopterForSaleListing.findUnique({
            where: { id },
            include: {
                cabinFeatures: true
            }
        });
        if (!helicopter) {
            return res.status(404).json({
                success: false,
                message: 'Helicopter not found'
            });
        }
        return res.status(200).json({
            success: true,
            helicopter
        });
    } catch (error) {
        console.error('Error fetching helicopter sale info:', error.message, error.stack);
    }
});
router.post('/contact', async (req, res) => {
    try {
        const { customerName, customerEmail, customerCountry, message, vendorId, listingId } = req.body;
        const newMessage = await prisma.helicopterMessage.create({
            data: {
                customerName,
                customerEmail,
                customerCountry,
                message,
                vendorId,
                listingId
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully',
        });
    } catch (error) {
        console.error('Error submitting contact form:', error.message, error.stack);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.put('/views/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const helicopter = await prisma.helicopterForSaleListing.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
        return res.status(200).send({
            success: true,
        });
    } catch (error) {   
        console.error('Error updating helicopter listing status:', error.message, error.stack);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
router.get('/charter/all', async (req, res) => {
    try {
        const listings = await prisma.helicopterForCharter.findMany({
            where: {
                status: {
                    in: ['APPROVED']
                }
            }
        });
        return res.status(200).json({
            success: true,
            listings
        });
    } catch (error) {
        console.error('Error fetching helicopter charter listings:', error.message, error.stack);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get('/charter/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const helicopter = await prisma.helicopterForCharter.findUnique({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            helicopter
        });
    } catch (error) {
        console.error('Error fetching helicopter charter listing:', error.message, error.stack);
    }
});
router.post('/charter/book', async (req, res) => {
    try {
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
            vendorId
        } = req.body;

        // Validate required fields
        const requiredFields = [
            'customerName',
            'customerEmail',
            'customerCountry',
            'departureLocation',
            'arrivalLocation',
            'departureDate',
            'returnDate',
            'passengerCount',
            'listingId',
            'vendorId'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                missingFields
            });
        }

        // Validate UUIDs
        if (!checkUUID(listingId) || !checkUUID(vendorId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid listing ID or vendor ID format'
            });
        }

        // Validate dates
        const departure = new Date(departureDate);
        const returnD = new Date(returnDate);
        const today = new Date();

        if (isNaN(departure.getTime()) || isNaN(returnD.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format'
            });
        }

        if (departure < today) {
            return res.status(400).json({
                success: false,
                message: 'Departure date cannot be in the past'
            });
        }

        if (returnD <= departure) {
            return res.status(400).json({
                success: false,
                message: 'Return date must be after departure date'
            });
        }

        // Validate passenger count
        if (typeof passengerCount !== 'number' || passengerCount < 1) {
            return res.status(400).json({
                success: false,
                message: 'Invalid passenger count'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Check if charter listing exists and is approved
        const charterListing = await prisma.helicopterForCharter.findUnique({
            where: { id: listingId }
        });

        if (!charterListing) {
            return res.status(404).json({
                success: false,
                message: 'Charter listing not found'
            });
        }

        if (charterListing.status !== 'APPROVED') {
            return res.status(403).json({
                success: false,
                message: 'Charter listing is not available for booking'
            });
        }

        // Create the booking
        const newBooking = await prisma.helicopterForCharterMessages.create({
            data: {
                customerName,
                customerEmail,
                customerCountry,
                departureLocation,
                arrivalLocation,
                departureDate: departure,
                returnDate: returnD,
                passengerCount,
                specialRequests: specialRequests || '',
                listingId,
                vendorId,
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Charter booking request submitted successfully',
            booking: {
                id: newBooking.id,
                customerName: newBooking.customerName,
                departureDate: newBooking.departureDate,
                returnDate: newBooking.returnDate,
                status: newBooking.status
            }
        });

    } catch (error) {
        console.error('Error booking helicopter charter:', error.message, error.stack);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.put('/charter/:id/views', async (req, res) => {
    try {
        const { id } = req.params;
        const helicopter = await prisma.helicopterForCharter.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
        return res.status(200).json({
            success: true,
            message: 'Helicopter charter views updated successfully',
        });
    } catch (error) {
        console.error('Error updating helicopter charter views:', error.message, error.stack);
    }
});

module.exports = router

