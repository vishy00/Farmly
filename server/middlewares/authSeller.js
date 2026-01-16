import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    // 1. Check karein ki cookies aa rahi hain ya nahi
    console.log("--- Auth Check Start ---");
    console.log("All Cookies:", req.cookies);
    
    const { sellerToken } = req.cookies;

    if(!sellerToken){
        console.log("Cookie missing!");
        return res.json({ success: false, message: 'Not Authorized: No Token' })
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        
        // 2. Payload check karein (kya token me email hai?)
        if(tokenDecode.email === process.env.SELLER_EMAIL){
            next();
        } else {
            console.log("Email mismatch:", tokenDecode.email);
            return res.json({ success: false, message: 'Not Authorized: Email Mismatch' })
        }

    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.json({ success: false, message: error.message })
    }
}

export default authSeller;