{/*const validate = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    req.body = validated;
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};
module.exports = validate;*/}

const validate = (schema) => async (req, res, next) => {
  console.log("📋 [VALIDATE] Body recibido:", req.body); // 👈 log de entrada

  try {
    const validated = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    console.log("📋 [VALIDATE] Body validado:", validated); // 👈 log de salida
    req.body = validated;
    next();
  } catch (err) {
    console.log("❌ [VALIDATE] Error de validación:", err.errors); // 👈 log de error
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validate;
