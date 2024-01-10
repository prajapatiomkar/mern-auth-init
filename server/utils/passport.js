import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/userModel.js";
import { JWT_SECRET } from "./env.js";

const opts = {};

opts.jwtFromRequest = (req) => {
  try {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  } catch (error) {
    console.error("Error extracting JWT from request:", error);
    return null;
  }
};
opts.secretOrKey = JWT_SECRET;

const initializePassport = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await userModel.findOne({ _id: jwt_payload._id });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    userModel
      .findById(userId)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
};

export default initializePassport;
