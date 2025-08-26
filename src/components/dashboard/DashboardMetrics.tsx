'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Clock, 
  ShoppingCart, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  TrendingUp
} from 'lucide-react';

// Mock data - in real app, this would come from API
const mockMetrics = {
  pendingApprovals: 12,
  openPOs: 34,
  overdueReceipts: 5,
  disputedInvoices: 2,
  totalSpend: 245000,
  budgetUtilization: 68,
};

export default function DashboardMetrics() {
  const metrics = [
    {
      title: 'Pending Approvals',
      value: mockMetrics.pendingApprovals,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Awaiting approval',
    },
    {
      title: 'Open Purchase Orders',
      value: mockMetrics.openPOs,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Active POs',
    },
    {
      title: 'Overdue Receipts',
      value: mockMetrics.overdueReceipts,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Past due date',
    },
    {
      title: 'Disputed Invoices',
      value: mockMetrics.disputedInvoices,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Need resolution',
    },
    {
      title: 'Total Spend (YTD)',
      value: `SAR ${mockMetrics.totalSpend.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Year to date',
    },
    {
      title: 'Budget Utilization',
      value: `${mockMetrics.budgetUtilization}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Of allocated budget',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                  {metric.title}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {metric.description}
                </p>
              </div>
              <div className={`p-2 lg:p-3 rounded-full ${metric.bgColor} flex-shrink-0 ml-2`}>
                <metric.icon className={`h-4 w-4 lg:h-6 lg:w-6 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
