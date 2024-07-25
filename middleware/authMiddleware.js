const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateRoute = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    const { userId } = verified
    
    const user = await User.findOne({ userId: userId });

    req.user = user

    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateRoute,
};
