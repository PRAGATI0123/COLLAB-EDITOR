const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    _id: String,    // we use the document's ID as both the DB key AND the "room" name
    data: Object,   // the Quill contents (a "Delta" — explained below)
  },
  { timestamps: true } // auto-adds createdAt / updatedAt
);

module.exports = mongoose.model('Document', documentSchema);