import schema from "./user.schema.js";

const registerUserValidation = async (req, res, next) => {
  try {
    const value = schema.user.validate(req.body);
    if (value?.error) {
      res.json({
        success: false,
        message: value?.error?.details[0]?.message,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export { registerUserValidation };
