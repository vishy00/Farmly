import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
    const sellerToken = req.cookies?.sellerToken;

    if (!sellerToken) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized: No token"
        });
    }

    try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        if (decoded.email !== process.env.SELLER_EMAIL) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized: Invalid seller"
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized: Token expired or invalid"
        });
    }
};

export default authSeller;