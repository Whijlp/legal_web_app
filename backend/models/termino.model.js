const mongoose = require("mongoose");

const terminoSchema = new mongoose.Schema(
  {
    fechaIngreso: {
      type: Date,
      required: true,
    },
    fechaVencimiento: {
      type: Date,
      required: true,
    },

    termino: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Termino", terminoSchema);
