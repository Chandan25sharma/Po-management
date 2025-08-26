export enum Role {
  REQUESTER = 'REQUESTER',
  APPROVER = 'APPROVER',
  PROCUREMENT = 'PROCUREMENT',
  RECEIVER = 'RECEIVER',
  FINANCE = 'FINANCE',
  ADMIN = 'ADMIN',
}

export enum RequisitionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CONVERTED = 'CONVERTED',
}

export enum POStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum InvoiceStatus {
  SUBMITTED = 'SUBMITTED',
  MATCHED = 'MATCHED',
  DISPUTED = 'DISPUTED',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// Base types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  bankInfo?: string;
  items: string[];
  documents: FileAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FileAttachment {
  _id: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface RequisitionItem {
  _id: string;
  description: string;
  quantity: number;
  estimatedCost: number;
  specifications?: string;
}

export interface Requisition {
  _id: string;
  requesterId: string;
  requester?: User;
  status: RequisitionStatus;
  items: RequisitionItem[];
  costCenter: string;
  justification: string;
  needByDate: Date;
  attachments: FileAttachment[];
  approvals: Approval[];
  totalEstimatedCost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface POLine {
  _id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: string;
}

export interface PurchaseOrder {
  _id: string;
  poNumber: string;
  requisitionId?: string;
  requisition?: Requisition;
  vendorId: string;
  vendor?: Vendor;
  status: POStatus;
  lines: POLine[];
  totalAmount: number;
  deliveryAddress: string;
  paymentTerms: string;
  deliveryDate: Date;
  approvals: Approval[];
  attachments: FileAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReceiptLine {
  _id: string;
  poLineId: string;
  quantityReceived: number;
  notes?: string;
  condition: 'GOOD' | 'DAMAGED' | 'PARTIAL';
}

export interface GoodsReceipt {
  _id: string;
  receiptNumber: string;
  poId: string;
  po?: PurchaseOrder;
  receivedById: string;
  receivedBy?: User;
  lines: ReceiptLine[];
  notes?: string;
  attachments: FileAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceLine {
  _id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  vendorId: string;
  vendor?: Vendor;
  poId?: string;
  po?: PurchaseOrder;
  status: InvoiceStatus;
  lines: InvoiceLine[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  dueDate: Date;
  attachments: FileAttachment[];
  matchResult?: MatchResult;
  createdAt: Date;
  updatedAt: Date;
}

export interface MatchResult {
  status: 'MATCHED' | 'VARIANCE' | 'MISMATCH';
  poVariance: number;
  receiptVariance: number;
  priceVariance: number;
  quantityVariance: number;
  notes: string;
}

export interface Budget {
  _id: string;
  costCenter: string;
  fiscalYear: number;
  allocatedAmount: number;
  consumedAmount: number;
  remainingAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Approval {
  _id: string;
  approverId: string;
  approver?: User;
  entityType: 'REQUISITION' | 'PURCHASE_ORDER' | 'INVOICE';
  entityId: string;
  status: ApprovalStatus;
  comments?: string;
  approvalLevel: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApprovalRule {
  _id: string;
  name: string;
  amountThreshold: number;
  department?: string;
  category?: string;
  approvers: {
    level: number;
    userId: string;
    user?: User;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard types
export interface DashboardMetrics {
  pendingApprovals: number;
  openPOs: number;
  overdueReceipts: number;
  disputedInvoices: number;
  totalSpend: number;
  budgetUtilization: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
