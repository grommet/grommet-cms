import mongoose, { Schema } from 'mongoose';

const BrandingSettings = new Schema({
  title: { type: String },
  logo: { type: String, ref: 'File' },
  theme: {
    type: String,
    enum: ['HPE', 'GROMMET', 'ARUBA', 'HPI'],
    default: 'HPE',
    required: true
  }
});

const Settings = new Schema({
  branding: { type: BrandingSettings }
});

export default mongoose.model('Settings', Settings);
