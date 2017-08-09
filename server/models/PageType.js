import mongoose, { Schema } from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const PageType = new Schema({
  title: { type: String, text: true },
  description: { type: String },
  slug: { type: String },
  sortOrder: { type: Number }
});

PageType.plugin(AutoIncrement, { id: 'pt_sort_order', inc_field: 'sortOrder' });

export default mongoose.model('PageType', PageType);
