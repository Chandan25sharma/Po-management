import mongoose, { Schema, Document } from 'mongoose';
import { POStatus } from '@/types';

export interface IPurchaseOrder extends Document {
  poNumber: string;
  requisitionId?: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  status: POStatus;
  lines: {
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specifications?: string;
  }[];
  totalAmount: number;
  deliveryAddress: string;
  paymentTerms: string;
  deliveryDate: Date;
  attachments: {
    url: string;
    name: string;
    size: number;
    uploadedAt: Date;
    uploadedBy: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseOrderSchema: Schema = new Schema({
  poNumber: {
    type: String,
    required: [true, 'PO Number is required'],
    unique: true,
    trim: true,
  },
  requisitionId: {
    type: Schema.Types.ObjectId,
    ref: 'Requisition',
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'Vendor is required'],
  },
  status: {
    type: String,
    enum: ['DRAFT', 'SENT', 'RECEIVED', 'CLOSED', 'CANCELLED'],
    default: 'DRAFT',
  },
  lines: [{
    description: {
      type: String,
      required: [true, 'Line description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: 0,
    },
    specifications: {
      type: String,
      trim: true,
    },
  }],
  totalAmount: {
    type: Number,
    default: 0,
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Delivery address is required'],
    trim: true,
  },
  paymentTerms: {
    type: String,
    required: [true, 'Payment terms are required'],
    trim: true,
  },
  deliveryDate: {
    type: Date,
    required: [true, 'Delivery date is required'],
  },
  attachments: [{
    url: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
}, {
  timestamps: true,
});

// Generate PO number before saving
PurchaseOrderSchema.pre('save', async function(next) {
  if (!this.poNumber) {
    const count = await mongoose.model('PurchaseOrder').countDocuments();
    this.poNumber = `PO-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
  }
  
  // Calculate total amount
  this.totalAmount = (this.lines as any[]).reduce((total, line) => {
    return total + line.totalPrice;
  }, 0);
  
  next();
});

PurchaseOrderSchema.index({ poNumber: 1 });
PurchaseOrderSchema.index({ vendorId: 1 });
PurchaseOrderSchema.index({ status: 1 });
PurchaseOrderSchema.index({ createdAt: -1 });

export default mongoose.models.PurchaseOrder || mongoose.model<IPurchaseOrder>('PurchaseOrder', PurchaseOrderSchema);
