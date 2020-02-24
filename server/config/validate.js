const Joi = require('@hapi/joi');

function signupValidate(data) {
  const schema = Joi.object({
    name: Joi.string().max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(16).required(),
    passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    address: Joi.string().max(50),
    img: Joi.any(),
    slogan: Joi.any(),
    description: Joi.any(),
  });

  return schema.validate(data);
}

function loginValidate(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(16).required(),
  });

  return schema.validate(data);
}

function editUserValidate(data) {
  const schema = Joi.object({
    name: Joi.string().max(10).required(),
    address: Joi.string().max(50).required(),
    slogan: Joi.any(),
    description: Joi.any(),
  });

  return schema.validate(data);
}

function productValidate(data) {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    description: Joi.any(),
    coverImg: Joi.any(),
    type: Joi.string().valid('meeting', 'video', 'phone', 'chat').required(),
    meetingPlace: Joi.any().when('type', { is: 'meeting', then: Joi.string().required() }),
    tag: Joi.any(),
    NGDate: Joi.any(),
    atLeast: Joi.number().integer().multiple(30),
    category: Joi.string().valid('entrepreneurship',
      'marking', 'chat', 'misic', 'businessCommunication', 'cook', 'picture',
      'lifePlan', 'divination', 'love', 'diet', 'makeup', 'sports', 'family',
      'animation', 'other'),
    price: Joi.number().integer().min(0).max(10000)
      .required(),
  });

  return schema.validate(data);
}

function mailValidate(data) {
  const schema = Joi.object({
    content: Joi.string().max(300).required(),
  });

  return schema.validate(data);
}

function changePasswordValidate(data) {
  const schema = Joi.object({
    currentPassword: Joi.string().min(12).max(16).required(),
    newPassword: Joi.string().min(12).max(16).required(),
    passwordConfirmation: Joi.string().required().valid(Joi.ref('newPassword')),
  });

  return schema.validate(data);
}

function forgotPasswordValidate(data, type) {
  const emailSchema = Joi.object({
    email: Joi.string().email().required(),
  });

  const newPasswordSchema = Joi.object({
    newPassword: Joi.string().min(12).max(16).required(),
    passwordConfirmation: Joi.string().required().valid(Joi.ref('newPassword')),
  });
  return type === 'email' ? emailSchema.validate(data) : newPasswordSchema.validate(data);
}

module.exports = {
  signupValidate,
  loginValidate,
  editUserValidate,
  productValidate,
  mailValidate,
  changePasswordValidate,
  forgotPasswordValidate,
};
