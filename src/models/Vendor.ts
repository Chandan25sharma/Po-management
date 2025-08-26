import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  bankInfo?: string;
  items: string[];
  documents: {
    url: string;
    name: string;
    size: number;
    uploadedAt: Date;
    uploadedBy: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Vendor name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  paymentTerms: {
    type: String,
    required: [true, 'Payment terms are required'],
    trim: true,
  },
  bankInfo: {
    type: String,
    trim: true,
  },
  items: [{
    type: String,
    trim: true,
  }],
  documents: [{
    url: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
}, {
  timestamps: true,
});

VendorSchema.index({ name: 1 });
VendorSchema.index({ email: 1 });

export default mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', VendorSchema);
