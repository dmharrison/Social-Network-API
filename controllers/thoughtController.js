const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
