const router = require('express').Router();
const { Prisma } = require('../../../generated/prisma');
const verifyToken = require('../../middlewares/vendorauthmiddleware');
const prisma = require('../../prisma');
const { addDays } = require('date-fns');

function checkUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

// POST /new - Create a new car listing
router.post('/new', verifyToken, async (req, res) => {
    try {
        const {
            brand,
            model,
            year,
            carType,
            color,
            interiorColor,
            seats,
            doors,
            transmission,
            driveType,
            fuel,
            condition,
            price,
            weeklyDiscount,
            monthlyDiscount,
            deposit,
            vin,
            licensePlate,
            deliveryOption,
            insuranceInfo,
            rentalTerms,
            description,
            features,
            isFeatured,
            isAvailable,
            mileage,
            engineSize,
            horsepower,
            acceleration,
            topSpeed,
            images,
            location,
            vendorId
        } = req.body;

        // Validate required fields
        if (!brand || !model || !year || !carType || !color || !interiorColor || !seats || !transmission || !driveType || !fuel || !price || !description || !location) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Validate data types and formats
        if (isNaN(year) || year < 1990 || year > new Date().getFullYear()) {
            return res.status(400).json({ success: false, message: 'Invalid manufacture year' });
        }
        if (isNaN(seats) || seats < 2 || seats > 8) {
            return res.status(400).json({ success: false, message: 'Invalid number of seats' });
        }
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid price' });
        }
        if (!Array.isArray(features) || !Array.isArray(images)) {
            return res.status(400).json({ success: false, message: 'Features and images must be arrays' });
        }

        // Transform enum values to match Prisma schema
        const carTypeEnum = carType.toUpperCase().replace(/ /g, '_');
        const transmissionEnum = transmission.toUpperCase().replace(/-/g, '_');
        const driveTypeEnum = driveType.toUpperCase().replace(/ /g, '_');
        const fuelEnum = fuel.toUpperCase().replace(/ /g, '_').replace(/-/g, '_');
        const conditionEnum = condition ? condition.toUpperCase().replace(/ /g, '_') : null;
        const deliveryOptionEnum = deliveryOption ? deliveryOption.toUpperCase() : null;

        // Create the car record
        const newCar = await prisma.car.create({
            data: {
                brand,
                model,
                year: parseInt(year),
                carType: carTypeEnum,
                color,
                interiorColor,
                seats: parseInt(seats),
                doors: doors ? parseInt(doors) : null,
                transmission: transmissionEnum,
                driveType: driveTypeEnum,
                fuel: fuelEnum,
                condition: conditionEnum,
                price: parseFloat(price),
                weeklyDiscount: weeklyDiscount ? parseFloat(weeklyDiscount) : null,
                monthlyDiscount: monthlyDiscount ? parseFloat(monthlyDiscount) : null,
                deposit: deposit ? parseFloat(deposit) : null,
                vin,
                licensePlate,
                deliveryOption: deliveryOptionEnum,
                insuranceInfo,
                rentalTerms,
                description,
                features,
                isFeatured: !!isFeatured,
                isAvailable: isAvailable !== undefined ? isAvailable : true,
                mileage: mileage ? parseInt(mileage) : null,
                engineSize,
                horsepower: horsepower ? parseInt(horsepower) : null,
                acceleration: acceleration ? parseFloat(acceleration) : null,
                topSpeed: topSpeed ? parseInt(topSpeed) : null,
                images,
                location,
                vendorId,
            },
        });

        return res.status(201).json({
            success: true,
            message: 'Car listing created successfully',
            data: newCar,
        });
    } catch (error) {
        console.error('Error creating car:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the car listing.',
        });
    }
});
router.get('/all',verifyToken, async(req,res) => {
    try {
        const cars = await prisma.car.findMany(
            {where: {
                vendorId: req.user.id
            },}
        )
        if(!cars){
            res.status(404).send({
                success:false,
                message:"No Cars Available \n You Have Not Added Any Cars"
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
router.delete('/:id', verifyToken, async(req,res) => {
    try {
        if (!checkUUID(req.params.id)){
            res.status(400).send({
                success:false,
                message:"Invalid Id"
            })
        }
      const deleteCar = await prisma.car.delete({
            where:{
                id:req.params.id
            }
        })
        if(car.vendorId != req.user.id){
            res.status(400).send({
                success:false,
                message:"You Cant Edit Another Vendor's Listing"
            })
        }
        if(!deleteCar){
            throw new Error("Deletion Failed")
        }
        return res.status(200).send({
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Internal Server Error",
            
        })
    }
})
router.get('/edit/:id', verifyToken, async(req,res) => {
    try {
        if (!checkUUID(req.params.id)){
            res.status(400).send({
                success:false,
                message:"Invalid Id"
            })
        }
      const car = await prisma.car.findUnique({
            where:{
                id:req.params.id
            }
        })
        if(!car){
            throw new Error("Car Does Not Exist")
        }
        if(car.vendorId != req.user.id){
            res.status(400).send({
                success:false,
                message:"You Cant Edit Another Vendor's Listing"
            })
        }
        return res.status(200).send({
            success:true,
            car
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Internal Server Error",
            
        })
    }
})
router.put('/edit/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            brand,
            model,
            year,
            carType,
            color,
            interiorColor,
            seats,
            doors,
            transmission,
            driveType,
            fuel,
            condition,
            price,
            weeklyDiscount,
            monthlyDiscount,
            deposit,
            vin,
            licensePlate,
            deliveryOption,
            insuranceInfo,
            rentalTerms,
            features,
            isFeatured,
            isAvailable,
            mileage,
            engineSize,
            horsepower,
            acceleration,
            topSpeed,
            images,
            location,
            vendorId,
        } = req.body;

        // Validate ID format
        if (!checkUUID(id)) {
            return res.status(400).json({ success: false, message: 'Invalid car ID format' });
        }

        // Check if car exists and belongs to vendor
        const existingCar = await prisma.car.findUnique({
            where: { id: id },
        });

        if (!existingCar) {
            return res.status(404).json({ success: false, message: 'Car listing not found' });
        }

        if (existingCar.vendorId != req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to edit this listing' });
        }

        // Validate provided fields
        if (year && (isNaN(year) || year < 1990 || year > new Date().getFullYear())) {
            return res.status(400).json({ success: false, message: 'Invalid manufacture year' });
        }
        if (seats && (isNaN(seats) || seats < 2 || seats > 8)) {
            return res.status(400).json({ success: false, message: 'Invalid number of seats' });
        }
        if (price && (isNaN(price) || price <= 0)) {
            return res.status(400).json({ success: false, message: 'Invalid price' });
        }
        if (features && !Array.isArray(features)) {
            return res.status(400).json({ success: false, message: 'Features must be an array' });
        }
        if (images && !Array.isArray(images)) {
            return res.status(400).json({ success: false, message: 'Images must be an array' });
        }

        // Transform enum values if provided
        const carTypeEnum = carType ? carType.toUpperCase().replace(/ /g, '_') : undefined;
        const transmissionEnum = transmission ? transmission.toUpperCase().replace(/-/g, '_') : undefined;
        const driveTypeEnum = driveType ? driveType.toUpperCase().replace(/ /g, '_') : undefined;
        const fuelEnum = fuel ? fuel.toUpperCase().replace(/ /g, '_').replace(/-/g, '_') : undefined;
        const conditionEnum = condition ? condition.toUpperCase().replace(/ /g, '_') : undefined;
        const deliveryOptionEnum = deliveryOption ? deliveryOption.toUpperCase() : undefined;

        // Update the car record
        const updatedCar = await prisma.car.update({
            where: { id: id },
            data: {
                ...(brand && { brand }),
                ...(model && { model }),
                ...(year && { year: parseInt(year) }),
                ...(carTypeEnum && { carType: carTypeEnum }),
                ...(color && { color }),
                ...(interiorColor && { interiorColor }),
                ...(seats && { seats: parseInt(seats) }),
                ...(doors && { doors: parseInt(doors) }),
                ...(transmissionEnum && { transmission: transmissionEnum }),
                ...(driveTypeEnum && { driveType: driveTypeEnum }),
                ...(fuelEnum && { fuel: fuelEnum }),
                ...(conditionEnum && { condition: conditionEnum }),
                ...(price && { price: parseFloat(price) }),
                ...(weeklyDiscount && { weeklyDiscount: parseFloat(weeklyDiscount) }),
                ...(monthlyDiscount && { monthlyDiscount: parseFloat(monthlyDiscount) }),
                ...(deposit && { deposit: parseFloat(deposit) }),
                ...(vin && { vin }),
                ...(licensePlate && { licensePlate }),
                ...(deliveryOptionEnum && { deliveryOption: deliveryOptionEnum }),
                ...(insuranceInfo && { insuranceInfo }),
                ...(rentalTerms && { rentalTerms }),
                ...(features && { features }),
                ...(isFeatured !== undefined && { isFeatured: !!isFeatured }),
                ...(isAvailable !== undefined && { isAvailable }),
                ...(mileage && { mileage: parseInt(mileage) }),
                ...(engineSize && { engineSize }),
                ...(horsepower && { horsepower: parseInt(horsepower) }),
                ...(acceleration && { acceleration: parseFloat(acceleration) }),
                ...(topSpeed && { topSpeed: parseInt(topSpeed) }),
                ...(images && { images }),
                ...(location && { location }),
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Car listing updated successfully',
            data: updatedCar,
        });
    } catch (error) {
        console.error('Error updating car:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the car listing.',
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
router.put('/boost/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { days, transactionSignature, transactionLink } = req.body;

        // Validate input
        if (!checkUUID(id)) {
            return res.status(400).json({ success: false, message: 'Invalid car ID format' });
        }
        if (![7, 14, 30].includes(Number(days))) {
            return res.status(400).json({ success: false, message: 'Invalid boost duration' });
        }
        if (!transactionSignature) {
            return res.status(400).json({ success: false, message: 'Missing transaction signature' });
        }

        // Find car and check ownership
        const car = await prisma.car.findUnique({ where: { id } });
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        if (car.vendorId !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to boost this listing' });
        }

        // Check if already boosted and not expired
        if (car.sponsored && car.endDate && new Date(car.endDate) > new Date()) {
            return res.status(400).json({ success: false, message: `Car is already boosted until ${new Date(car.endDate).toLocaleDateString()}` });
        }

        // Calculate new end date
        const newEndDate = addDays(new Date(), Number(days));

        // Update car
        const updatedCar = await prisma.car.update({
            where: { id },
            data: {
                sponsored: true,
                endDate: newEndDate,
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Car boosted successfully',
            data: updatedCar,
        });
    } catch (error) {
        console.error('Error boosting car:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while boosting the car listing.' });
    }
});
router.put('/book/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;

        console.log(newStatus)

        if (!checkUUID(id)) {
            return res.status(400).json({ success: false, message: 'Invalid car ID format' });
        }

        const car = await prisma.car.findUnique({
            where: { id: id },
        });

        if (!car) {
            return res.status(404).json({ success: false, message: 'Car listing not found' });
        }

        if (car.vendorId != req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to edit this listing' });
        }

        const updatedCar = await prisma.car.update({
            where: { id: id },
            data: {
                status:newStatus
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Car listing status updated successfully',
            data: updatedCar.status,
        });
    } catch (error) {
        console.error('Error updating car status:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the car listing status.',
        });
    }
});
router.get('/bookings', verifyToken, async (req, res) => {
    try {
        const newBookings = await prisma.carBookings.findMany({
            where: {
                vendorId:req.user.id
            }
        });
        if (newBookings.length === 0) {
            return res.status(404).send({
                success: false,
                message: "You Don't Have Any Bookings"
            });
        }
        return res.status(200).send({
            success: true,
            bookings: newBookings
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

router.put('/bookings/:id/read', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        if (!checkUUID(id)) {
            return res.status(400).json({ success: false, message: 'Invalid booking ID format' });
        }

        // Check if booking exists and belongs to vendor
        const existingBooking = await prisma.carBookings.findUnique({
            where: { id: id },
        });

        if (!existingBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (existingBooking.vendorId !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
        }

        // Update booking to mark as read
        const updatedBooking = await prisma.carBookings.update({
            where: { id: id },
            data: {
                read: true
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Booking marked as read successfully',
            data: updatedBooking
        });
    } catch (error) {
        console.error('Error marking booking as read:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while marking the booking as read.',
        });
    }
});

module.exports = router;

