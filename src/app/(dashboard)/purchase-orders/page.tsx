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
  ShoppingCart, 
  Calendar, 
  User, 
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  Building2,
  Package
} from 'lucide-react';

// Mock data for purchase orders
const purchaseOrders = [
  {
    id: 'PO-2024-0001',
    title: 'Office Supplies Q1 2024',
    vendor: { name: 'ABC Supplies Inc.', contact: 'supplies@abc.com' },
    totalAmount: 15245.00,
    status: 'DELIVERED',
    priority: 'HIGH',
    orderDate: '2024-01-15',
    expectedDate: '2024-01-20',
    deliveredDate: '2024-01-19',
    items: 12,
    requisitionId: 'REQ-2024-0001',
    deliveryAddress: 'Main Office, Building A',
  },
  {
    id: 'PO-2024-0002',
    title: 'IT Hardware Upgrade',
    vendor: { name: 'Tech Solutions Ltd.', contact: 'orders@techsol.com' },
    totalAmount: 45000.00,
    status: 'SENT',
    priority: 'MEDIUM',
    orderDate: '2024-01-14',
    expectedDate: '2024-01-25',
    items: 8,
    requisitionId: 'REQ-2024-0002',
    deliveryAddress: 'IT Department, Floor 3',
  },
  {
    id: 'PO-2024-0003',
    title: 'Manufacturing Tools',
    vendor: { name: 'Industrial Tools Co.', contact: 'sales@industrial.com' },
    totalAmount: 25750.00,
    status: 'APPROVED',
    priority: 'LOW',
    orderDate: '2024-01-13',
    expectedDate: '2024-01-30',
    items: 15,
    requisitionId: 'REQ-2024-0003',
    deliveryAddress: 'Warehouse B',
  },
  {
    id: 'PO-2024-0004',
    title: 'Facility Maintenance',
    vendor: { name: 'Clean & Maintain Pro', contact: 'info@cleanpro.com' },
    totalAmount: 12300.00,
    status: 'RECEIVING',
    priority: 'HIGH',
    orderDate: '2024-01-11',
    expectedDate: '2024-01-18',
    partialDeliveryDate: '2024-01-17',
    items: 10,
    requisitionId: 'REQ-2024-0005',
    deliveryAddress: 'Facilities Office',
  },
  {
    id: 'PO-2024-0005',
    title: 'Marketing Materials',
    vendor: { name: 'Print & Design Studio', contact: 'orders@printdesign.com' },
    totalAmount: 8500.00,
    status: 'DRAFT',
    priority: 'MEDIUM',
    orderDate: '2024-01-10',
    expectedDate: '2024-01-22',
    items: 6,
    deliveryAddress: 'Marketing Department',
  },
];

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SENT: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  RECEIVING: 'bg-yellow-100 text-yellow-800',
  DELIVERED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const priorityColors = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'DELIVERED':
      return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    case 'RECEIVING':
      return <Truck className="h-4 w-4 text-yellow-600" />;
    case 'SENT':
    case 'APPROVED':
      return <Clock className="h-4 w-4 text-blue-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export default function PurchaseOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch = po.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            Purchase Orders
          </h1>
          <p className="text-gray-600 mt-1">Manage purchase orders and vendor communications</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create PO
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-yellow-600">12</p>
              </div>
              <Truck className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">128</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">$2.4M</p>
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
                placeholder="Search purchase orders, vendors..."
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
                variant={selectedStatus === 'SENT' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('SENT')}
              >
                Sent
              </Button>
              <Button
                variant={selectedStatus === 'RECEIVING' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('RECEIVING')}
              >
                In Transit
              </Button>
              <Button
                variant={selectedStatus === 'DELIVERED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('DELIVERED')}
              >
                Delivered
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Track and manage all purchase orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPOs.map((po) => (
              <div key={po.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                {/* Desktop View */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(po.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{po.id}</h3>
                        <p className="text-sm text-gray-600">{po.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        <span>{po.vendor.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{po.orderDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>${po.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>{po.items} items</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={priorityColors[po.priority as keyof typeof priorityColors]}>
                      {po.priority}
                    </Badge>
                    <Badge variant="secondary" className={statusColors[po.status as keyof typeof statusColors]}>
                      {po.status}
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
                      {getStatusIcon(po.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{po.id}</h3>
                        <p className="text-sm text-gray-600">{po.title}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={statusColors[po.status as keyof typeof statusColors]}>
                      {po.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Vendor</p>
                      <p className="font-medium">{po.vendor.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium">${po.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Order Date</p>
                      <p className="font-medium">{po.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Items</p>
                      <p className="font-medium">{po.items} items</p>
                    </div>
                  </div>
                  
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
