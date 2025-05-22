const express = require('express');
const path = require('path');
const { PrismaClient } = require('../generated/prisma');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const vendorRouter = require('./routes/jet_seller/vendorAuthRoutes');
const vendorMainRoutes = require('./routes/jet_seller/VendorMainRoutes');
const jetforsaleRoutes = require('./routes/jet_seller/jetforsaleRoutes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const charterMainRoutes = require('./routes/charter/charterVendorRoutes');
const jetForCharterRoutes = require('./routes/charter/jetforcharterroutes');

const prisma = new PrismaClient();

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later'
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500,
    message: 'Too many authentication attempts. Please check your request logic or wait 15 minutes to try again.'
});

const app = express();

// Custom logging middleware for debugging
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
            `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ` +
            `Status: ${res.statusCode} - ${duration}ms - Content-Type: ${res.get('Content-Type') || 'N/A'}\n`
        );
    });
    next();
});

app.use(morgan('dev'));
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the src/dist folder
app.use(express.static(path.join(__dirname, '../src/dist'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// API routes
app.use('/api/v1/authentication', authLimiter, authRouter);
app.use('/api/v1/vendor', authLimiter, vendorRouter);
app.use('/api/v1/vendor/main', vendorMainRoutes);
app.use('/api/v1/program/main', charterMainRoutes);
app.use('/api/v1/jets/sale', authLimiter, jetforsaleRoutes);
app.use('/api/v1/jets/charter', authLimiter, jetForCharterRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Handle all other routes by serving index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/dist/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});