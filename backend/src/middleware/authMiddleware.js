import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  let token;

  // Check for token in Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'No active session found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded.user; // Attach user info to request
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: 'No active session found' });
  }
};

