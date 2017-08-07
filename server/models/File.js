import mongoose, { Schema } from 'mongoose';

const File = new Schema({
  title: { type: String, text: true },
  path: { type: String, text: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, ref: 'User' }
});

File.index({ title: 'text', path: 'text' });

export default mongoose.model('File', File);
