import userModel from "../models/userModel.js";

// Here, We register new user.
const userRegisterController = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const user = await userModel.create({ email, password, username });
    user.save();

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Here, We verify the register user.
const userLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        messege: "email not found",
      });
    }

    const passwords = await user.matchPassword(password);

    if (!passwords) {
      res.status(401).json({ message: "incorrect password" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};

export { userRegisterController, userLoginController };
