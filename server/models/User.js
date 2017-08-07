import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new Schema({
  username: String,
  password: String,
  role: { type: Number, default: 1 }
});

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);
