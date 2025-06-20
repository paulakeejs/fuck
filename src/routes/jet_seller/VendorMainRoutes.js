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
                brandImage:true,
                name: true,
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
router.post('/jets/add', verifyToken, async (req, res) => {
  try {
    const {
      manufacturer,
      otherManufacturer,
      model,
      year,
      serialNumber,
      totalTimeSinceNew,
      totalLandings,
      engineMakeModel,
      engineHours,
      avionicsSuite,
      interiorConfig,
      interiorImageUrls = [],
      exteriorImageUrls = [],
      layoutImageUrl,
      price,
      currentLocation,
      registrationNumber,
      contactDetails,
      description,
      // Aircraft Specifications
      aircraftType,
      seatingCapacity,
      cabinHeight,
      cabinWidth,
      cabinLength,
      baggageCapacity,
      numberOfEngines,
      engineType,
      engineThrust,
      // Certification & Compliance
      certification,
      noiseCompliance,
      // Operational Status
      lastInspectionDate,
      nextInspectionDue,
      maintenanceStatus,
      // Optional fields
      previousOwners,
      maintenanceProgram,
      airframeEngineStatus,
      refurbishmentDate,
      wifiConnectivity,
      lavatoryGalleyDetails,
      cabinAmenities,
      range,
      cruiseSpeed,
      maxAltitude,
      runwayLength,
      emptyWeight,
      maxTakeoffWeight,
      deliveryAvailability,
      // New fields
      fuelCapacity,
      fuelConsumption,
      serviceCeiling,
      takeoffDistance,
      landingDistance,
      warrantyRemaining,
      avionicsUpdates,
      interiorDesigner,
      exteriorPaintScheme,
      recentUpgrades,
      operationalRestrictions,
      // Payment fields
      paymentTxSignature,
      transactionLink,
      vendorId
    } = req.body;

    // Define required fields based on form
    const requiredFields = {
      manufacturer,
      model,
      year,
      serialNumber,
      totalTimeSinceNew,
      totalLandings,
      engineMakeModel,
      engineHours,
      avionicsSuite,
      interiorConfig,
      price,
      currentLocation,
      registrationNumber,
      contactDetails,
      description,
      paymentTxSignature,
      vendorId,
      // Aircraft specifications
      aircraftType,
      seatingCapacity,
      cabinHeight,
      cabinWidth,
      cabinLength,
      baggageCapacity,
      numberOfEngines,
      engineType,
      engineThrust,
      // Certification
      certification,
      noiseCompliance,
      // Maintenance
      lastInspectionDate,
      nextInspectionDue,
      maintenanceStatus,
      layoutImageUrl,
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

    // Validate image requirements (minimum 3 interior, 2 exterior)
    if (interiorImageUrls.length < 3 || exteriorImageUrls.length < 2) {
      return res.status(400).json({
        success: false,
        error: `Please upload at least ${3 - interiorImageUrls.length} more interior and ${2 - exteriorImageUrls.length} more exterior images`
      });
    }

    // Parse and validate numeric fields
    const parseNumber = (value, fieldName, allowNull = false) => {
      if (allowNull && (value === null || value === undefined || value === '')) {
        return null;
      }
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error(`Invalid numeric value for field: ${fieldName}`);
      }
      return num;
    };

    const numericFields = {
      year: parseInt(year),
      totalTimeSinceNew: parseNumber(totalTimeSinceNew, 'totalTimeSinceNew'),
      totalLandings: parseNumber(totalLandings, 'totalLandings'),
      engineHours: parseNumber(engineHours, 'engineHours'),
      seatingCapacity: parseNumber(seatingCapacity, 'seatingCapacity'),
      numberOfEngines: parseNumber(numberOfEngines, 'numberOfEngines'),
      cabinHeight: parseNumber(cabinHeight, 'cabinHeight'),
      cabinWidth: parseNumber(cabinWidth, 'cabinWidth'),
      cabinLength: parseNumber(cabinLength, 'cabinLength'),
      baggageCapacity: parseNumber(baggageCapacity, 'baggageCapacity'),
      engineThrust: parseNumber(engineThrust, 'engineThrust'),
      previousOwners: parseNumber(previousOwners, 'previousOwners', true),
      range: parseNumber(range, 'range', true),
      cruiseSpeed: parseNumber(cruiseSpeed, 'cruiseSpeed', true),
      maxAltitude: parseNumber(maxAltitude, 'maxAltitude', true),
      runwayLength: parseNumber(runwayLength, 'runwayLength', true),
      emptyWeight: parseNumber(emptyWeight, 'emptyWeight', true),
      maxTakeoffWeight: parseNumber(maxTakeoffWeight, 'maxTakeoffWeight', true),
      fuelCapacity: parseNumber(fuelCapacity, 'fuelCapacity', true),
      fuelConsumption: parseNumber(fuelConsumption, 'fuelConsumption', true),
      serviceCeiling: parseNumber(serviceCeiling, 'serviceCeiling', true),
      takeoffDistance: parseNumber(takeoffDistance, 'takeoffDistance', true),
      landingDistance: parseNumber(landingDistance, 'landingDistance', true)
    };

    // Validate dates
    const parseDate = (dateString, fieldName) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format for ${fieldName}`);
      }
      return date;
    };

    const dateFields = {
      lastInspectionDate: parseDate(lastInspectionDate, 'lastInspectionDate'),
      nextInspectionDue: parseDate(nextInspectionDue, 'nextInspectionDue')
    };

    // Handle manufacturer logic
    const finalManufacturer = manufacturer === 'Other' ? otherManufacturer : manufacturer;
    if (manufacturer === 'Other' && (!otherManufacturer || otherManufacturer.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Other manufacturer name is required when manufacturer is "Other"'
      });
    }

    // Create the jet listing
    const newListing = await prisma.jet.create({
      data: {
        // Basic Information
        manufacturer: finalManufacturer,
        otherManufacturer: manufacturer === 'Other' ? otherManufacturer : null,
        model,
        year: numericFields.year,
        serialNumber,
        totalTimeSinceNew: numericFields.totalTimeSinceNew,
        totalLandings: numericFields.totalLandings,
        engineMakeModel,
        engineHours: numericFields.engineHours,
        avionicsSuite,
        interiorConfig,
        interiorImageUrls,
        layoutImageUrl,
        exteriorImageUrls,
        price,
        currentLocation,
        registrationNumber,
        contactDetails,
        description,
        
        // Aircraft Specifications
        aircraftType,
        seatingCapacity: numericFields.seatingCapacity,
        cabinHeight: numericFields.cabinHeight,
        cabinWidth: numericFields.cabinWidth,
        cabinLength: numericFields.cabinLength,
        baggageCapacity: numericFields.baggageCapacity,
        numberOfEngines: numericFields.numberOfEngines,
        engineType,
        engineThrust: numericFields.engineThrust,
        
        // Performance Specifications
        range: numericFields.range,
        cruiseSpeed: numericFields.cruiseSpeed,
        maxAltitude: numericFields.maxAltitude,
        runwayLength: numericFields.runwayLength,
        emptyWeight: numericFields.emptyWeight,
        maxTakeoffWeight: numericFields.maxTakeoffWeight,
        fuelCapacity: numericFields.fuelCapacity,
        fuelConsumption: numericFields.fuelConsumption,
        serviceCeiling: numericFields.serviceCeiling,
        takeoffDistance: numericFields.takeoffDistance,
        landingDistance: numericFields.landingDistance,
        
        // Certification & Compliance
        certification,
        noiseCompliance,
        operationalRestrictions: operationalRestrictions || null,
        
        // Maintenance & History
        lastInspectionDate: dateFields.lastInspectionDate,
        nextInspectionDue: dateFields.nextInspectionDue,
        maintenanceStatus,
        maintenanceProgram: maintenanceProgram || null,
        airframeEngineStatus: airframeEngineStatus || null,
        refurbishmentDate: refurbishmentDate || null,
        avionicsUpdates: avionicsUpdates || null,
        warrantyRemaining: warrantyRemaining || null,
        
        // Interior/Exterior Details
        wifiConnectivity: wifiConnectivity || null,
        lavatoryGalleyDetails: lavatoryGalleyDetails || null,
        cabinAmenities: cabinAmenities || null,
        interiorDesigner: interiorDesigner || null,
        exteriorPaintScheme: exteriorPaintScheme || null,
        recentUpgrades: recentUpgrades || null,
        
        // Ownership History
        previousOwners: numericFields.previousOwners,
        
        // Availability
        deliveryAvailability: deliveryAvailability || null,
        
        // Payment fields
        paymentTxSignature,
        transactionLink: transactionLink || null,
        vendorId,
        
        // Status
        status: 'PENDING',
        sponsored: false,
        sponsoredType: 'NotSponsored'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Jet listing created successfully',
      jet: newListing
    });

  } catch (error) {
    console.error('Error creating jet listing:', error);

    // Handle Prisma errors
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('registration_number')) {
        return res.status(409).json({
          success: false,
          message: 'A jet with this registration number already exists'
        });
      }
      return res.status(409).json({
        success: false,
        message: 'Duplicate entry detected',
        field: error.meta?.target?.[0]
      });
    }

    if (error.code === 'P2003') {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }

    // Handle validation errors
    if (error.message && error.message.startsWith('Invalid')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Internal server error',
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
router.get('/jets/preview/:id', verifyToken, async(req,res) => {
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
router.get('/messages', 
    verifyToken, 
    async (req, res) => {
        try {
            const messages = await prisma.jetForSaleMessages.findMany({
                where: {
                    vendorId: req.user.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
            });
  
            res.status(200).send({
                success: true,
                data: messages
            });
        } catch (error) {
            console.error('Messages fetch error:', error);
            res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
);
router.put('/messages/:id/read', verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      if (!checkUUID(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID format"
        });
    }
  
      // Update the message to set read: true
      const message = await prisma.jetForSaleMessages.update({
        where: { id },
        data: { read: true },
        select: {
          id: true,
          customerName: true,
          customerEmail: true,
          customerCountry: true,
          listingId: true,
          vendorId: true,
          message: true,
          createdAt: true,
          read: true,
        },
      });
  
      res.status(200).send({
        success: true,
        data: message,
      });
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(404).send({
        success: false,
        message: 'Message not found or already marked as read',
      });
    }
});
router.get('/mine', verifyToken, async(req,res) => {
    try {
        const jets = await prisma.jet.findMany({
            where: {
                vendorId: req.user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        res.status(200).send({
            success: true,
            data: jets
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
})
router.get('/edit/:id', verifyToken, async(req,res) => {
  try {
    if (!checkUUID(req.params.id)) {
      return res.status(400).json({
          success: false,
          message: "Invalid ID format"
      });
  }
    const listing = await prisma.jet.findUnique({
      where:{
        id:req.params.id
      }
    })
    if(!listing){
      res.status(404).send({
        success:false,
        message:"Listing Not Found"
      })
    }
    res.status(200).send({
      success:true,
      data:listing
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
})
router.put('/edit/:id', verifyToken, async (req, res) => {
  try {
    const jetId = req.params.id;
    const {
      manufacturer,
      otherManufacturer,
      model,
      year,
      serialNumber,
      totalTimeSinceNew,
      totalLandings,
      engineMakeModel,
      engineHours,
      avionicsSuite,
      interiorConfig,
      interiorImageUrls = [],
      exteriorImageUrls = [],
      price,
      currentLocation,
      registrationNumber,
      contactDetails,
      description,
      // Aircraft Specifications
      aircraftType,
      seatingCapacity,
      cabinHeight,
      cabinWidth,
      cabinLength,
      baggageCapacity,
      numberOfEngines,
      engineType,
      engineThrust,
      // Certification & Compliance
      certification,
      noiseCompliance,
      // Operational Status
      lastInspectionDate,
      nextInspectionDue,
      maintenanceStatus,
      // Optional fields
      previousOwners,
      maintenanceProgram,
      airframeEngineStatus,
      refurbishmentDate,
      wifiConnectivity,
      lavatoryGalleyDetails,
      cabinAmenities,
      range,
      cruiseSpeed,
      maxAltitude,
      runwayLength,
      emptyWeight,
      maxTakeoffWeight,
      deliveryAvailability,
      // New fields
      fuelCapacity,
      fuelConsumption,
      serviceCeiling,
      takeoffDistance,
      landingDistance,
      warrantyRemaining,
      avionicsUpdates,
      interiorDesigner,
      exteriorPaintScheme,
      recentUpgrades,
      operationalRestrictions,
      vendorId
    } = req.body;

    // Check if jet exists
    const existingJet = await prisma.jet.findUnique({
      where: { id: jetId },
    });

    if (!existingJet) {
      return res.status(404).json({
        success: false,
        message: 'Jet listing not found'
      });
    }

    // Define required fields based on form
    const requiredFields = {
      manufacturer,
      model,
      year,
      serialNumber,
      totalTimeSinceNew,
      totalLandings,
      engineMakeModel,
      engineHours,
      avionicsSuite,
      interiorConfig,
      price,
      currentLocation,
      registrationNumber,
      contactDetails,
      description,
      vendorId,
      // Aircraft specifications
      aircraftType,
      seatingCapacity,
      cabinHeight,
      cabinWidth,
      cabinLength,
      baggageCapacity,
      numberOfEngines,
      engineType,
      engineThrust,
      // Certification
      certification,
      noiseCompliance,
      // Maintenance
      lastInspectionDate,
      nextInspectionDue,
      maintenanceStatus
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

    // Validate image requirements (minimum 3 interior, 2 exterior)
    if (interiorImageUrls.length < 3 || exteriorImageUrls.length < 2) {
      return res.status(400).json({
        success: false,
        error: `Please upload at least ${3 - interiorImageUrls.length} more interior and ${2 - exteriorImageUrls.length} more exterior images`
      });
    }

    // Parse and validate numeric fields
    const parseNumber = (value, fieldName, allowNull = false) => {
      if (allowNull && (value === null || value === undefined || value === '')) {
        return null;
      }
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error(`Invalid numeric value for field: ${fieldName}`);
      }
      return num;
    };

    const numericFields = {
      year: parseInt(year),
      totalTimeSinceNew: parseNumber(totalTimeSinceNew, 'totalTimeSinceNew'),
      totalLandings: parseNumber(totalLandings, 'totalLandings'),
      engineHours: parseNumber(engineHours, 'engineHours'),
      seatingCapacity: parseNumber(seatingCapacity, 'seatingCapacity'),
      numberOfEngines: parseNumber(numberOfEngines, 'numberOfEngines'),
      cabinHeight: parseNumber(cabinHeight, 'cabinHeight'),
      cabinWidth: parseNumber(cabinWidth, 'cabinWidth'),
      cabinLength: parseNumber(cabinLength, 'cabinLength'),
      baggageCapacity: parseNumber(baggageCapacity, 'baggageCapacity'),
      engineThrust: parseNumber(engineThrust, 'engineThrust'),
      previousOwners: parseNumber(previousOwners, 'previousOwners', true),
      range: parseNumber(range, 'range', true),
      cruiseSpeed: parseNumber(cruiseSpeed, 'cruiseSpeed', true),
      maxAltitude: parseNumber(maxAltitude, 'maxAltitude', true),
      runwayLength: parseNumber(runwayLength, 'runwayLength', true),
      emptyWeight: parseNumber(emptyWeight, 'emptyWeight', true),
      maxTakeoffWeight: parseNumber(maxTakeoffWeight, 'maxTakeoffWeight', true),
      fuelCapacity: parseNumber(fuelCapacity, 'fuelCapacity', true),
      fuelConsumption: parseNumber(fuelConsumption, 'fuelConsumption', true),
      serviceCeiling: parseNumber(serviceCeiling, 'serviceCeiling', true),
      takeoffDistance: parseNumber(takeoffDistance, 'takeoffDistance', true),
      landingDistance: parseNumber(landingDistance, 'landingDistance', true)
    };

    // Validate dates
    const parseDate = (dateString, fieldName) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format for ${fieldName}`);
      }
      return date;
    };

    const dateFields = {
      lastInspectionDate: parseDate(lastInspectionDate, 'lastInspectionDate'),
      nextInspectionDue: parseDate(nextInspectionDue, 'nextInspectionDue')
    };

    // Handle manufacturer logic
    const finalManufacturer = manufacturer === 'Other' ? otherManufacturer : manufacturer;
    if (manufacturer === 'Other' && (!otherManufacturer || otherManufacturer.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Other manufacturer name is required when manufacturer is "Other"'
      });
    }

    // Update the jet listing
    const updatedListing = await prisma.jet.update({
      where: { id: jetId },
      data: {
        // Basic Information
        manufacturer: finalManufacturer,
        otherManufacturer: manufacturer === 'Other' ? otherManufacturer : null,
        model,
        year: numericFields.year,
        serialNumber,
        totalTimeSinceNew: numericFields.totalTimeSinceNew,
        totalLandings: numericFields.totalLandings,
        engineMakeModel,
        engineHours: numericFields.engineHours,
        avionicsSuite,
        interiorConfig,
        interiorImageUrls,
        exteriorImageUrls,
        price,
        currentLocation,
        registrationNumber,
        contactDetails,
        description,
        
        // Aircraft Specifications
        aircraftType,
        seatingCapacity: numericFields.seatingCapacity,
        cabinHeight: numericFields.cabinHeight,
        cabinWidth: numericFields.cabinWidth,
        cabinLength: numericFields.cabinLength,
        baggageCapacity: numericFields.baggageCapacity,
        numberOfEngines: numericFields.numberOfEngines,
        engineType,
        engineThrust: numericFields.engineThrust,
        
        // Performance Specifications
        range: numericFields.range,
        cruiseSpeed: numericFields.cruiseSpeed,
        maxAltitude: numericFields.maxAltitude,
        runwayLength: numericFields.runwayLength,
        emptyWeight: numericFields.emptyWeight,
        maxTakeoffWeight: numericFields.maxTakeoffWeight,
        fuelCapacity: numericFields.fuelCapacity,
        fuelConsumption: numericFields.fuelConsumption,
        serviceCeiling: numericFields.serviceCeiling,
        takeoffDistance: numericFields.takeoffDistance,
        landingDistance: numericFields.landingDistance,
        
        // Certification & Compliance
        certification,
        noiseCompliance,
        operationalRestrictions: operationalRestrictions || null,
        
        // Maintenance & History
        lastInspectionDate: dateFields.lastInspectionDate,
        nextInspectionDue: dateFields.nextInspectionDue,
        maintenanceStatus,
        maintenanceProgram: maintenanceProgram || null,
        airframeEngineStatus: airframeEngineStatus || null,
        refurbishmentDate: refurbishmentDate || null,
        avionicsUpdates: avionicsUpdates || null,
        warrantyRemaining: warrantyRemaining || null,
        
        // Interior/Exterior Details
        wifiConnectivity: wifiConnectivity || null,
        lavatoryGalleyDetails: lavatoryGalleyDetails || null,
        cabinAmenities: cabinAmenities || null,
        interiorDesigner: interiorDesigner || null,
        exteriorPaintScheme: exteriorPaintScheme || null,
        recentUpgrades: recentUpgrades || null,
        
        // Ownership History
        previousOwners: numericFields.previousOwners,
        
        // Availability
        deliveryAvailability: deliveryAvailability || null,
        
        // Vendor
        vendorId
      }
    });

    res.status(200).json({
      success: true,
      message: 'Jet listing updated successfully',
      jet: updatedListing
    });

  } catch (error) {
    console.error('Error updating jet listing:', error);

    // Handle Prisma errors
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('registration_number')) {
        return res.status(409).json({
          success: false,
          message: 'A jet with this registration number already exists'
        });
      }
      return res.status(409).json({
        success: false,
        message: 'Duplicate entry detected',
        field: error.meta?.target?.[0]
      });
    }

    if (error.code === 'P2003') {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found'
      });
    }

    // Handle validation errors
    if (error.message && error.message.startsWith('Invalid')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    if (!checkUUID(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }

    const jetId = req.params.id;
    const vendorId = req.user.id; // Assuming verifyToken adds user info to req.user

    // Check if jet exists and belongs to the vendor
    const jet = await prisma.jet.findUnique({
      where: { id: jetId },
    });

    if (!jet) {
      return res.status(404).json({
        success: false,
        message: "Jet listing not found"
      });
    }

    if (jet.vendorId !== vendorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own listings"
      });
    }

    // Perform deletion of messages and jet in a transaction
    await prisma.$transaction([
      // Delete all messages associated with the jet listing
      prisma.jetForSaleMessages.deleteMany({
        where: { listingId: jetId }
      }),
      // Delete the jet listing
      prisma.jet.delete({
        where: { id: jetId }
      })
    ]);

    return res.status(200).json({
      success: true,
      message: "Jet listing and associated messages deleted successfully"
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});
router.put('/boost/:id', verifyToken, async (req, res) => {
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
    const jet = await prisma.jet.findUnique({
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
    if (jet.sponsored && jet.end_date > new Date()) {
      return res.status(400).send({
        success: false,
        message: 'Listing is already boosted until ' + jet.end_date.toISOString(),
      });
    }

    // Calculate end date
    const endDate = addDays(new Date(), parseInt(duration));

    // Update jet listing
    const updatedJet = await prisma.jet.update({
      where: { id },
      data: {
        sponsored: true,
        sponsoredType: plan,
        end_date: endDate,
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
router.post('/jets/add-for-bidding', verifyToken, async (req, res) => {
  try {
    const {
      manufacturer,
      otherManufacturer,
      model,
      year,
      serialNumber,
      totalTimeSinceNew,
      totalLandings,
      engineMakeModel,
      engineHours,
      avionicsSuite,
      interiorConfig,
      interiorImageUrls = [],
      exteriorImageUrls = [],
      price,
      currentLocation,
      registrationNumber,
      contactDetails,
      previousOwners,
      maintenanceProgram,
      airframeEngineStatus,
      refurbishmentDate,
      wifiConnectivity,
      lavatoryGalleyDetails,
      cabinAmenities,
      range,
      cruiseSpeed,
      maxAltitude,
      runwayLength,
      emptyWeight,
      maxTakeoffWeight,
      deliveryAvailability,
      vendorId,
      biddingEndDate,
      minimumBidIncrement
    } = req.body;

    // Define required fields
    const requiredFields = {
      manufacturer,
      model,
      year,
      serialNumber,
      totalTimeSinceNew,
      totalLandings,
      engineMakeModel,
      engineHours,
      avionicsSuite,
      interiorConfig,
      price,
      currentLocation,
      registrationNumber,
      contactDetails,
      vendorId,
      biddingEndDate,
      minimumBidIncrement
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

    // Validate bidding end date is in the future
    const biddingEnd = new Date(biddingEndDate);
    if (biddingEnd <= new Date()) {
      return res.status(400).json({
        success: false,
        error: 'Bidding end date must be in the future'
      });
    }

    // Validate minimum bid increment
    const minBidIncrement = parseFloat(minimumBidIncrement);
    if (isNaN(minBidIncrement)) {
      return res.status(400).json({
        success: false,
        error: 'Minimum bid increment must be a valid number'
      });
    }

    // Validate image requirements
    if (interiorImageUrls.length < 3 || exteriorImageUrls.length < 2) {
      return res.status(400).json({
        success: false,
        error: `Please upload at least ${3 - interiorImageUrls.length} more interior and ${2 - exteriorImageUrls.length} more exterior images`
      });
    }

    // Parse numeric fields
    const parsedYear = parseInt(year);
    const parsedTotalTimeSinceNew = parseInt(totalTimeSinceNew);
    const parsedTotalLandings = parseInt(totalLandings);
    const parsedEngineHours = parseInt(engineHours);
    const parsedPreviousOwners = previousOwners ? parseInt(previousOwners) : null;
    const parsedRange = range ? parseFloat(range) : null;
    const parsedCruiseSpeed = cruiseSpeed ? parseFloat(cruiseSpeed) : null;
    const parsedMaxAltitude = maxAltitude ? parseFloat(maxAltitude) : null;
    const parsedRunwayLength = runwayLength ? parseFloat(runwayLength) : null;
    const parsedEmptyWeight = emptyWeight ? parseFloat(emptyWeight) : null;
    const parsedMaxTakeoffWeight = maxTakeoffWeight ? parseFloat(maxTakeoffWeight) : null;

    // Validate parsed numbers
    if (
      isNaN(parsedYear) ||
      isNaN(parsedTotalTimeSinceNew) ||
      isNaN(parsedTotalLandings) ||
      isNaN(parsedEngineHours) ||
      (previousOwners && isNaN(parsedPreviousOwners)) ||
      (range && isNaN(parsedRange)) ||
      (cruiseSpeed && isNaN(parsedCruiseSpeed)) ||
      (maxAltitude && isNaN(parsedMaxAltitude)) ||
      (runwayLength && isNaN(parsedRunwayLength)) ||
      (emptyWeight && isNaN(parsedEmptyWeight)) ||
      (maxTakeoffWeight && isNaN(parsedMaxTakeoffWeight))
    ) {
      return res.status(400).json({
        success: false,
        error: 'Numeric fields must contain valid numbers'
      });
    }

    // Handle manufacturer logic
    const finalManufacturer = manufacturer === 'Other' ? otherManufacturer : manufacturer;
    if (manufacturer === 'Other' && (!otherManufacturer || otherManufacturer.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Other manufacturer name is required when manufacturer is "Other"'
      });
    }

    // Create the jet bidding listing
    const newListing = await prisma.jetForBids.create({
      data: {
        manufacturer: finalManufacturer,
        otherManufacturer: manufacturer === 'Other' ? otherManufacturer : null,
        model,
        year: parsedYear,
        serialNumber,
        totalTimeSinceNew: parsedTotalTimeSinceNew,
        totalLandings: parsedTotalLandings,
        engineMakeModel,
        engineHours: parsedEngineHours,
        avionicsSuite,
        interiorConfig,
        interiorImageUrls,
        exteriorImageUrls,
        price,
        currentLocation,
        registrationNumber,
        contactDetails,
        previousOwners: parsedPreviousOwners,
        maintenanceProgram: maintenanceProgram || null,
        airframeEngineStatus: airframeEngineStatus || null,
        refurbishmentDate: refurbishmentDate || null,
        wifiConnectivity: wifiConnectivity || null,
        lavatoryGalleyDetails: lavatoryGalleyDetails || null,
        cabinAmenities: cabinAmenities || null,
        range: parsedRange,
        cruiseSpeed: parsedCruiseSpeed,
        maxAltitude: parsedMaxAltitude,
        runwayLength: parsedRunwayLength,
        emptyWeight: parsedEmptyWeight,
        maxTakeoffWeight: parsedMaxTakeoffWeight,
        deliveryAvailability: deliveryAvailability || null,
        vendorId,
        biddingEndDate: biddingEnd,
        minimumBidIncrement: minBidIncrement,
        status: 'ACTIVE', // Changed from PENDING to ACTIVE for bidding
        biddingStatus: 'OPEN' // New field to track bidding status
      }
    });

    res.status(200).json({
      success: true,
      message: 'Jet listing for bidding created successfully',
      jet: newListing
    });

  } catch (error) {
    console.error('Error creating jet bidding listing:', error.message, error.stack);

    switch (error.code) {
      case 'P2002':
        if (error.meta?.target?.includes('registration_number')) {
          return res.status(409).json({
            success: false,
            message: 'A jet with this registration number already exists'
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
router.get('/bids/preview/:id', verifyToken, async(req,res) => {
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

      const jet = await prisma.jetForBids.findUnique({
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
router.put('/status/:id', verifyToken, async (req, res) => {
  try {
    const jetId = req.params.id;
    const { status } = req.body;

    // Check if jet exists
    const existingJet = await prisma.jet.findUnique({
      where: { id: jetId },
    });

    if (!existingJet) {
      return res.status(404).json({
        success: false,
        message: 'Jet listing not found'
      });
    }

    // Define valid statuses
    const validStatuses = ['PENDING', 'ACTIVE', 'SOLD'];
    
    // Validate required field: status
    if (!status || status.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: status'
      });
    }

    // Validate status value
    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: `Invalid status value. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Update the jet listing status
    const updatedListing = await prisma.jet.update({
      where: { id: jetId },
      data: {
        status: status.toUpperCase()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Jet listing status updated successfully',
      jet: updatedListing
    });

  } catch (error) {
    console.error('Error updating jet listing status:', error.message, error.stack);

    switch (error.code) {
      case 'P2025': // Prisma code for record not found during update
        return res.status(404).json({
          success: false,
          message: 'Jet listing not found during update'
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

module.exports = router;

