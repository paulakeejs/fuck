const router = require('express').Router();
const { Prisma } = require('../../../generated/prisma');
const verifyToken = require('../../middlewares/vendorauthmiddleware');
const prisma = require('../../prisma');
const { addDays } = require('date-fns');

function checkUUID(id) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

// POST /register - Register a new luxury destination
router.post('/register', verifyToken, async (req, res) => {
  try {
    const data = req.body;

    // Define required fields based on schema
    const requiredFields = [
      'propertyName',
      'propertyType',
      'address',
      'city',
      'country',
      'phone',
      'email',
      'description',
      'cancellationPolicy',
    ];

    // Validate required fields
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate numeric fields
    const numericFields = ['totalRooms', 'yearBuilt', 'lastRenovated',];
    for (const field of numericFields) {
      if (data[field] && (isNaN(data[field]) || data[field] < 0)) {
        return res.status(400).json({
          success: false,
          error: `${field} must be a positive number`,
        });
      }
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Validate image count (max 300)
    const totalImages = (data.mainImageUrl ? 1 : 0) +
      (Array.isArray(data.otherImageUrls) ? data.otherImageUrls.length : 0) +
      (data.sectionImages ? Object.values(data.sectionImages).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0) : 0);
    if (totalImages > 300) {
      return res.status(400).json({
        success: false,
        error: 'Total images cannot exceed 300',
      });
    }

    // Prepare data for Prisma
    const destinationData = {
      propertyName: data.propertyName,
      propertyType: data.propertyType,
      starRating: data.starRating || null,
      address: data.address,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode || null,
      phone: data.phone,
      email: data.email,
      website: data.website || null,
      checkInTime: data.checkInTime || '15:00',
      checkOutTime: data.checkOutTime || '11:00',
      languagesSpoken: Array.isArray(data.languagesSpoken) ? data.languagesSpoken : [],
      description: data.description,
      highlights: data.highlights || null,
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
      roomTypes: data.roomTypes || null,
      totalRooms: data.totalRooms ? parseInt(data.totalRooms, 10) : null,
      yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt, 10) : null,
      lastRenovated: data.lastRenovated ? parseInt(data.lastRenovated, 10) : null,
      awards: data.awards || null,
      sustainabilityPractices: Array.isArray(data.sustainabilityPractices) ? data.sustainabilityPractices : [],
      wheelchairAccessible: !!data.wheelchairAccessible,
      accessibleRooms: data.accessibleRooms || null,
      accessibleBathrooms: !!data.accessibleBathrooms,
      accessibleParking: !!data.accessibleParking,
      accessibleRestaurants: !!data.accessibleRestaurants,
      accessiblePools: !!data.accessiblePools,
      brailleSignage: !!data.brailleSignage,
      hearingImpairedServices: !!data.hearingImpairedServices,
      visualImpairedServices: !!data.visualImpairedServices,
      serviceAnimalsAllowed: !!data.serviceAnimalsAllowed,
      cancellationPolicy: data.cancellationPolicy,
      petPolicy: data.petPolicy || null,
      smokingPolicy: data.smokingPolicy || null,
      childrenPolicy: data.childrenPolicy || null,
      groupPolicy: data.groupPolicy || null,
      paymentMethods: Array.isArray(data.paymentMethods) ? data.paymentMethods : [],
      depositRequired: !!data.depositRequired,
      depositAmount: data.depositAmount || null,
      minimumStay: data.minimumStay || null,
      ageRestriction: data.ageRestriction || null,
      quietHours: data.quietHours || '22:00 - 08:00',
      specialOffers: data.specialOffers || null,
      loyaltyProgram: !!data.loyaltyProgram,
      mainImageUrl: data.mainImageUrl || null,
      otherImageUrls: Array.isArray(data.otherImageUrls) ? data.otherImageUrls : [],
      imageSections: Array.isArray(data.imageSections)
        ? data.imageSections
        : [
          'Rooms',
          'Bathroom',
          'Living area',
          'Exterior',
          'Common areas',
          'Pool',
          'Dining',
          'Amenities',
          'Views',
          "What's nearby",
          'Family',
          'Accessibility',
        ],
      sectionImages: data.sectionImages ? JSON.parse(JSON.stringify(data.sectionImages)) : null,
      imageDescriptions: data.imageDescriptions ? JSON.parse(JSON.stringify(data.imageDescriptions)) : null,
      vendorId: req.user.id,
    };

    // Create the LuxuryDestination record
    const destination = await prisma.luxuryDestination.create({
      data: destinationData,
    });

    // Update the vendor's completed field
    await prisma.vendor.update({
      where: { id: req.user.id },
      data: { completed: true },
    });

    // Respond with success
    res.status(201).json({
      success: true,
      destination,
    });
  } catch (error) {
    console.log('LuxuryDestination registration error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
});
router.get('/me', verifyToken, async (req, res) => {
  try {
    const destination = await prisma.luxuryDestination.findFirst({
      where: { vendorId: req.user.id },
    });
    if (!destination) {
      return res.status(404).json({ success: false, message: 'No destination found for this vendor.' });
    }
    res.json({ success: true, destination });
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
router.post('/new', verifyToken, async (req, res) => {
  try {
    const {
      name,
      description,
      size,
      occupancy,
      bedConfiguration,
      basePrice,
      minimumStay,
      depositRequired = false,
      depositAmount,
      totalRooms,
      amenities = [],
      accessibilityFeatures = [],
      bathroomFeatures = [],
      bedroomFeatures = [],
      entertainment = [],
      familyFriendly = [],
      foodAndDrink = [],
      moreFeatures = [],
      outdoorSpace = [],
      safetyFeatures = [],
      freebies = [],
      extraFees = [],
      images = []
    } = req.body;

    // Basic validation
    if (!name || !description || !size || !occupancy || !bedConfiguration || !basePrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the room type
    const newRoomType = await prisma.roomType.create({
      data: {
        name,
        description,
        size: parseFloat(size),
        occupancy: parseInt(occupancy),
        bedConfiguration,
        basePrice: parseFloat(basePrice),
        minimumStay: minimumStay ? parseInt(minimumStay) : null,
        depositRequired: Boolean(depositRequired),
        depositAmount: depositAmount ? parseFloat(depositAmount) : null,
        totalRooms: totalRooms ? parseInt(totalRooms) : null,
        amenities,
        accessibilityFeatures,
        bathroomFeatures,
        bedroomFeatures,
        entertainment,
        familyFriendly,
        foodAndDrink,
        moreFeatures,
        outdoorSpace,
        safetyFeatures,
        freebies,
        vendorId: req.user.id,
        extraFees: {
          create: extraFees.map(fee => ({
            name: fee.name,
            amount: parseFloat(fee.amount)
          }))
        },
        images: {
          create: images.map(img => ({
            url: img.url,
            description: img.description || null
          }))
        }
      },
      include: {
        extraFees: true,
        images: true
      }
    });
    res.status(201).send({
      success: true

    })
  } catch (error) {
    console.error('Error creating room type:', error);

    // Handle Prisma unique constraint violation (duplicate room name)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Room type with this name already exists' });
    }

    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
});
router.get('/all', verifyToken, async (req, res) => {
  try {
    const roomTypes = await prisma.roomType.findMany({
      include: {
        images: true,
        extraFees: true
      },
      orderBy: {
        basePrice: 'asc'
      }
    });

    const transformedRooms = roomTypes.map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      size: room.size,
      occupancy: room.occupancy,
      bedConfiguration: room.bedConfiguration,
      basePrice: room.basePrice,
      minimumStay: room.minimumStay,
      depositRequired: room.depositRequired,
      depositAmount: room.depositAmount,
      totalRooms: room.totalRooms,
      amenities: room.amenities || [],
      accessibilityFeatures: room.accessibilityFeatures || [],
      bathroomFeatures: room.bathroomFeatures || [],
      bedroomFeatures: room.bedroomFeatures || [],
      entertainment: room.entertainment || [],
      familyFriendly: room.familyFriendly || [],
      foodAndDrink: room.foodAndDrink || [],
      moreFeatures: room.moreFeatures || [],
      outdoorSpace: room.outdoorSpace || [],
      safetyFeatures: room.safetyFeatures || [],
      freebies: room.freebies || [],
      extraFees: room.extraFees,
      images: room.images,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt
    }));

    res.status(200).send({
      success: true,
      data: transformedRooms
    });
  } catch (error) {
    console.error('Error fetching room types:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
});
router.get('/edit/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    if (!checkUUID(id)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid room ID'
      })
    }
    const room = await prisma.roomType.findUnique({
      where: { id },
      include: {
        extraFees: {
          select: {
            id: true,
            name: true,
            amount: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            description: true
          },
        },
      },
    });
    if (!room) {
      return res.status(404).send({
        success: false,
        message: 'Room not found'
      })
    }
    if (room.vendorId !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: 'You are not authorized to view this room'
      })
    }
    res.status(200).send({
      success: true,
      data: room
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Failed to fetch room'
    })
  }
})
router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      size,
      occupancy,
      bedConfiguration,
      basePrice,
      minimumStay,
      depositRequired = false,
      depositAmount,
      totalRooms,
      amenities = [],
      accessibilityFeatures = [],
      bathroomFeatures = [],
      bedroomFeatures = [],
      entertainment = [],
      familyFriendly = [],
      foodAndDrink = [],
      moreFeatures = [],
      outdoorSpace = [],
      safetyFeatures = [],
      freebies = [],
      extraFees = [],
      images = [],
    } = req.body;

    // Basic validation
    if (!name || !description || !size || !occupancy || !bedConfiguration || !basePrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if room type exists
    const existingRoomType = await prisma.roomType.findUnique({
      where: { id },
    });
    if (!existingRoomType) {
      return res.status(404).json({ error: 'Room type not found' });
    }

    // Update the room type
    const updatedRoomType = await prisma.roomType.update({
      where: { id },
      data: {
        name,
        description,
        size: parseFloat(size),
        occupancy: parseInt(occupancy),
        bedConfiguration,
        basePrice: parseFloat(basePrice),
        minimumStay: minimumStay ? parseInt(minimumStay) : null,
        depositRequired: Boolean(depositRequired),
        depositAmount: depositAmount ? parseFloat(depositAmount) : null,
        totalRooms: totalRooms ? parseInt(totalRooms) : null,
        amenities,
        accessibilityFeatures,
        bathroomFeatures,
        bedroomFeatures,
        entertainment,
        familyFriendly,
        foodAndDrink,
        moreFeatures,
        outdoorSpace,
        safetyFeatures,
        freebies,
        vendorId: req.user.id,
        extraFees: {
          // Delete existing extra fees and create new ones
          deleteMany: {},
          create: extraFees.map(fee => ({
            name: fee.name,
            amount: parseFloat(fee.amount),
          })),
        },
        images: {
          // Delete existing images and create new ones
          deleteMany: {},
          create: images.map(img => ({
            url: img.url,
            description: img.description || null,
          })),
        },
      },
      include: {
        extraFees: true,
        images: true,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedRoomType,
    });
  } catch (error) {
    console.error('Error updating room type:', error);

    // Handle Prisma unique constraint violation (duplicate room name)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Room type with this name already exists' });
    }

    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
});
router.delete('/delete/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    // Validate UUID
    if (!checkUUID(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid room ID',
      });
    }
    const room = await prisma.roomType.findUnique({
      where: { id },
    });
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found',
      });
    }
    if (room.vendorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized to delete this room',
      });
    }

    // Delete the room type (cascades to extraFees and images due to schema)
    await prisma.roomType.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting room type:', error);

    // Handle specific Prisma errors
    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete room due to existing references (e.g., bookings)',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});
module.exports = router

