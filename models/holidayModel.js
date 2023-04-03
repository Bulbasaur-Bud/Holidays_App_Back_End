const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema({
  name: { type: String, required: true },
  celebrated: { type: Boolean, default: false },
  description: { type: String, default: "Good Holiday" },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Holiday", holidaySchema);
