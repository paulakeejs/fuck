const router = require('express').Router();
const prisma = require('../../prisma');
const checkAuth = require('../../middlewares/authmiddleware');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

router.post('/new', async (req, res) => {
    try {
        // Input validation
        const requiredFields = ['email', 'companyName', 'name', 'phone', 'serviceType'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Check for existing vendor
        const userExist = await prisma.vendor.findFirst({
            where: {
                OR: [
                    { email: req.body.email },
                    { companyName: req.body.companyName }
                ]
            }
        });

        if (userExist) {
            return res.status(409).json({  // 409 Conflict is more appropriate
                success: false,
                message: "You have applied before. Please wait for our team to contact you."
            });
        }

        // Create new vendor
        const newUser = await prisma.vendor.create({
            data: {
                companyName: req.body.companyName,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                website: req.body.website || null,  // Explicit null for optional fields
                serviceType: req.body.serviceType,
                description: req.body.description || null,
                status: "PENDING"  // Explicit status
            },
            select: {  // Limit returned fields
                id: true,
                companyName: true,
                email: true,
                status: true
            }
        });

        if (!newUser) {
            return res.status(500).json({  // 500 for server errors
                success: false,
                message: "Error during application. Please try again later."
            });
        }

        // Success response
        return res.status(201).json({
            success: true,
            message: "Application successful. You will receive a call from our team soon.",
            data: newUser
        });

    } catch (error) {
        console.error('Vendor application error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        const vendor = await prisma.vendor.findUnique({
            where: { id: req.params.id },  // Use params.id instead of body.id
            select: {  // Explicitly select return fields
                id: true,
                email: true,
                companyName: true,
                status: true,
                createdAt: true
                // Exclude sensitive fields like password
            }
        });

        if (!vendor) {
            return res.status(404).json({  // 404 for not found
                success: false,
                message: "User not found"
            });
        }
        if(vendor.status != "APPROVED"){
            return res.status(400).json({  // 404 for not found
                success: false,
                message: "Account Not Approved Try Again"
            });
        }
        if(vendor.password){
            return res.status(400).json({  // 404 for not found
                success: false,
                message: "You have already created a password"
            });
        }

        return res.status(200).json({
            success: true,
            data:vendor
        });

    } catch (error) {
        console.error('User fetch error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.post('/set/password/:id', async (req, res) => {
  try {
      // Validate UUID format first
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(req.params.id)) {
          return res.status(400).json({ 
              success: false,
              message: "Invalid ID format" 
          });
      }

      // Validate password presence and strength
      if (!req.body.password) {
          return res.status(400).json({
              success: false,
              message: "Password is required"
          });
      }

      if (typeof req.body.password !== 'string' || req.body.password.length < 8) {
          return res.status(400).json({
              success: false,
              message: "Password must be a string with at least 8 characters"
          });
      }

      // Check if user exists and get current password status
      const vendor = await prisma.vendor.findUnique({
          where: { id: req.params.id },
          select: {
              password: true,
              status: true
          }
      });

      if (!vendor) {
          return res.status(404).json({
              success: false,
              message: "Vendor not found"
          });
      }
      
      // Check if password already exists
      if (vendor.password !== null) {
        return res.status(201).json({
            success: false,
            message: "Password already set. Use password reset if needed."
        });
    }
      if (vendor.status !== "APPROVED") {
          return res.status(403).json({  // Changed to 403 Forbidden
              success: false,
              message: "Account not approved"
          });
      }

      // Hash the password
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Update password
      const updatedUser = await prisma.vendor.update({
          where: { id: req.params.id },
          data: { 
              password: hashPassword,
          },
          select: { 
              id: true,
              email: true,
              companyName: true,
              status: true,
              createdAt: true
          }
      });

      return res.status(200).json({
          success: true,
          message: "Password set successfully",
          data: updatedUser
      });

  } catch (error) {
      console.error('Password set error:', error);
      return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});
router.post('/user/login',  async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const vendor = await prisma.vendor.findUnique({
        where: {
          email: email
        }
      });
  
      if (!vendor) {
        return res.status(404).json({
          success: false,
          message: "User Not Found"
        });
      }
  
      if (vendor.status == "PENDING") {
        return res.status(202).json({
          success: false,
          message: "Your Account Is Not Approved Yet. Wait For A Confirmation Call From Our Team"
        });
      }
      if (vendor.password == null){
        return res.status(202).json({
          success: false,
          message: "You have not set a password for your account. \n Check your email or contact password"
        });
      }
      const checkPassword = bcrypt.compareSync(password, vendor.password);
      if (!checkPassword) {
        return res.status(409).json({
          success: false,
          message: "Invalid Email Or Password. Try Again!!"
        });
      }
  
      // Create a token (using JWT as example)
      const token = jwt.sign(
        { id: vendor.id, email: vendor.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // Set HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
  
      return res.status(200).json({
        success: true,
        token: token,
        data:vendor.serviceType // Optional: Only if you need it accessible by client-side JS
      });
  
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
module.exports = router;

