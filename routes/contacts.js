const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all contact routes
router.use(requireAuth);

//GET all contacts
router.get("/", getContacts);

// GET a single contact
router.get("/:id", getContact);

// POST a new Contact
router.post("/", createContact);

// DELETE a  Contact
router.delete("/:id", deleteContact);

// UPDATE a Contact
router.patch("/:id", updateContact);

module.exports = router;
