'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RequisitionsPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div></div>;
  }

  if (!session) {
    redirect('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Requisitions</h1>
              <p className="text-muted-foreground">Manage your purchase requisitions</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p>Requisitions management will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
