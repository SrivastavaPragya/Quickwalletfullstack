import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

interface UserDoc extends Document {
  Firstname: string;
  Lastname: string;
  email: string;
  password: string;
  phone: number;
}

const UserSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  Lastname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
  },
  password: { type: String, required: true },
  phone: { type: Number, required: true, maxLength: 12 }, 
});

// Pre-save hook to hash the password
UserSchema.pre<UserDoc>('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

const User = mongoose.model<UserDoc>('User', UserSchema);

export { User };
