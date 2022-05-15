const asyncHandler = require("express-async-handler");

//@desc     Get goals
//@route    Get /api/goals
//@access   Private
const getGoals = asyncHandler(async (req, res) => {
  /*  care about the order of req, res
      as it will be destructured with the
      same order
  */
  if (!req.body.text) {
    res.status(400);
    // this will ignit express default/overwritten errorHandler
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Get goals" });
});

//@desc     Set goals
//@route    Post /api/goals
//@access   Private
const setGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Set goals" });
});

//@desc     Update goals
//@route    Put /api/goals
//@access   Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${res.params.id}` });
});

//@desc     Delete goals
//@route    delete /api/goals
//@access   Private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${res.params.id}` });
});

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
