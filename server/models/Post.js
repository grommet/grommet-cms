import mongoose, { Schema } from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const PostSchema = new Schema({
  title: String,
  subtitle: String,
  image: { type: String, ref: 'File' },
  tileSize: { type: String, default: 'Small Square' },
  tileTextColor: { type: String, default: 'White' },
  link: String,
  sections: Array,
  assets: [{ type: String, ref: 'File' }],
  slug: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  pageType: { type: String, ref: 'PageType' },
  _type: String
});

PostSchema.index({ title: 'text', slug: 'text' });

PostSchema.plugin(AutoIncrement, { id: 'sort_order', inc_field: 'sortOrder', reference_fields: ['_type'] });
const Post = mongoose.model('Post', PostSchema);

export default {
  Post
};

