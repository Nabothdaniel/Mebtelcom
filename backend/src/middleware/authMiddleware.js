import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
  
    const token = authHeader?.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "Access denied" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };

  export {authenticate};