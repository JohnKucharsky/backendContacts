const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// get all workouts
async function getWorkouts(req, res) {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
}

// get a single contact

async function getWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such contact" });
  }
  res.status(200).json(contact);
}

// create new contact
async function createWorkout(req, res) {
  const { name, second_name, email } = req.body;
  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!second_name) {
    emptyFields.push("second_name");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  // add doc to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ name, second_name, email, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete a workout
async function deletewWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such contact" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such contact" });
  }

  res.status(200).json(workout);
}

// update a workout

async function updateWorkout(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such contact" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );

  if (!workout) {
    return res.status(400).json({ error: "No such contact" });
  }

  res.status(200).json(workout);
}

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deletewWorkout,
  updateWorkout,
};
