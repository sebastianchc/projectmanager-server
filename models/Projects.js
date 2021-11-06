const mongoose = require('mongoose');

const ProjectsSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recorded: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Projects', ProjectsSchema);
