import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, ShoppingCart, Package, Receipt } from 'lucide-react';

interface QuickActionsProps {
  userRole?: string;
}

export default function QuickActions({ userRole }: QuickActionsProps) {
  const actions = [
    {
      title: 'Create Requisition',
      description: 'Start a new purchase request',
      href: '/dashboard/requisitions/new',
      icon: FileText,
      color: 'bg-blue-500',
      roles: ['REQUESTER', 'ADMIN', 'PROCUREMENT'],
    },
    {
      title: 'Create Purchase Order',
      description: 'Issue a new PO to vendor',
      href: '/dashboard/purchase-orders/new',
      icon: ShoppingCart,
      color: 'bg-green-500',
      roles: ['PROCUREMENT', 'ADMIN'],
    },
    {
      title: 'Record Receipt',
      description: 'Log goods received',
      href: '/dashboard/receipts/new',
      icon: Package,
      color: 'bg-purple-500',
      roles: ['RECEIVER', 'ADMIN'],
    },
    {
      title: 'Submit Invoice',
      description: 'Process vendor invoice',
      href: '/dashboard/invoices/new',
      icon: Receipt,
      color: 'bg-orange-500',
      roles: ['FINANCE', 'ADMIN'],
    },
  ];

  const availableActions = actions.filter(
    action => !action.roles || action.roles.includes(userRole || '')
  );

  if (availableActions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Plus className="h-5 w-5 mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {availableActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <div className="p-3 lg:p-4 border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer hover:border-gray-300 group">
                <div className="flex items-start mb-2">
                  <div className={`p-2 rounded-md ${action.color} text-white mr-3 group-hover:scale-105 transition-transform`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 text-sm lg:text-base truncate">
                      {action.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
