'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Download,
  Eye
} from 'lucide-react';

// Mock data for activity feed
const activities = [
  {
    id: 1,
    type: 'REQUISITION_APPROVED',
    title: 'Requisition Approved',
    description: 'REQ-2024-0001 approved by John Smith',
    user: { name: 'John Smith', role: 'Manager' },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'APPROVED',
    amount: '$15,245.00',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 2,
    type: 'PO_CREATED',
    title: 'Purchase Order Created',
    description: 'PO-2024-0023 created for ABC Supplies',
    user: { name: 'Sarah Johnson', role: 'Procurement' },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: 'SENT',
    amount: '$8,500.00',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 3,
    type: 'GOODS_RECEIVED',
    title: 'Goods Received',
    description: 'Items delivered for PO-2024-0020',
    user: { name: 'Mike Davis', role: 'Receiver' },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'RECEIVED',
    amount: '$12,300.00',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    id: 4,
    type: 'INVOICE_SUBMITTED',
    title: 'Invoice Submitted',
    description: 'INV-2024-0045 submitted for matching',
    user: { name: 'Emily Chen', role: 'Finance' },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: 'SUBMITTED',
    amount: '$3,200.00',
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    id: 5,
    type: 'BUDGET_ALERT',
    title: 'Budget Alert',
    description: 'Marketing department approaching budget limit',
    user: { name: 'System', role: 'Automated' },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'WARNING',
    amount: '$45,000.00',
    icon: TrendingUp,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
];

const statusColors = {
  APPROVED: 'bg-green-100 text-green-800',
  SENT: 'bg-blue-100 text-blue-800',
  RECEIVED: 'bg-emerald-100 text-emerald-800',
  SUBMITTED: 'bg-orange-100 text-orange-800',
  WARNING: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
};

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || activity.type.toLowerCase().includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-600" />
            Activity Timeline
          </h1>
          <p className="text-gray-600 mt-1">Track all purchase order activities and system events</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search activities, users, or documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === 'requisition' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('requisition')}
              >
                Requisitions
              </Button>
              <Button
                variant={selectedFilter === 'po' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('po')}
              >
                Purchase Orders
              </Button>
              <Button
                variant={selectedFilter === 'invoice' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('invoice')}
              >
                Invoices
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Timeline Indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`p-3 rounded-full ${activity.bgColor} ${activity.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {index < filteredActivities.length - 1 && (
                      <div className="w-px h-12 bg-gray-200 mt-2" />
                    )}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={statusColors[activity.status as keyof typeof statusColors]}>
                          {activity.status}
                        </Badge>
                        <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{activity.user.name}</span>
                          <Badge variant="outline" className="ml-1 text-xs">
                            {activity.user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{activity.timestamp.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Load More Activities
        </Button>
      </div>
    </div>
  );
}
