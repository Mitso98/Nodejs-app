const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text"],
    },
  },
  {
    timestamps: true,
  }
);

/* 
    export mongoose model,
    then the name of the model with it's attributes
*/
module.exports = mongoose.model("Goal", goalSchema);
