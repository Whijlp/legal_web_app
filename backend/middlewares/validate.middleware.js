

const validate = (schema) => async (req, res, next) => {
  console.log(" [VALIDATE] Body recibido:", req.body);

  try {
    const validated = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    console.log(" [VALIDATE] Body validado:", validated);
    req.body = validated;
    next();
  } catch (err) {
    console.log(" [VALIDATE] Error de validación:", err.errors);
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validate;
