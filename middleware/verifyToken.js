import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(404).json({message: "Unauthorized - Missing token"})
    }
    const { ACCESS_TOKEN_SECRET } = process.env;

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ msg: 'Unauthorized - Token expired' });
            } else {
                return res.status(403).json({ msg: 'Forbidden - Invalid token' });
            }
        }
        req.email = decoded.email;
        next();
    });
};
