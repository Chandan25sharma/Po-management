import mongoose, { Schema, Document } from 'mongoose';
import { RequisitionStatus } from '@/types';

export interface IRequisition extends Document {
  requesterId: mongoose.Types.ObjectId;
  status: RequisitionStatus;
  items: {
    description: string;
    quantity: number;
    estimatedCost: number;
    specifications?: string;
  }[];
  costCenter: string;
  justification: string;
  needByDate: Date;
  attachments: {
    url: string;
    name: string;
    size: number;
    uploadedAt: Date;
    uploadedBy: string;
  }[];
  totalEstimatedCost: number;
  createdAt: Date;
  updatedAt: Date;
}

const RequisitionSchema: Schema = new Schema({
  requesterId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Requester is required'],
  },
  status: {
    type: String,
    enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'CONVERTED'],
    default: 'DRAFT',
  },
  items: [{
    description: {
      type: String,
      required: [true, 'Item description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: 1,
    },
    estimatedCost: {
      type: Number,
      required: [true, 'Estimated cost is required'],
      min: 0,
    },
    specifications: {
      type: String,
      trim: true,
    },
  }],
  costCenter: {
    type: String,
    required: [true, 'Cost center is required'],
    trim: true,
  },
  justification: {
    type: String,
    required: [true, 'Justification is required'],
    trim: true,
  },
  needByDate: {
    type: Date,
    required: [true, 'Need by date is required'],
  },
  attachments: [{
    url: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
  totalEstimatedCost: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Calculate total estimated cost before saving
RequisitionSchema.pre('save', function(next) {
  this.totalEstimatedCost = (this.items as any[]).reduce((total, item) => {
    return total + (item.quantity * item.estimatedCost);
  }, 0);
  next();
});

RequisitionSchema.index({ requesterId: 1 });
RequisitionSchema.index({ status: 1 });
RequisitionSchema.index({ costCenter: 1 });
RequisitionSchema.index({ createdAt: -1 });

export default mongoose.models.Requisition || mongoose.model<IRequisition>('Requisition', RequisitionSchema);
