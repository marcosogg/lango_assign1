import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().lowercase().required().trim(),
  password: Joi.string().required()
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().lowercase().required().trim().example("homer@simpson.com"),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const PlaceSpec = {
  place: Joi.string().required().trim(),
  category: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  lat: Joi.number().min(-90).max(90).required(),  // Valid latitude range
  long: Joi.number().min(-180).max(180).required()  // Valid longitude range
};

export const CollectionSpec = {
  title: Joi.string().required()
};