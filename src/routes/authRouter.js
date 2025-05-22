const router = require('express').Router();
const prisma = require('../prisma');
const nacl = require('tweetnacl');
const { PublicKey } = require('@solana/web3.js');
const jwt = require('jsonwebtoken');

router.post('/verify', async (req, res) => {
    try {
        const { message, publicKey, signature } = req.body;

        // Validate required fields
        if (!message || !publicKey || !signature) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: message, publicKey, or signature"
            });
        }

        // Verify the signature
        const newMessage = new TextEncoder().encode(message);
        const isValidSignature = nacl.sign.detached.verify(
            newMessage,
            new Uint8Array(signature.data),
            new PublicKey(publicKey).toBytes()
        );

        if (!isValidSignature) {
            return res.status(401).json({
                success: false,
                message: "Invalid signature. Please use your assigned wallet."
            });
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { publicKey: publicKey }
        });

        // Create new user if doesn't exist
        if (!user) {
            user = await prisma.user.create({
                data: {
                    publicKey: publicKey,
                    admin: false,
                    status: "Active",
                }
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, publicKey: user.publicKey },
            process.env.JWT_SECRET || 'your-secret-key',
            
        );

        // Successful response
        res.status(200).json({
            success: true,
            token: token,
        });

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error during authentication"
        });
    }
});

module.exports = router;

