'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  User, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  Building2,
  CreditCard,
  Receipt
} from 'lucide-react';

// Mock data for invoices
const invoices = [
  {
    id: 'INV-2024-0001',
    invoiceNumber: 'ABC-2024-001',
    poNumber: 'PO-2024-0001',
    vendor: { name: 'ABC Supplies Inc.', contact: 'billing@abc.com' },
    amount: 15245.00,
    taxAmount: 1524.50,
    totalAmount: 16769.50,
    status: 'PAID',
    invoiceDate: '2024-01-20',
    dueDate: '2024-02-19',
    paidDate: '2024-02-15',
    paymentMethod: 'Bank Transfer',
    description: 'Office supplies delivery as per PO-2024-0001',
    approver: 'John Approver',
    paymentTerms: '30 days',
  },
  {
    id: 'INV-2024-0002',
    invoiceNumber: 'TECH-2024-015',
    poNumber: 'PO-2024-0002',
    vendor: { name: 'Tech Solutions Ltd.', contact: 'accounts@techsol.com' },
    amount: 45000.00,
    taxAmount: 4500.00,
    totalAmount: 49500.00,
    status: 'APPROVED',
    invoiceDate: '2024-01-18',
    dueDate: '2024-02-17',
    paymentMethod: 'Pending',
    description: 'IT hardware and software licenses',
    approver: 'Mike Finance',
    paymentTerms: '30 days',
  },
  {
    id: 'INV-2024-0003',
    invoiceNumber: 'IND-2024-008',
    poNumber: 'PO-2024-0003',
    vendor: { name: 'Industrial Tools Co.', contact: 'billing@industrial.com' },
    amount: 25750.00,
    taxAmount: 2575.00,
    totalAmount: 28325.00,
    status: 'PENDING',
    invoiceDate: '2024-01-16',
    dueDate: '2024-02-15',
    paymentMethod: 'Pending',
    description: 'Manufacturing tools and equipment',
    paymentTerms: '30 days',
  },
  {
    id: 'INV-2024-0004',
    invoiceNumber: 'CLEAN-2024-003',
    poNumber: 'PO-2024-0004',
    vendor: { name: 'Clean & Maintain Pro', contact: 'billing@cleanpro.com' },
    amount: 8200.00,
    taxAmount: 820.00,
    totalAmount: 9020.00,
    status: 'DISCREPANCY',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-14',
    paymentMethod: 'Pending',
    description: 'Facility maintenance supplies - partial delivery',
    paymentTerms: '30 days',
    discrepancyNote: 'Invoice amount exceeds PO amount by $200',
  },
  {
    id: 'INV-2024-0005',
    invoiceNumber: 'PRINT-2024-021',
    poNumber: 'PO-2024-0008',
    vendor: { name: 'Print & Design Studio', contact: 'accounts@printdesign.com' },
    amount: 3200.00,
    taxAmount: 320.00,
    totalAmount: 3520.00,
    status: 'OVERDUE',
    invoiceDate: '2024-01-10',
    dueDate: '2024-02-09',
    paymentMethod: 'Pending',
    description: 'Marketing materials and promotional items',
    paymentTerms: '30 days',
    daysOverdue: 7,
  },
  {
    id: 'INV-2024-0006',
    invoiceNumber: 'SAFE-2024-012',
    poNumber: 'PO-2024-0006',
    vendor: { name: 'Safety First Ltd.', contact: 'billing@safetyfirst.com' },
    amount: 5500.00,
    taxAmount: 550.00,
    totalAmount: 6050.00,
    status: 'REJECTED',
    invoiceDate: '2024-01-12',
    dueDate: '2024-02-11',
    paymentMethod: 'N/A',
    description: 'Safety equipment - damaged items',
    rejectedDate: '2024-01-20',
    rejectionReason: 'Items received in damaged condition',
    paymentTerms: '30 days',
  },
];

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-blue-100 text-blue-800',
  PAID: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  REJECTED: 'bg-gray-100 text-gray-800',
  DISCREPANCY: 'bg-orange-100 text-orange-800',
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'PAID':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'APPROVED':
      return <CheckCircle className="h-4 w-4 text-blue-600" />;
    case 'OVERDUE':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'REJECTED':
      return <XCircle className="h-4 w-4 text-gray-600" />;
    case 'DISCREPANCY':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    case 'PENDING':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === 'PENDING' || inv.status === 'APPROVED').reduce((sum, inv) => sum + inv.totalAmount, 0);
  const overdueCount = filteredInvoices.filter(inv => inv.status === 'OVERDUE').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Receipt className="h-8 w-8 text-blue-600" />
            Invoices
          </h1>
          <p className="text-gray-600 mt-1">Manage vendor invoices and payment processing</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search invoices, vendors, PO numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('all')}
              >
                All
              </Button>
              <Button
                variant={selectedStatus === 'PENDING' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('PENDING')}
              >
                Pending
              </Button>
              <Button
                variant={selectedStatus === 'APPROVED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('APPROVED')}
              >
                Approved
              </Button>
              <Button
                variant={selectedStatus === 'OVERDUE' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('OVERDUE')}
              >
                Overdue
              </Button>
              <Button
                variant={selectedStatus === 'PAID' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('PAID')}
              >
                Paid
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
          <CardDescription>Track vendor invoices and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                {/* Desktop View */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                        <p className="text-xs text-gray-500">Invoice: {invoice.invoiceNumber} | PO: {invoice.poNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        <span>{invoice.vendor.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {invoice.dueDate}</span>
                      </div>
                      {invoice.paymentMethod !== 'Pending' && (
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          <span>{invoice.paymentMethod}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${invoice.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Tax: ${invoice.taxAmount.toLocaleString()}</p>
                    </div>
                    <Badge variant="secondary" className={statusColors[invoice.status as keyof typeof statusColors]}>
                      {invoice.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                        <p className="text-xs text-gray-500">Invoice: {invoice.invoiceNumber}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={statusColors[invoice.status as keyof typeof statusColors]}>
                      {invoice.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Vendor</p>
                      <p className="font-medium">{invoice.vendor.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium text-lg">${invoice.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Due Date</p>
                      <p className="font-medium">{invoice.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">PO Number</p>
                      <p className="font-medium">{invoice.poNumber}</p>
                    </div>
                  </div>
                  
                  {(invoice.discrepancyNote || invoice.rejectionReason) && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">
                        {invoice.discrepancyNote || invoice.rejectionReason}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
