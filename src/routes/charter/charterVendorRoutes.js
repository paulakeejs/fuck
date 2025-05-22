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


module.exports = router

