import User from "../models/User";

export const protect = async (req, res, next) => {
  try {
    // get authoriztion header
    const authHeader = req.headers.authorization;

    // check whether token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Please login first...",
      });
    }

    // extract token
    const token = authHeader.split("")[1];

    // verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists...",
      });
    }

    // attach user to req
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized. Please login first",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Acces denied. Admins only",
    });
  }

  next();
};
