const router = require('express').Router();
const verifyToken = require('../../middlewares/vendorauthmiddleware');
const prisma = require('../../prisma');
const {addDays} = require('date-fns')

function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

router.get('/user', verifyToken, async (req, res) => {
    try {
        if (!checkUUID(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        const vendor = await prisma.vendor.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                status: true,
                serviceType:true,
                createdAt: true,
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
                country:true,
                website:true,
                name: true,
                email: true,
                phone: true,
                status: true,
                serviceType:true,
                createdAt: true,
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
router.post('/helicopters/new', verifyToken, async (req, res) => {
    try {
      const {
        helicopterName,
        helicopterType,
        manufacturer,
        yearOfManufacture,
        registrationNumber,
        serialNumber,
        seatingCapacity,
        maximumRange,
        cruisingSpeed,
        baggageCapacity,
        condition,
        totalFlightHours,
        maintenanceHistory,
        lastInspection,
        salePrice,
        discounts,
        avionics,
        emergencyEquipment,
        cargoHook,
        exteriorImages = [],
        interiorImages = [],
        videoLink,
        additionalEquipment,
        transactionSignature,
        transactionLink,
        vendorId,
        cabinFeatures = []
      } = req.body;
  
      // Define required fields based on form
      const requiredFields = {
        helicopterName,
        helicopterType,
        manufacturer,
        yearOfManufacture,
        registrationNumber,
        serialNumber,
        seatingCapacity,
        maximumRange,
        cruisingSpeed,
        baggageCapacity,
        condition,
        totalFlightHours,
        maintenanceHistory,
        lastInspection,
        salePrice,
        transactionSignature,
        vendorId
      };
  
      // Validate required fields
      for (const [field, value] of Object.entries(requiredFields)) {
        if (value === undefined || value === null || value === '') {
          return res.status(400).json({
            success: false,
            error: `Missing required field: ${field}`
          });
        }
      }
  
      // Validate image requirements (minimum 1 interior, 1 exterior)
      if (interiorImages.length < 1 || exteriorImages.length < 1) {
        return res.status(400).json({
          success: false,
          error: `Please upload at least ${1 - interiorImages.length} more interior and ${1 - exteriorImages.length} more exterior images`
        });
      }
  
      // Parse numeric fields
      const parsedYearOfManufacture = parseInt(yearOfManufacture);
      const parsedSeatingCapacity = parseInt(seatingCapacity);
      const parsedMaximumRange = parseFloat(maximumRange);
      const parsedCruisingSpeed = parseFloat(cruisingSpeed);
      const parsedTotalFlightHours = parseFloat(totalFlightHours);
      const parsedSalePrice = parseFloat(salePrice);
  
      // Validate parsed numbers
      const numericValidations = {
        yearOfManufacture: parsedYearOfManufacture,
        seatingCapacity: parsedSeatingCapacity,
        maximumRange: parsedMaximumRange,
        cruisingSpeed: parsedCruisingSpeed,
        totalFlightHours: parsedTotalFlightHours,
        salePrice: parsedSalePrice
      };
  
      for (const [field, value] of Object.entries(numericValidations)) {
        if (isNaN(value)) {
          return res.status(400).json({
            success: false,
            error: `Invalid numeric value for field: ${field}`
          });
        }
      }
  
      // Validate date
      const parsedLastInspection = new Date(lastInspection);
  
      if (isNaN(parsedLastInspection.getTime())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid last inspection date'
        });
      }
  
      // Validate cabin features
      if (!Array.isArray(cabinFeatures)) {
        return res.status(400).json({
          success: false,
          error: 'Cabin features must be an array'
        });
      }
  
      // Create the helicopter listing
      const newListing = await prisma.helicopterForSaleListing.create({
        data: {
          helicopterName,
          helicopterType,
          manufacturer,
          yearOfManufacture: parsedYearOfManufacture,
          registrationNumber,
          serialNumber,
          seatingCapacity: parsedSeatingCapacity,
          maximumRange: parsedMaximumRange,
          cruisingSpeed: parsedCruisingSpeed,
          baggageCapacity,
          condition,
          totalFlightHours: parsedTotalFlightHours,
          maintenanceHistory,
          lastInspection: parsedLastInspection,
          salePrice: parsedSalePrice,
          discounts: discounts || null,
          avionics: avionics || null,
          emergencyEquipment: !!emergencyEquipment,
          cargoHook: !!cargoHook,
          exteriorImageUrls:exteriorImages,
          interiorImageUrls:interiorImages,
          videoLink: videoLink || null,
          additionalEquipment: additionalEquipment || null,
          transactionSignature,
          transactionLink: transactionLink || null,
          vendorId,
          status: 'PENDING',
          cabinFeatures: {
            connectOrCreate: cabinFeatures.map(name => ({
              where: { name },
              create: { name }
            }))
          }
        }
      });
  
      res.status(200).json({
        success: true,
        message: 'Helicopter listing created successfully',
        helicopter: newListing
      });
  
    } catch (error) {
      console.error('Error creating helicopter listing:', error.message, error.stack);
  
      switch (error.code) {
        case 'P2002':
          if (error.meta?.target?.includes('registration_number')) {
            return res.status(409).json({
              success: false,
              message: 'A helicopter with this registration number already exists'
            });
          } else if (error.meta?.target?.includes('serial_number')) {
            return res.status(409).json({
              success: false,
              message: 'A helicopter with this serial number already exists'
            });
          }
          break;
  
        case 'P2003':
          return res.status(404).json({
            success: false,
            message: 'Vendor not found'
          });
  
        default:
          return res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          });
      }
    }
});
router.get('/preview/:id', verifyToken, async (req, res) => {
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
                cabinFeatures: {
                    select: {
                        name: true
                    }
                }
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
        console.error('Error fetching helicopter preview:', error.message, error.stack);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
router.put('/sales/:id/boost', verifyToken, async (req, res) => {
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
      const validPlans = ['Basic Boost', 'Pro Boost', 'Elite Boost'];
      if (!validPlans.includes(plan)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid boost plan',
        });
      }
  
      // Validate duration
      const planDurations = {
        'Basic Boost': 7,
        'Pro Boost': 14,
        'Elite Boost': 30,
      };
      
      if (planDurations[plan] !== parseInt(duration)) {
        return res.status(400).send({
          success: false,
          message: `Invalid duration for ${plan}. Expected ${planDurations[plan]} days`,
        });
      }
  
      // Find the jet listing
      const jet = await prisma.helicopterForSaleListing.findUnique({
        where: { id },
      });
  
      if (!jet) {
        return res.status(404).send({
          success: false,
          message: 'Jet listing not found',
        });
      }
  
      // Verify ownership
      if (jet.vendorId !== userId) {
        return res.status(403).send({
          success: false,
          message: 'Forbidden: You do not own this listing',
        });
      }
  
      // Check if already sponsored
      if (jet.sponsored && jet.endDate > new Date()) {
        return res.status(400).send({
          success: false,
          message: 'Listing is already boosted until ' + jet.end_date.toISOString(),
        });
      }
  
      // Calculate end date
      const endDate = addDays(new Date(), parseInt(duration));
  
      // Update jet listing
      const updatedJet = await prisma.helicopterForSaleListing.update({
        where: { id },
        data: {
          sponsored: true,
          sponsoredType: plan,
          endDate: endDate,
        },
      });
  
      res.status(200).send({
        success: true,
        message: 'Listing boosted successfully',
        data: {
          id: updatedJet.id,
          sponsored: updatedJet.sponsored,
          sponsoredType: updatedJet.sponsoredType,
          end_date: updatedJet.end_date,
        },
      });
    } catch (error) {
      console.error('Error boosting listing:', error);
      res.status(500).send({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
});
router.delete('/sales/:id', verifyToken, async (req, res) => {
  try {
      const { id } = req.params;
      const userId = req.user?.id;

      // Check if the listing exists
      const helicopter = await prisma.helicopterForSaleListing.findUnique({
          where: { id },
      });

      if (!helicopter) {
          return res.status(404).send({
              success: false,
              message: 'Helicopter not found',
          });
      }

      // Verify ownership
      if (helicopter.vendorId !== userId) {
          return res.status(403).send({
              success: false,
              message: 'Forbidden: You do not own this listing',
          });
      }

      // Delete the listing and related messages in a transaction
      await prisma.$transaction([
          prisma.helicopterMessage.deleteMany({
              where: { listingId: id },
          }),
          prisma.helicopterForSaleListing.delete({
              where: { id },
          }),
      ]);

      return res.status(200).send({
          success: true,
          message: 'Helicopter listing and related messages deleted successfully',
      });
  } catch (error) {
      console.error('Error deleting helicopter listing:', error.message, error.stack);
      return res.status(500).send({
          success: false,
          message: 'Internal Server Error',
          error: error.message,
      });
  }
});
router.put('/sales/:id', verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const {
        helicopterName,
        helicopterType,
        manufacturer,
        yearOfManufacture,
        registrationNumber,
        serialNumber,
        seatingCapacity,
        maximumRange,
        cruisingSpeed,
        baggageCapacity,
        condition,
        totalFlightHours,
        maintenanceHistory,
        lastInspection,
        salePrice,
        discounts,
        avionics,
        emergencyEquipment,
        cargoHook,
        exteriorImages = [],
        interiorImages = [],
        videoLink,
        additionalEquipment,
        vendorId,
        cabinFeatures = []
      } = req.body;
  
      // Verify listing exists and belongs to vendor
      const existingListing = await prisma.helicopterForSaleListing.findUnique({
        where: { id },
        select: { vendorId: true }
      });
  
      if (!existingListing) {
        return res.status(404).json({
          success: false,
          error: 'Helicopter listing not found'
        });
      }
  
      if (existingListing.vendorId !== vendorId) {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized: You can only update your own listings'
        });
      }
  
      // Define required fields based on form
      const requiredFields = {
        helicopterName,
        helicopterType,
        manufacturer,
        yearOfManufacture,
        registrationNumber,
        serialNumber,
        seatingCapacity,
        maximumRange,
        cruisingSpeed,
        baggageCapacity,
        condition,
        totalFlightHours,
        maintenanceHistory,
        lastInspection,
        salePrice,
        vendorId
      };
  
      // Validate required fields
      for (const [field, value] of Object.entries(requiredFields)) {
        if (value === undefined || value === null || value === '') {
          return res.status(400).json({
            success: false,
            error: `Missing required field: ${field}`
          });
        }
      }
  
      // Validate image requirements (minimum 1 interior, 1 exterior)
      if (interiorImages.length < 1 || exteriorImages.length < 1) {
        return res.status(400).json({
          success: false,
          error: `Please upload at least ${1 - interiorImages.length} more interior and ${1 - exteriorImages.length} more exterior images`
        });
      }
  
      // Parse numeric fields
      const parsedYearOfManufacture = parseInt(yearOfManufacture);
      const parsedSeatingCapacity = parseInt(seatingCapacity);
      const parsedMaximumRange = parseFloat(maximumRange);
      const parsedCruisingSpeed = parseFloat(cruisingSpeed);
      const parsedTotalFlightHours = parseFloat(totalFlightHours);
      const parsedSalePrice = parseFloat(salePrice);
  
      // Validate parsed numbers
      const numericValidations = {
        yearOfManufacture: parsedYearOfManufacture,
        seatingCapacity: parsedSeatingCapacity,
        maximumRange: parsedMaximumRange,
        cruisingSpeed: parsedCruisingSpeed,
        totalFlightHours: parsedTotalFlightHours,
        salePrice: parsedSalePrice
      };
  
      for (const [field, value] of Object.entries(numericValidations)) {
        if (isNaN(value)) {
          return res.status(400).json({
            success: false,
            error: `Invalid numeric value for field: ${field}`
          });
        }
      }
  
      // Validate date
      const parsedLastInspection = new Date(lastInspection);
  
      if (isNaN(parsedLastInspection.getTime())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid last inspection date'
        });
      }
  
      // Validate cabin features
      if (!Array.isArray(cabinFeatures)) {
        return res.status(400).json({
          success: false,
          error: 'Cabin features must be an array'
        });
      }
  
      // Update the helicopter listing
      const updatedListing = await prisma.helicopterForSaleListing.update({
        where: { id },
        data: {
          helicopterName,
          helicopterType,
          manufacturer,
          yearOfManufacture: parsedYearOfManufacture,
          registrationNumber,
          serialNumber,
          seatingCapacity: parsedSeatingCapacity,
          maximumRange: parsedMaximumRange,
          cruisingSpeed: parsedCruisingSpeed,
          baggageCapacity,
          condition,
          totalFlightHours: parsedTotalFlightHours,
          maintenanceHistory,
          lastInspection: parsedLastInspection,
          salePrice: parsedSalePrice,
          discounts: discounts || null,
          avionics: avionics || null,
          emergencyEquipment: !!emergencyEquipment,
          cargoHook: !!cargoHook,
          exteriorImageUrls: exteriorImages,
          interiorImageUrls: interiorImages,
          videoLink: videoLink || null,
          additionalEquipment: additionalEquipment || null,
          vendorId,
          cabinFeatures: {
            deleteMany: {}, // Clear existing features
            connectOrCreate: cabinFeatures.map(name => ({
              where: { name },
              create: { name }
            }))
          }
        }
      });
  
      res.status(200).json({
        success: true,
        message: 'Helicopter listing updated successfully',
        helicopter: updatedListing
      });
  
    } catch (error) {
      console.error('Error updating helicopter listing:', error.message, error.stack);
  
      switch (error.code) {
        case 'P2002':
          if (error.meta?.target?.includes('registration_number')) {
            return res.status(409).json({
              success: false,
              message: 'A helicopter with this registration number already exists'
            });
          } else if (error.meta?.target?.includes('serial_number')) {
            return res.status(409).json({
              success: false,
              message: 'A helicopter with this serial number already exists'
            });
          }
          break;
  
        case 'P2003':
          return res.status(404).json({
            success: false,
            message: 'Vendor not found'
          });
  
        case 'P2025':
          return res.status(404).json({
            success: false,
            message: 'Helicopter listing not found'
          });
  
        default:
          return res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          });
      }
    }
});
router.put('/sales/:id/status', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const helicopter = await prisma.helicopterForSaleListing.update({
            where: { id },
            data: { status },
        });
        return res.status(200).send({
            success: true,
            message: 'Helicopter listing status updated successfully',
            helicopter,
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
router.get('/messages', verifyToken, async (req, res) => {
    try {
        const messages = await prisma.helicopterMessage.findMany({
            where: { vendorId: req.user?.id },
        });
        return res.status(200).send({
            success: true,
            messages,
        });
    } catch (error) {
        console.error('Error fetching helicopter messages:', error.message, error.stack);
    }
});
router.put('/messages/:id/read', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const message = await prisma.helicopterMessage.update({
            where: { id },
            data: { read: true },
        });
        return res.status(200).send({
            success: true,
            message: 'Message marked as read',
        });
    } catch (error) {
        console.error('Error marking message as read:', error.message, error.stack);
        return res.status(500).send({
            success: false, 
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
// charter section
router.post('/helicopters/charter/new', verifyToken, async (req, res) => {
    try {
        const {
            model,
            year,
            capacity,
            range,
            pricePerHour,
            location,
            availableFrom,
            availableTo,
            description,
            registrationNumber,
            engineType,
            engineCount,
            maxSpeed,
            cruisingSpeed,
            fuelCapacity,
            maxAltitude,
            flightHours,
            lastOverhaul,
            airworthinessCertificate,
            lastMaintenanceDate,
            insuranceStatus,
            pilotQualifications,
            safetyFeatures = [],
            hasWifi,
            hasRefreshments,
            hasEntertainmentSystem,
            hasClimatControl,
            depositAmount,
            minimumHours,
            cancellationPolicy,
            packageDeals,
            imageUrls = [],
            transactionSignature,
            vendorId
        } = req.body;

        // Define required fields based on schema
        const requiredFields = {
            model,
            year,
            capacity,
            range,
            pricePerHour,
            location,
            availableFrom,
            availableTo,
            registrationNumber,
            engineType,
            engineCount,
            maxSpeed,
            cruisingSpeed,
            fuelCapacity,
            maxAltitude,
            airworthinessCertificate,
            lastMaintenanceDate,
            insuranceStatus,
            pilotQualifications,
            depositAmount,
            minimumHours,
            cancellationPolicy,
            transactionSignature,
            vendorId
        };

        // Validate required fields
        for (const [field, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || value === '') {
                return res.status(400).json({
                    success: false,
                    error: `Missing required field: ${field}`
                });
            }
        }

        // Validate image requirements
        if (imageUrls.length < 1) {
            return res.status(400).json({
                success: false,
                error: `Please upload at least one image`
            });
        }

        // Parse numeric fields
        const parsedYear = parseInt(year);
        const parsedCapacity = parseInt(capacity);
        const parsedRange = parseFloat(range);
        const parsedPricePerHour = parseFloat(pricePerHour);
        const parsedEngineCount = parseInt(engineCount);
        const parsedMaxSpeed = parseFloat(maxSpeed);
        const parsedCruisingSpeed = parseFloat(cruisingSpeed);
        const parsedFuelCapacity = parseFloat(fuelCapacity);
        const parsedMaxAltitude = parseFloat(maxAltitude);
        const parsedFlightHours = flightHours ? parseFloat(flightHours) : null;
        const parsedDepositAmount = parseFloat(depositAmount);
        const parsedMinimumHours = parseFloat(minimumHours);

        // Validate parsed numbers
        const numericValidations = {
            year: parsedYear,
            capacity: parsedCapacity,
            range: parsedRange,
            pricePerHour: parsedPricePerHour,
            engineCount: parsedEngineCount,
            maxSpeed: parsedMaxSpeed,
            cruisingSpeed: parsedCruisingSpeed,
            fuelCapacity: parsedFuelCapacity,
            maxAltitude: parsedMaxAltitude,
            depositAmount: parsedDepositAmount,
            minimumHours: parsedMinimumHours
        };

        for (const [field, value] of Object.entries(numericValidations)) {
            if (isNaN(value)) {
                return res.status(400).json({
                    success: false,
                    error: `Invalid numeric value for field: ${field}`
                });
            }
        }

        // Validate dates
        const parsedAvailableFrom = new Date(availableFrom);
        const parsedAvailableTo = new Date(availableTo);
        const parsedLastMaintenanceDate = new Date(lastMaintenanceDate);
        const parsedLastOverhaul = lastOverhaul ? new Date(lastOverhaul) : null;

        const dateValidations = {
            availableFrom: parsedAvailableFrom,
            availableTo: parsedAvailableTo,
            lastMaintenanceDate: parsedLastMaintenanceDate
        };

        for (const [field, value] of Object.entries(dateValidations)) {
            if (isNaN(value.getTime())) {
                return res.status(400).json({
                    success: false,
                    error: `Invalid date for field: ${field}`
                });
            }
        }

        if (parsedLastOverhaul && isNaN(parsedLastOverhaul.getTime())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid last overhaul date'
            });
        }

        // Create the helicopter charter listing
        const newListing = await prisma.helicopterForCharter.create({
            data: {
                model,
                year: parsedYear,
                capacity: parsedCapacity,
                range: parsedRange,
                pricePerHour: parsedPricePerHour,
                location,
                availableFrom: parsedAvailableFrom,
                availableTo: parsedAvailableTo,
                description,
                registrationNumber,
                engineType,
                engineCount: parsedEngineCount,
                maxSpeed: parsedMaxSpeed,
                cruisingSpeed: parsedCruisingSpeed,
                fuelCapacity: parsedFuelCapacity,
                maxAltitude: parsedMaxAltitude,
                flightHours: parsedFlightHours,
                lastOverhaul: parsedLastOverhaul,
                airworthinessCertificate,
                lastMaintenanceDate: parsedLastMaintenanceDate,
                insuranceStatus,
                pilotQualifications,
                safetyFeatures,
                hasWifi: !!hasWifi,
                hasRefreshments: !!hasRefreshments,
                hasEntertainmentSystem: !!hasEntertainmentSystem,
                hasClimatControl: !!hasClimatControl,
                depositAmount: parsedDepositAmount,
                minimumHours: parsedMinimumHours,
                cancellationPolicy,
                packageDeals: packageDeals || null,
                imageUrls,
                transactionSignature,
                vendorId,
                status: 'PENDING'
            }
        });

        res.status(200).json({
            success: true,
            message: 'Helicopter charter listing created successfully',
            helicopter: newListing
        });

    } catch (error) {
        console.error('Error creating helicopter charter listing:', error.message, error.stack);

        switch (error.code) {
            case 'P2002':
                if (error.meta?.target?.includes('registration_number')) {
                    return res.status(409).json({
                        success: false,
                        message: 'A helicopter with this registration number already exists'
                    });
                }
                break;

            case 'P2003':
                return res.status(404).json({
                    success: false,
                    message: 'Vendor not found'
                });

            default:
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
        }
    }
});
router.get('/helicopters/charter/all', verifyToken, async (req, res) => {
    try {
        const listings = await prisma.helicopterForCharter.findMany({
            where: {
                vendorId: req.user?.id,
            },
        });
        return res.status(200).send({
            success: true,
            listings,
        });

    } catch (error) {
        console.error('Error fetching helicopter charter listings:', error.message, error.stack);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
router.put('/charter/:id/boost', verifyToken, async (req, res) => {
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
    const validPlans = ['Basic Boost', 'Pro Boost', 'Elite Boost'];
    if (!validPlans.includes(plan)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid boost plan',
      });
    }

    // Validate duration
    const planDurations = {
      'Basic Boost': 7,
      'Pro Boost': 14,
      'Elite Boost': 30,
    };
    
    if (planDurations[plan] !== parseInt(duration)) {
      return res.status(400).send({
        success: false,
        message: `Invalid duration for ${plan}. Expected ${planDurations[plan]} days`,
      });
    }

    // Find the jet listing
    const jet = await prisma.helicopterForCharter.findUnique({
      where: { id },
    });

    if (!jet) {
      return res.status(404).send({
        success: false,
        message: 'Jet listing not found',
      });
    }

    // Verify ownership
    if (jet.vendorId !== userId) {
      return res.status(403).send({
        success: false,
        message: 'Forbidden: You do not own this listing',
      });
    }

    // Check if already sponsored
    if (jet.sponsored && jet.endDate > new Date()) {
      return res.status(400).send({
        success: false,
        message: 'Listing is already boosted until ' + jet.end_date.toISOString(),
      });
    }

    // Calculate end date
    const endDate = addDays(new Date(), parseInt(duration));

    // Update jet listing
    const updatedJet = await prisma.helicopterForCharter.update({
      where: { id },
      data: {
        sponsored: true,
        sponsoredType: plan,
        endDate: endDate,
      },
    });

    res.status(200).send({
      success: true,
      message: 'Listing boosted successfully',
      data: {
        id: updatedJet.id,
        sponsored: updatedJet.sponsored,
        sponsoredType: updatedJet.sponsoredType,
        end_date: updatedJet.end_date,
      },
    });
  } catch (error) {
    console.error('Error boosting listing:', error);
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});
router.delete('/charter/:id', verifyToken, async (req, res) => {
  try {
      const { id } = req.params;
      const userId = req.user?.id;

      // Check if the charter exists
      const helicopter = await prisma.helicopterForCharter.findUnique({
          where: { id },
      });

      if (!helicopter) {
          return res.status(404).send({
              success: false,
              message: 'Helicopter not found',
          });
      }

      // Verify ownership
      if (helicopter.vendorId !== userId) {
          return res.status(403).send({
              success: false,
              message: 'Forbidden: You do not own this listing',
          });
      }

      // Delete the charter, related messages, and bookings in a transaction
      await prisma.$transaction([
          prisma.helicopterForCharterMessages.deleteMany({
              where: { listingId: id },
          }),
          prisma.helicopterForCharter.delete({
              where: { id },
          }),
      ]);

      return res.status(200).send({
          success: true,
          message: 'Charter listing, related messages, and bookings deleted successfully',
      });
  } catch (error) {
      console.error('Error deleting helicopter charter listing:', error.message, error.stack);
      return res.status(500).send({
          success: false,
          message: 'Internal Server Error',
          error: error.message,
      });
  }
});
router.get('/charter/edit/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // Find the helicopter listing
        const helicopter = await prisma.helicopterForCharter.findUnique({
            where: { id }
        });

        if (!helicopter) {
            return res.status(404).json({
                success: false,
                message: 'Helicopter not found'
            });
        }

        // Verify ownership
        if (helicopter.vendorId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: You can only view your own listings'
            });
        }

        return res.status(200).json({
            success: true,
            helicopter
        });

    } catch (error) {
        console.error('Error fetching helicopter charter listing:', error.message, error.stack);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.put('/charter/edit/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            model,
            year,
            capacity,
            range,
            pricePerHour,
            location,
            availableFrom,
            availableTo,
            description,
            registrationNumber,
            engineType,
            engineCount,
            maxSpeed,
            cruisingSpeed,
            fuelCapacity,
            maxAltitude,
            flightHours,
            lastOverhaul,
            airworthinessCertificate,
            lastMaintenanceDate,
            insuranceStatus,
            pilotQualifications,
            safetyFeatures = [],
            hasWifi,
            hasRefreshments,
            hasEntertainmentSystem,
            hasClimatControl,
            depositAmount,
            minimumHours,
            cancellationPolicy,
            packageDeals,
            imageUrls = [],
            vendorId
        } = req.body;

        // Verify listing exists and belongs to vendor
        const existingListing = await prisma.helicopterForCharter.findUnique({
            where: { id },
            select: { vendorId: true }
        });

        if (!existingListing) {
            return res.status(404).json({
                success: false,
                error: 'Helicopter listing not found'
            });
        }

        if (existingListing.vendorId !== vendorId) {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized: You can only update your own listings'
            });
        }

        // Define required fields based on schema
        const requiredFields = {
            model,
            year,
            capacity,
            range,
            pricePerHour,
            location,
            availableFrom,
            availableTo,
            registrationNumber,
            engineType,
            engineCount,
            maxSpeed,
            cruisingSpeed,
            fuelCapacity,
            maxAltitude,
            airworthinessCertificate,
            lastMaintenanceDate,
            insuranceStatus,
            pilotQualifications,
            depositAmount,
            minimumHours,
            cancellationPolicy,
            vendorId
        };

        // Validate required fields
        for (const [field, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || value === '') {
                return res.status(400).json({
                    success: false,
                    error: `Missing required field: ${field}`
                });
            }
        }

        // Validate image requirements
        if (imageUrls.length < 1) {
            return res.status(400).json({
                success: false,
                error: 'Please upload at least one image'
            });
        }

        // Parse numeric fields
        const parsedYear = parseInt(year);
        const parsedCapacity = parseInt(capacity);
        const parsedRange = parseFloat(range);
        const parsedPricePerHour = parseFloat(pricePerHour);
        const parsedEngineCount = parseInt(engineCount);
        const parsedMaxSpeed = parseFloat(maxSpeed);
        const parsedCruisingSpeed = parseFloat(cruisingSpeed);
        const parsedFuelCapacity = parseFloat(fuelCapacity);
        const parsedMaxAltitude = parseFloat(maxAltitude);
        const parsedFlightHours = flightHours ? parseFloat(flightHours) : null;
        const parsedDepositAmount = parseFloat(depositAmount);
        const parsedMinimumHours = parseFloat(minimumHours);

        // Validate parsed numbers
        const numericValidations = {
            year: parsedYear,
            capacity: parsedCapacity,
            range: parsedRange,
            pricePerHour: parsedPricePerHour,
            engineCount: parsedEngineCount,
            maxSpeed: parsedMaxSpeed,
            cruisingSpeed: parsedCruisingSpeed,
            fuelCapacity: parsedFuelCapacity,
            maxAltitude: parsedMaxAltitude,
            depositAmount: parsedDepositAmount,
            minimumHours: parsedMinimumHours
        };

        for (const [field, value] of Object.entries(numericValidations)) {
            if (isNaN(value)) {
                return res.status(400).json({
                    success: false,
                    error: `Invalid numeric value for field: ${field}`
                });
            }
        }

        // Validate dates
        const parsedAvailableFrom = new Date(availableFrom);
        const parsedAvailableTo = new Date(availableTo);
        const parsedLastMaintenanceDate = new Date(lastMaintenanceDate);
        const parsedLastOverhaul = lastOverhaul ? new Date(lastOverhaul) : null;

        const dateValidations = {
            availableFrom: parsedAvailableFrom,
            availableTo: parsedAvailableTo,
            lastMaintenanceDate: parsedLastMaintenanceDate
        };

        for (const [field, value] of Object.entries(dateValidations)) {
            if (isNaN(value.getTime())) {
                return res.status(400).json({
                    success: false,
                    error: `Invalid date for field: ${field}`
                });
            }
        }

        if (parsedLastOverhaul && isNaN(parsedLastOverhaul.getTime())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid last overhaul date'
            });
        }

        // Update the helicopter charter listing
        const updatedListing = await prisma.helicopterForCharter.update({
            where: { id },
            data: {
                model,
                year: parsedYear,
                capacity: parsedCapacity,
                range: parsedRange,
                pricePerHour: parsedPricePerHour,
                location,
                availableFrom: parsedAvailableFrom,
                availableTo: parsedAvailableTo,
                description,
                registrationNumber,
                engineType,
                engineCount: parsedEngineCount,
                maxSpeed: parsedMaxSpeed,
                cruisingSpeed: parsedCruisingSpeed,
                fuelCapacity: parsedFuelCapacity,
                maxAltitude: parsedMaxAltitude,
                flightHours: parsedFlightHours,
                lastOverhaul: parsedLastOverhaul,
                airworthinessCertificate,
                lastMaintenanceDate: parsedLastMaintenanceDate,
                insuranceStatus,
                pilotQualifications,
                safetyFeatures,
                hasWifi: !!hasWifi,
                hasRefreshments: !!hasRefreshments,
                hasEntertainmentSystem: !!hasEntertainmentSystem,
                hasClimatControl: !!hasClimatControl,
                depositAmount: parsedDepositAmount,
                minimumHours: parsedMinimumHours,
                cancellationPolicy,
                packageDeals: packageDeals || null,
                imageUrls,
                vendorId
            }
        });

        res.status(200).json({
            success: true,
            message: 'Helicopter charter listing updated successfully',
            helicopter: updatedListing
        });

    } catch (error) {
        console.error('Error updating helicopter charter listing:', error.message, error.stack);

        switch (error.code) {
            case 'P2002':
                if (error.meta?.target?.includes('registration_number')) {
                    return res.status(409).json({
                        success: false,
                        message: 'A helicopter with this registration number already exists'
                    });
                }
                break;

            case 'P2003':
                return res.status(404).json({
                    success: false,
                    message: 'Vendor not found'
                });

            case 'P2025':
                return res.status(404).json({
                    success: false,
                    message: 'Helicopter listing not found'
                });

            default:
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
        }
    }
});
router.put('/charter/:id/book', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const helicopter = await prisma.helicopterForCharter.update({
            where: { id },
            data: { status },
        });
        return res.status(200).send({
            success: true,
            message: 'Helicopter marked as booked',
            helicopter,
        });
    } catch (error) { 
        console.error('Error marking helicopter as booked:', error.message, error.stack);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
router.put('/charter/:id/available', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const helicopter = await prisma.helicopterForCharter.update({
            where: { id },
            data: { status },
        });
        return res.status(200).send({
            success: true,
            message: 'Helicopter marked as available',
            helicopter,
        });
    } catch (error) {
        console.error('Error marking helicopter as available:', error.message, error.stack);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
router.get('/charter/bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await prisma.helicopterForCharterMessages.findMany({
            where: { vendorId: req.user?.id },
        });
        return res.status(200).send({
          
            success: true,
            bookings,
        });
    } catch (error) {
        console.error('Error fetching helicopter charter bookings:', error.message, error.stack);
    }
});
router.put('/charter/bookings/:id/read', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { read } = req.body;
        const booking = await prisma.helicopterForCharterMessages.update({
            where: { id },
            data: { read: true },
        });
        return res.status(200).send({
            success: true,
            message: 'Booking marked as read',
            booking,
        });
    } catch (error) {
        console.error('Error marking booking as read:', error.message, error.stack);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
});
module.exports = router

