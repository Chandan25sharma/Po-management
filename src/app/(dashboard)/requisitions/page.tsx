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
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Download,
  MoreHorizontal
} from 'lucide-react';

// Mock data for requisitions
const requisitions = [
  {
    id: 'REQ-2024-0001',
    title: 'Office Supplies Q1 2024',
    description: 'Stationery, paper, and office equipment for marketing department',
    requester: { name: 'Lisa Requester', department: 'Marketing' },
    totalAmount: 15245.00,
    status: 'APPROVED',
    priority: 'HIGH',
    submittedDate: '2024-01-15',
    approvedDate: '2024-01-16',
    items: 12,
    approver: 'John Approver',
  },
  {
    id: 'REQ-2024-0002',
    title: 'IT Hardware Upgrade',
    description: 'Laptops, monitors, and peripherals for development team',
    requester: { name: 'Tom Developer', department: 'IT' },
    totalAmount: 45000.00,
    status: 'PENDING',
    priority: 'MEDIUM',
    submittedDate: '2024-01-14',
    items: 8,
  },
  {
    id: 'REQ-2024-0003',
    title: 'Manufacturing Tools',
    description: 'Industrial equipment and safety gear',
    requester: { name: 'Mike Production', department: 'Manufacturing' },
    totalAmount: 25750.00,
    status: 'DRAFT',
    priority: 'LOW',
    submittedDate: '2024-01-13',
    items: 15,
  },
  {
    id: 'REQ-2024-0004',
    title: 'Marketing Campaign Materials',
    description: 'Promotional items and advertising materials',
    requester: { name: 'Sarah Marketing', department: 'Marketing' },
    totalAmount: 8500.00,
    status: 'REJECTED',
    priority: 'MEDIUM',
    submittedDate: '2024-01-12',
    rejectedDate: '2024-01-13',
    items: 6,
    rejectionReason: 'Budget exceeded for this quarter',
  },
  {
    id: 'REQ-2024-0005',
    title: 'Facility Maintenance',
    description: 'HVAC maintenance and cleaning supplies',
    requester: { name: 'John Facilities', department: 'Facilities' },
    totalAmount: 12300.00,
    status: 'CONVERTED',
    priority: 'HIGH',
    submittedDate: '2024-01-11',
    approvedDate: '2024-01-12',
    convertedDate: '2024-01-13',
    items: 10,
    poNumber: 'PO-2024-0020',
  },
];

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SUBMITTED: 'bg-blue-100 text-blue-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  CONVERTED: 'bg-purple-100 text-purple-800',
};

const priorityColors = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'APPROVED':
    case 'CONVERTED':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'REJECTED':
      return <XCircle className="h-4 w-4 text-red-600" />;
    case 'PENDING':
    case 'SUBMITTED':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export default function RequisitionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredRequisitions = requisitions.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.requester.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            Requisitions
          </h1>
          <p className="text-gray-600 mt-1">Manage purchase requisitions and approval workflow</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Requisition
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requisitions</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">$187K</p>
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
                placeholder="Search requisitions..."
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
                variant={selectedStatus === 'DRAFT' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('DRAFT')}
              >
                Draft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requisitions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Requisitions</CardTitle>
          <CardDescription>Manage and track all purchase requisitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequisitions.map((req) => (
              <div key={req.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                {/* Desktop View */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(req.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{req.id}</h3>
                        <p className="text-sm text-gray-600">{req.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{req.requester.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{req.submittedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>${req.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={priorityColors[req.priority as keyof typeof priorityColors]}>
                      {req.priority}
                    </Badge>
                    <Badge variant="secondary" className={statusColors[req.status as keyof typeof statusColors]}>
                      {req.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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
                      {getStatusIcon(req.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{req.id}</h3>
                        <p className="text-sm text-gray-600">{req.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className={statusColors[req.status as keyof typeof statusColors]}>
                        {req.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Requester</p>
                      <p className="font-medium">{req.requester.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium">${req.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{req.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Priority</p>
                      <Badge variant="outline" className={priorityColors[req.priority as keyof typeof priorityColors]}>
                        {req.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
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
