import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '@/types';

export interface IUser extends Document {
  name: string;
  email: string;
  role: Role;
  password: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    required: [true, 'Role is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  department: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Index for better performance and uniqueness
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
