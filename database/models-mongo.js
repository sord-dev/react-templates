const mongoose = require('mongoose');

const CSSSchema = new mongoose.Schema({
  css: {
    type: String,
    required: true,
  },
});

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

module.exports = {
  CSS: mongoose.models.CSS || mongoose.model('CSS', CSSSchema),
  Code: mongoose.models.Code || mongoose.model('Code', CodeSchema),
};
