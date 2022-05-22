const asyncHandler = require("express-async-handler");
// Goal model
const Goal = require("../model/goalModel");


//@desc     Get goals
//@route    Get /api/goals
//@access   Private
const getGoals = asyncHandler(async (req, res) => {
  /*  
      care about the order of req, res
      as it will be destructured with the
      same order
  */

  const goals = await Goal.find({ user: req.user });

  res.status(200).json(goals);
});

//@desc     Set goals
//@route    Post /api/goals
//@access   Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    // this will ignit express default/overwritten errorHandler
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    user: req.user,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@desc     Update goals
//@route    Put /api/goals
//@access   Private
const updateGoals = asyncHandler(async (req, res) => {
  // check goal valid & exist
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check user valid & exist
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // make sure that goal belongs to spicefied user
  console.log(`${goal.user}, ${req.user.id}`.red.underline);
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc     Delete goals
//@route    delete /api/goals
//@access   Private
const deleteGoals = asyncHandler(async (req, res) => {
  // check goal valid & exist
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }


  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // make sure that goal belongs to spicefied user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
