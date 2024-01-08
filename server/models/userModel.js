import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (password, next) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};

userSchema.methods.generateJWT = async function (next) {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return token;
  } catch (error) {
    next(error);
  }
};
const userModel = mongoose.model("User", userSchema);

export default userModel;
