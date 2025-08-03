const router = require('express').Router();
const { Prisma } = require('../../../generated/prisma');
const verifyToken = require('../../middlewares/vendorauthmiddleware');
const prisma = require('../../prisma');
const { addDays } = require('date-fns');

function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}router.get('/recommended', async (req, res) => {
    try {
      const destinations = await prisma.luxuryDestination.findMany();
      
      if (!destinations || destinations.length === 0) {
        return res.status(404).json({ success: false, message: 'No destinations available, try again later.' });
      }

      const destinationsWithPrices = await Promise.all(
        destinations.map(async (destination) => {
          const roomTypes = await prisma.roomType.findMany({
            where: {
              vendorId: destination.vendorId
            },
            include: {
              extraFees: true // Properly include the relation
            }
          });
          
          return {
            ...destination,
            roomTypes: roomTypes || [] // Return all matching room types with their fees
          };
        })
      );

      res.json({ 
        success: true, 
        data: destinationsWithPrices 
      });
    } catch (error) {
      console.error('Error fetching destination:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        message: 'Failed to fetch recommended destinations'
      });
    }
});

module.exports = router

