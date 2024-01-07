import Joi from "joi";

const schema = {
  user: Joi.object({
    username: Joi.string().min(1).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(14).required(),
  }),
};

export default schema;