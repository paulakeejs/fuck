const router = require('express').Router();
const { Prisma } = require('../../../generated/prisma');
const verifyToken = require('../../middlewares/vendorauthmiddleware');
const prisma = require('../../prisma');
const { addDays } = require('date-fns');

function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

router.get('/all', async(req,res) => {
    try {
        const cars = await prisma.car.findMany(
            {where: {
                status: "APPROVED"
            },}
        )
        if(cars.length == 0){
          return  res.status(404).send({
                success:false,
                message:"No Cars Available \n Try Again Later"
            })
        }
        return res.status(200).send({
            success:true,
            cars
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal Server Error",
            error
        })
    }
})
router.get('/:id', async(req,res) => {
    try {
        if (!checkUUID(req.params.id)){
            return res.status(400).send({
                success:false,
                message:"Invalid Id"
            })
        }
      const car = await prisma.car.findUnique({
            where:{
                id:req.params.id,
                status:"APPROVED"
            }
        })
        if(!car){
            throw new Error("Car Does Not Exist")
        }
        return res.status(200).send({
            success:true,
            car
        })
    } catch (error) {
        console.log(error)
       return res.status(500).send({
            success:false,
            message:"Internal Server Error",
            
        })
    }
})
router.post('/bookings/new', async (req, res) => {
    try {
        const { name, email, phone, message, listingId, vendorId } = req.body;
        console.log(req.body)
        if (!name || !email || !phone || !message || !listingId || !vendorId) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields."
            });
        }
        const newBooking = await prisma.carBookings.create({
            data: {
                name,
                email,
                phone,
                message,
                listingId,
                vendorId
            }
        });
        return res.status(201).send({
            success: true,
            booking: newBooking,
            message:"Booking Request Sent"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
});

module.exports = router

