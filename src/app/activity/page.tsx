'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, User, FileText } from 'lucide-react';

export default function ActivityPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
    return null;
  }

  const activities = [
    {
      id: 1,
      type: 'requisition',
      title: 'New Requisition Created',
      description: 'Office Supplies - Req #2024-001',
      user: 'John Doe',
      time: '2 hours ago',
      icon: FileText,
      status: 'pending'
    },
    {
      id: 2,
      type: 'purchase_order',
      title: 'Purchase Order Approved',
      description: 'IT Equipment - PO #2024-015',
      user: 'Jane Smith',
      time: '4 hours ago',
      icon: FileText,
      status: 'approved'
    },
    {
      id: 3,
      type: 'vendor',
      title: 'New Vendor Added',
      description: 'TechCorp Solutions',
      user: 'Admin',
      time: '1 day ago',
      icon: User,
      status: 'completed'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Activity Timeline</h1>
              <p className="text-muted-foreground">
                Recent activities and updates across your procurement system
              </p>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <Card key={activity.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{activity.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {activity.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            by {activity.user}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
