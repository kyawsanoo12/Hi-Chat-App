import jwt from "jsonwebtoken";

export const auth =  (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
       
        let decodedId;
        if (token) {
            const decode = jwt.verify(token, process.env.secret, { complete: true });
            decodedId = decode.payload._id;
            
        } else {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        req.userId = decodedId;
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
}