const User = require('../models/User');
const path = require('path');

exports.updateProfile = async (req, res) => {
  try {
    const updatedData = {};

    if (req.body.username) updatedData.username = req.body.username;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.bio) updatedData.bio = req.body.bio;

    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
