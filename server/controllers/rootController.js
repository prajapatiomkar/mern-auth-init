const rootController = (req, res, next) => {
  try {
    res.status(200).json({ message: "mern-auth-init server 🚀" });
  } catch (error) {
    next(error);
  }
};

export default rootController;
