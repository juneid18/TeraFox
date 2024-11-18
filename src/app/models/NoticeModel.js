const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } 
);

const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);

export default Notice;
