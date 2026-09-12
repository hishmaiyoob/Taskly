export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
};
