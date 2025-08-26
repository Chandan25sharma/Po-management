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
  Package, 
  Calendar, 
  User, 
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  AlertTriangle,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  Building2,
  MapPin,
  Scan
} from 'lucide-react';

// Mock data for goods receipts
const goodsReceipts = [
  {
    id: 'GR-2024-0001',
    poNumber: 'PO-2024-0001',
    title: 'Office Supplies Delivery',
    vendor: { name: 'ABC Supplies Inc.', contact: 'supplies@abc.com' },
    receivedAmount: 15245.00,
    expectedAmount: 15245.00,
    status: 'COMPLETED',
    receivedDate: '2024-01-19',
    expectedDate: '2024-01-20',
    receiver: { name: 'Mike Davis', department: 'Warehouse' },
    itemsReceived: 12,
    itemsExpected: 12,
    deliveryNote: 'DN-2024-001',
    location: 'Main Warehouse A',
    condition: 'GOOD',
  },
  {
    id: 'GR-2024-0002',
    poNumber: 'PO-2024-0004',
    title: 'Facility Maintenance Supplies',
    vendor: { name: 'Clean & Maintain Pro', contact: 'info@cleanpro.com' },
    receivedAmount: 8200.00,
    expectedAmount: 12300.00,
    status: 'PARTIAL',
    receivedDate: '2024-01-17',
    expectedDate: '2024-01-18',
    receiver: { name: 'Tom Receiver', department: 'Facilities' },
    itemsReceived: 6,
    itemsExpected: 10,
    deliveryNote: 'DN-2024-002',
    location: 'Facilities Storage',
    condition: 'GOOD',
    notes: 'Remaining 4 items to arrive next week',
  },
  {
    id: 'GR-2024-0003',
    poNumber: 'PO-2024-0006',
    title: 'Safety Equipment',
    vendor: { name: 'Safety First Ltd.', contact: 'orders@safetyfirst.com' },
    receivedAmount: 5500.00,
    expectedAmount: 5800.00,
    status: 'DISCREPANCY',
    receivedDate: '2024-01-16',
    expectedDate: '2024-01-16',
    receiver: { name: 'Sarah Safety', department: 'HSE' },
    itemsReceived: 8,
    itemsExpected: 10,
    deliveryNote: 'DN-2024-003',
    location: 'Safety Storage Room',
    condition: 'DAMAGED',
    notes: '2 helmets damaged during transport, replacement requested',
  },
  {
    id: 'GR-2024-0004',
    poNumber: 'PO-2024-0007',
    title: 'IT Equipment',
    vendor: { name: 'Tech Solutions Ltd.', contact: 'orders@techsol.com' },
    receivedAmount: 0,
    expectedAmount: 25000.00,
    status: 'PENDING',
    expectedDate: '2024-01-25',
    receiver: { name: 'Lisa IT', department: 'IT' },
    itemsReceived: 0,
    itemsExpected: 5,
    deliveryNote: 'Pending',
    location: 'IT Storage Room',
    condition: 'PENDING',
  },
  {
    id: 'GR-2024-0005',
    poNumber: 'PO-2024-0008',
    title: 'Marketing Materials',
    vendor: { name: 'Print & Design Studio', contact: 'orders@printdesign.com' },
    receivedAmount: 3200.00,
    expectedAmount: 3200.00,
    status: 'COMPLETED',
    receivedDate: '2024-01-15',
    expectedDate: '2024-01-15',
    receiver: { name: 'John Marketing', department: 'Marketing' },
    itemsReceived: 500,
    itemsExpected: 500,
    deliveryNote: 'DN-2024-005',
    location: 'Marketing Storage',
    condition: 'EXCELLENT',
  },
];

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PARTIAL: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  DISCREPANCY: 'bg-red-100 text-red-800',
  OVERDUE: 'bg-orange-100 text-orange-800',
};

const conditionColors = {
  EXCELLENT: 'bg-green-100 text-green-800',
  GOOD: 'bg-emerald-100 text-emerald-800',
  FAIR: 'bg-yellow-100 text-yellow-800',
  DAMAGED: 'bg-red-100 text-red-800',
  PENDING: 'bg-gray-100 text-gray-800',
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'PARTIAL':
      return <Package className="h-4 w-4 text-blue-600" />;
    case 'DISCREPANCY':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'PENDING':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <Package className="h-4 w-4 text-gray-600" />;
  }
};

export default function GoodsReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredReceipts = goodsReceipts.filter(receipt => {
    const matchesSearch = receipt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || receipt.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            Goods Receipts
          </h1>
          <p className="text-gray-600 mt-1">Track and manage incoming deliveries and inventory</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Record Receipt
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Receipts</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Delivery</p>
                <p className="text-2xl font-bold text-yellow-600">18</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Discrepancies</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Value Received</p>
                <p className="text-2xl font-bold text-gray-900">$1.8M</p>
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
                placeholder="Search receipts, PO numbers, vendors..."
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
                variant={selectedStatus === 'PARTIAL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('PARTIAL')}
              >
                Partial
              </Button>
              <Button
                variant={selectedStatus === 'COMPLETED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('COMPLETED')}
              >
                Completed
              </Button>
              <Button
                variant={selectedStatus === 'DISCREPANCY' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('DISCREPANCY')}
              >
                Issues
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goods Receipts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Goods Receipts</CardTitle>
          <CardDescription>Track incoming deliveries and inventory receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReceipts.map((receipt) => (
              <div key={receipt.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                {/* Desktop View */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(receipt.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{receipt.id}</h3>
                        <p className="text-sm text-gray-600">{receipt.title}</p>
                        <p className="text-xs text-gray-500">PO: {receipt.poNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        <span>{receipt.vendor.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{receipt.receiver.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{receipt.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>{receipt.itemsReceived}/{receipt.itemsExpected}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">${receipt.receivedAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">of ${receipt.expectedAmount.toLocaleString()}</p>
                    </div>
                    <Badge variant="secondary" className={conditionColors[receipt.condition as keyof typeof conditionColors]}>
                      {receipt.condition}
                    </Badge>
                    <Badge variant="secondary" className={statusColors[receipt.status as keyof typeof statusColors]}>
                      {receipt.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Scan className="h-4 w-4" />
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
                      {getStatusIcon(receipt.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{receipt.id}</h3>
                        <p className="text-sm text-gray-600">{receipt.title}</p>
                        <p className="text-xs text-gray-500">PO: {receipt.poNumber}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={statusColors[receipt.status as keyof typeof statusColors]}>
                      {receipt.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Vendor</p>
                      <p className="font-medium">{receipt.vendor.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Receiver</p>
                      <p className="font-medium">{receipt.receiver.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Items</p>
                      <p className="font-medium">{receipt.itemsReceived}/{receipt.itemsExpected}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Condition</p>
                      <Badge variant="outline" className={conditionColors[receipt.condition as keyof typeof conditionColors]}>
                        {receipt.condition}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium">${receipt.receivedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium">{receipt.location}</p>
                    </div>
                  </div>
                  
                  {receipt.notes && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">{receipt.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Scan className="h-4 w-4 mr-1" />
                      Scan
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
