const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    second_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", contactShema);
