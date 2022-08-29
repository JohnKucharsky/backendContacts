const Contact = require("../models/ContactModel");
const mongoose = require("mongoose");

// get all contacts
async function getContacts(req, res) {
  const user_id = req.user._id;
  const contacts = await Contact.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(contacts);
}

// get a single contact

async function getContact(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such contact" });
  }

  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({ error: "No such contact" });
  }
  res.status(200).json(contact);
}

// create new contact
async function createContact(req, res) {
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
    const contact = await Contact.create({ name, second_name, email, user_id });
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete a contact
async function deleteContact(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such contact" });
  }

  const contact = await Contact.findOneAndDelete({ _id: id });

  if (!contact) {
    return res.status(400).json({ error: "No such contact" });
  }

  res.status(200).json(contact);
}

// update a contact

async function updateContact(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such contact" });
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );

  if (!contact) {
    return res.status(400).json({ error: "No such contact" });
  }

  res.status(200).json(contact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
