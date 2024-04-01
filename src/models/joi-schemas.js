import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required()
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const PlaceSpec = {
  place: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  lat: Joi.number().min(1).max(10).allow("").required(),
  long: Joi.number().min(1).max(10).allow("").required(),
};

export const CollectionSpec = {
  title: Joi.string().required()
};