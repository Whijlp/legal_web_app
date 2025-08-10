const validate = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    req.body = validated;
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};
module.exports = validate;