const mongoose = require("mongoose");

const convocatoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Convocatoria", convocatoriaSchema);
