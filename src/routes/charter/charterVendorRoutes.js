const router = require('express').Router();
const { Prisma } = require('../../../generated/prisma');
const verifyToken = require('../../middlewares/vendorauthmiddleware');
const prisma = require('../../prisma');
const {addDays} = require('date-fns')

function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}
router.post('/new', verifyToken, async (req, res) => {
  try {
      const {
          jetName,
          aircraftType,
          manufacturer,
          yearOfManufacture,
          registrationNumber,
          seatingCapacity,
          cabinConfiguration,
          maximumRange,
          cruisingSpeed,
          baggageCapacity,
          homeBase,
          availableRoutes,
          operatingDays,
          noticeRequired,
          pricePerHour,
          minimumFlightTime,
          tripOption,
          additionalFees,
          discounts,
          cabinFeatures,
          inFlightMeals,
          flightAttendant,
          petsAllowed,
          smokingAllowed,
          exteriorImages,
          interiorImages,
          videoLink,
          luxuryCarService,
          transactionSignature,
          transactionLink,
      } = req.body;

      // Basic validation for required fields
      const requiredFields = {
          jetName,
          aircraftType,
          manufacturer,
          yearOfManufacture,
          registrationNumber,
          seatingCapacity,
          cabinConfiguration,
          maximumRange,
          cruisingSpeed,
          baggageCapacity,
          homeBase,
          availableRoutes,
          operatingDays,
          noticeRequired,
          pricePerHour,
          minimumFlightTime,
          tripOption,
          transactionSignature,
          transactionLink,
      };

      const missingFields = Object.entries(requiredFields)
          .filter(([_, value]) => !value)
          .map(([key]) => key);

      if (missingFields.length > 0) {
          return res.status(400).json({
              error: 'Missing required fields',
              missingFields,
          });
      }

      // Validate tripOption enum
      if (!['ROUND_TRIP', 'ONE_WAY', 'BOTH'].includes(tripOption)) {
          return res.status(400).json({ 
              error: 'Invalid tripOption value',
              validOptions: ['ROUND_TRIP', 'ONE_WAY', 'BOTH']
          });
      }

      // Validate additionalFees structure
      if (!Array.isArray(additionalFees)) {
          return res.status(400).json({ error: 'additionalFees must be an array' });
      }

      for (const fee of additionalFees) {
          if (!fee.name || !fee.price) {
              return res.status(400).json({ 
                  error: 'Each additional fee must have name and price',
                  invalidFee: fee
              });
          }
      }

      // Validate cabinFeatures is an array of strings
      if (!Array.isArray(cabinFeatures)) {
          return res.status(400).json({ error: 'cabinFeatures must be an array' });
      }

      // Validate media fields
      if (exteriorImages && !Array.isArray(exteriorImages)) {
          return res.status(400).json({ error: 'exteriorImages must be an array' });
      }

      if (interiorImages && !Array.isArray(interiorImages)) {
          return res.status(400).json({ error: 'interiorImages must be an array' });
      }

      // Validate year format
      if (isNaN(Number(yearOfManufacture)) || 
          Number(yearOfManufacture) < 1900 || 
          Number(yearOfManufacture) > new Date().getFullYear()) {
          return res.status(400).json({ 
              error: 'Invalid year of manufacture',
              validRange: `1900-${new Date().getFullYear()}`
          });
      }

      // Validate numeric fields
      const numericFields = {
          seatingCapacity,
          maximumRange,
          cruisingSpeed,
          pricePerHour,
          minimumFlightTime
      };

      for (const [field, value] of Object.entries(numericFields)) {
          if (isNaN(Number(value)) || Number(value) < 0) {
              return res.status(400).json({ 
                  error: `Invalid ${field} value`,
                  message: 'Must be a positive number'
              });
          }
      }

      // Create the jet in the database
      const jet = await prisma.jetForCharter.create({
          data: {
              jetName,
              aircraftType,
              manufacturer,
              yearOfManufacture,
              registrationNumber,
              seatingCapacity,
              cabinConfiguration,
              maximumRange,
              cruisingSpeed,
              baggageCapacity,
              homeBase,
              availableRoutes,
              operatingDays,
              noticeRequired,
              pricePerHour,
              minimumFlightTime,
              tripOption: tripOption.toUpperCase(), // Ensure enum case matches
              additionalFees: additionalFees || [],
              discounts: discounts || null,
              cabinFeatures: cabinFeatures || [],
              inFlightMeals: Boolean(inFlightMeals),
              flightAttendant: Boolean(flightAttendant),
              petsAllowed: Boolean(petsAllowed),
              smokingAllowed: Boolean(smokingAllowed),
              exteriorImages: exteriorImages || [],
              interiorImages: interiorImages || [],
              videoLink: videoLink || null,
              luxuryCarService: Boolean(luxuryCarService),
              vendorId:req.user.id,
              transactionLink,
              transactionSignature
          },
      });

      res.status(201).json({
        success:true,
          message: 'Jet created successfully',
          data:jet,
      });
  } catch (error) {
      console.error('Error creating jet:', error);
      
      // Handle Prisma specific errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
              return res.status(400).json({ 
                  error: 'Validation error',
                  details: 'A jet with this registration number already exists'
              });
          }
      }

      res.status(500).json({ 
          error: 'Failed to create jet',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});
router.get('/payment/recipient', verifyToken, async (req, res) => {
  try {
      const wallet = await prisma.wallet.findFirst();

      if (!wallet) {
          return res.status(404).send({
              success: false,
              message: "No wallet found"
          });
      }

      res.status(200).send({
          success: true,
          data: wallet
      });
  } catch (error) {
      res.status(500).send({
          success: false,
          message: error.message
      });
  }
});
router.get('/preview/:id', verifyToken, async(req,res) => {
  try {
      if (!checkUUID(req.user.id)) {
          return res.status(400).json({
              success: false,
              message: "Invalid user ID format"
          });
      }
      if (!checkUUID(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID format"
        });
    }

      const jet = await prisma.jetForCharter.findUnique({
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
      const vendor = await prisma.vendor.findUnique({
          where:{id: req.user.id}
      })
      if (!vendor){
         return res.status(401).send({
              success:false,
              message:"Please Login Before U Can Preview This Page"
          })
      }
      if (vendor.id != jet.vendorId){
          return res.status(409).send({
              success:false,
              message:"You Can Not Preview Another Vendor's Listing"
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
router.get('/fleet', verifyToken, async(req,res) => {
    try {
        if (!checkUUID(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }
        const jets = await prisma.jetForCharter.findMany({
            where:{
                vendorId:req.user.id
            }
        })
        if(!jets){
           return res.status(404).send({
                success:false,
                message:"Listing Not Found"
            })
        }
        const vendor = await prisma.vendor.findUnique({
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
            data:jets
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal Server error " + error.message 
        })
    }
})
router.get('/bookings', verifyToken, async(req,res) => {
    try {
        if (!checkUUID(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }
        const messages = await prisma.jetForCharterMessages.findMany({
            where:{
                vendorId:req.user.id
            }
        })
        if (messages.length == 0){
          return  res.status(200).send({
                success:false,
                messages:"No New Booking At The Moment"
            })
        }
        const vendor = await prisma.vendor.findUnique({
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
            data:messages
        })
    } catch (error) {
        res.send({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
})
router.put('/bookings/:id/read', verifyToken, async (req, res) => {
    try {
        // Validate user ID format
        if (!checkUUID(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        // Verify vendor exists
        const vendor = await prisma.vendor.findUnique({
            where: { id: req.user.id }
        });
        if (!vendor) {
            return res.status(401).json({
                success: false,
                message: "Please login before you can perform this action"
            });
        }

        // Validate message ID format
        const { id } = req.params;
        if (!checkUUID(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid message ID format"
            });
        }

        // Find the message and ensure it belongs to the vendor
        const message = await prisma.jetForCharterMessages.findUnique({
            where: { id }
        });

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        if (message.vendorId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to modify this message"
            });
        }

        // Check if message is already marked as read
        if (message.read) {
            return res.status(400).json({
                success: false,
                message: "Message is already marked as read"
            });
        }

        // Update message to mark as read
        const updatedMessage = await prisma.jetForCharterMessages.update({
            where: { id },
            data: { read: true }
        });

        // Return success response
        res.status(200).json({
            success: true,
            message: "Message marked as read",
            data: updatedMessage
        });
    } catch (error) {
        // Enhanced error handling for internal server errors
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
router.put('/:id', verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const {
        jetName,
        aircraftType,
        manufacturer,
        yearOfManufacture,
        registrationNumber,
        seatingCapacity,
        cabinConfiguration,
        maximumRange,
        cruisingSpeed,
        baggageCapacity,
        homeBase,
        availableRoutes,
        operatingDays,
        noticeRequired,
        pricePerHour,
        minimumFlightTime,
        tripOption,
        additionalFees,
        discounts,
        cabinFeatures,
        inFlightMeals,
        flightAttendant,
        petsAllowed,
        smokingAllowed,
        exteriorImages,
        interiorImages,
        videoLink,
        luxuryCarService,
      } = req.body;
  
      // Basic validation for required fields
      const requiredFields = {
        jetName,
        aircraftType,
        manufacturer,
        yearOfManufacture,
        registrationNumber,
        seatingCapacity,
        cabinConfiguration,
        maximumRange,
        cruisingSpeed,
        baggageCapacity,
        homeBase,
        availableRoutes,
        operatingDays,
        noticeRequired,
        pricePerHour,
        minimumFlightTime,
        tripOption,
      };
  
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => value === undefined || value === null || value === '')
        .map(([key]) => key);
  
      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Missing required fields',
          missingFields,
        });
      }
  
      // Validate tripOption enum
      if (!['ROUND_TRIP', 'ONE_WAY', 'BOTH'].includes(tripOption)) {
        return res.status(400).json({
          error: 'Invalid tripOption value',
          validOptions: ['ROUND_TRIP', 'ONE_WAY', 'BOTH'],
        });
      }
  
      // Validate additionalFees structure
      if (additionalFees && !Array.isArray(additionalFees)) {
        return res.status(400).json({ error: 'additionalFees must be an array' });
      }
  
      if (additionalFees) {
        for (const fee of additionalFees) {
          if (!fee.name || fee.price == null) {
            return res.status(400).json({
              error: 'Each additional fee must have name and price',
              invalidFee: fee,
            });
          }
        }
      }
  
      // Validate cabinFeatures is an array of strings
      if (cabinFeatures && !Array.isArray(cabinFeatures)) {
        return res.status(400).json({ error: 'cabinFeatures must be an array' });
      }
  
      // Validate media fields
      if (exteriorImages && !Array.isArray(exteriorImages)) {
        return res.status(400).json({ error: 'exteriorImages must be an array' });
      }
  
      if (interiorImages && !Array.isArray(interiorImages)) {
        return res.status(400).json({ error: 'interiorImages must be an array' });
      }
  
      // Validate year format
      if (
        isNaN(Number(yearOfManufacture)) ||
        Number(yearOfManufacture) < 1900 ||
        Number(yearOfManufacture) > new Date().getFullYear()
      ) {
        return res.status(400).json({
          error: 'Invalid year of manufacture',
          validRange: `1900-${new Date().getFullYear()}`,
        });
      }
  
      // Validate numeric fields
      const numericFields = {
        seatingCapacity,
        maximumRange,
        cruisingSpeed,
        pricePerHour,
        minimumFlightTime,
      };
  
      for (const [field, value] of Object.entries(numericFields)) {
        if (isNaN(Number(value)) || Number(value) < 0) {
          return res.status(400).json({
            error: `Invalid ${field} value`,
            message: 'Must be a positive number',
          });
        }
      }
  
      // Check if jet exists and belongs to the vendor
      const existingJet = await prisma.jetForCharter.findUnique({
        where: { id },
      });
  
      if (!existingJet) {
        return res.status(404).json({
          error: 'Jet not found',
        });
      }
  
      if (existingJet.vendorId !== req.user.id) {
        return res.status(403).json({
          error: 'Unauthorized to edit this jet listing',
        });
      }
  
      // Update the jet in the database
      const updatedJet = await prisma.jetForCharter.update({
        where: { id },
        data: {
          jetName,
          aircraftType,
          manufacturer,
          yearOfManufacture,
          registrationNumber,
          seatingCapacity,
          cabinConfiguration,
          maximumRange,
          cruisingSpeed,
          baggageCapacity,
          homeBase,
          availableRoutes,
          operatingDays,
          noticeRequired,
          pricePerHour,
          minimumFlightTime,
          tripOption: tripOption.toUpperCase(),
          additionalFees: additionalFees || [],
          discounts: discounts || null,
          cabinFeatures: cabinFeatures || [],
          inFlightMeals: Boolean(inFlightMeals),
          flightAttendant: Boolean(flightAttendant),
          petsAllowed: Boolean(petsAllowed),
          smokingAllowed: Boolean(smokingAllowed),
          exteriorImages: exteriorImages || [],
          interiorImages: interiorImages || [],
          videoLink: videoLink || null,
          luxuryCarService: Boolean(luxuryCarService),
          vendorId: req.user.id,
        },
      });
  
      res.status(200).json({
        success: true,
        message: 'Jet updated successfully',
        data: updatedJet,
      });
    } catch (error) {
      console.error('Error updating jet:', error);
  
      // Handle Prisma specific errors
      if (error instanceof PrismaClient.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({
            error: 'Validation error',
            details: 'A jet with this registration number already exists',
          });
        }
        if (error.code === 'P2025') {
          return res.status(404).json({
            error: 'Jet not found',
          });
        }
      }
  
      res.status(500).json({
        error: 'Failed to update jet',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
});
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if jet exists and belongs to the vendor
    const existingJet = await prisma.jetForCharter.findUnique({
      where: { id },
    });

    if (!existingJet) {
      return res.status(404).json({
        error: 'Jet not found',
      });
    }

    if (existingJet.vendorId !== req.user.id) {
      return res.status(403).json({
        error: 'Unauthorized to delete this jet listing',
      });
    }

    // Delete all related messages from jetForCharterMessages
    await prisma.jetForCharterMessages.deleteMany({
      where: { listingId:id },
    });

    // Delete the jet from the database
    await prisma.jetForCharter.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Jet and related messages deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting jet:', error);

    // Handle Prisma specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Jet not found',
        });
      }
    }

    res.status(500).json({
      error: 'Failed to delete jet',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});
;router.put('/boost/:id', verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { plan, duration } = req.body;
      const userId = req.user?.id; // Assuming verifyToken adds user to req
  
      // Validate inputs
      if (!userId) {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized: User not authenticated',
        });
      }
  
      if (!plan || !duration) {
        return res.status(400).send({
          success: false,
          message: 'Plan and duration are required',
        });
      }
  
      // Validate plan
      const validPlans = ['Basic', 'Premium', 'Ultimate'];
      if (!validPlans.includes(plan)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid boost plan',
        });
      }
  
      // Validate duration
      const planDurations = {
        'Basic': 7,
        'Premium': 14,
        'Ultimate': 30,
      };
      if (planDurations[plan] !== parseInt(duration)) {
        return res.status(400).send({
          success: false,
          message: `Invalid duration for ${plan}. Expected ${planDurations[plan]} days`,
        });
      }
  
      // Find the aircraft listing
      const aircraft = await prisma.jetForCharter.findUnique({
        where: { id },
      });
  
      if (!aircraft) {
        return res.status(404).send({
          success: false,
          message: 'Aircraft listing not found',
        });
      }
  
      // Verify ownership
      if (aircraft.vendorId !== userId) {
        return res.status(403).send({
          success: false,
          message: 'Forbidden: You do not own this listing',
        });
      }
  
      // Check if already boosted
      if (aircraft.isBoosted && aircraft.end_date > new Date()) {
        return res.status(400).send({
          success: false,
          message: 'Aircraft is already boosted until ' + aircraft.end_date.toISOString(),
        });
      }
  
      // Calculate end date
      const endDate = addDays(new Date(), parseInt(duration));
  
      // Update aircraft listing
      const updatedAircraft = await prisma.jetForCharter.update({
        where: { id },
        data: {
          sponsored: true,
          sponsoredType: plan,
          end_date: endDate,
        },
      });
  
      res.status(200).send({
        success: true,
        message: 'Aircraft boosted successfully',
        data: {
          id: updatedAircraft.id,
          isBoosted: updatedAircraft.isBoosted,
          sponsoredType: updatedAircraft.sponsoredType,
          end_date: updatedAircraft.end_date,
        },
      });
    } catch (error) {
      console.error('Error boosting aircraft:', error);
      res.status(500).send({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });
module.exports = router

