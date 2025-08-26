'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Activity, User, Calendar, Clock, FileText, CheckCircle } from 'lucide-react';

// Mock data - in real app, this would come from API
const mockActivity = [
  {
    id: 1,
    type: 'REQUISITION_APPROVED',
    description: 'Requisition REQ-2024-0001 approved by John Smith',
    user: 'John Smith',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'APPROVED',
  },
  {
    id: 2,
    type: 'PO_CREATED',
    description: 'Purchase Order PO-2024-0023 created for ABC Supplies',
    user: 'Sarah Johnson',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    status: 'SENT',
  },
  {
    id: 3,
    type: 'GOODS_RECEIVED',
    description: 'Goods receipt recorded for PO-2024-0020',
    user: 'Mike Davis',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    status: 'RECEIVED',
  },
  {
    id: 4,
    type: 'INVOICE_SUBMITTED',
    description: 'Invoice INV-2024-0045 submitted for matching',
    user: 'Emily Chen',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    status: 'SUBMITTED',
  },
  {
    id: 5,
    type: 'REQUISITION_SUBMITTED',
    description: 'New requisition REQ-2024-0002 submitted',
    user: 'Tom Wilson',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    status: 'SUBMITTED',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'REQUISITION_APPROVED':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'PO_CREATED':
      return <FileText className="h-4 w-4 text-blue-600" />;
    case 'GOODS_RECEIVED':
      return <CheckCircle className="h-4 w-4 text-blue-600" />;
    case 'INVOICE_SUBMITTED':
      return <FileText className="h-4 w-4 text-orange-600" />;
    case 'REQUISITION_SUBMITTED':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return <Activity className="h-4 w-4 text-gray-600" />;
  }
};

export default function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Activity className="h-5 w-5 mr-2" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Desktop & Tablet View */}
          <div className="hidden sm:block space-y-3">
            {mockActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 leading-tight mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{activity.user}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="sm:hidden space-y-3">
            {mockActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-3 border rounded-lg bg-white"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-tight">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <User className="h-3 w-3" />
                      <span>User:</span>
                    </div>
                    <span className="text-gray-900">{activity.user}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>Time:</span>
                    </div>
                    <span className="text-gray-900">{formatDate(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center">
          <a 
            href="/dashboard/activity" 
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            View all activity →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
