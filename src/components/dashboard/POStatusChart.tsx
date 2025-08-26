'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Mock data for PO status distribution
const poStatusData = [
  { name: 'Pending Approval', value: 12, color: '#f59e0b', icon: Clock },
  { name: 'Approved', value: 28, color: '#10b981', icon: CheckCircle },
  { name: 'Partially Received', value: 15, color: '#3b82f6', icon: AlertCircle },
  { name: 'Completed', value: 45, color: '#6b7280', icon: CheckCircle },
  { name: 'Cancelled', value: 8, color: '#ef4444', icon: XCircle },
];

// Mock data for PO trends over time
const poTrendsData = [
  { month: 'Mar', created: 22, completed: 18, cancelled: 2 },
  { month: 'Apr', created: 28, completed: 24, cancelled: 3 },
  { month: 'May', created: 32, completed: 29, cancelled: 1 },
  { month: 'Jun', created: 35, completed: 31, cancelled: 2 },
  { month: 'Jul', created: 29, completed: 27, cancelled: 4 },
  { month: 'Aug', created: 38, completed: 35, cancelled: 2 },
];

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#6b7280', '#ef4444'];

export default function POStatusChart() {
  const totalPOs = poStatusData.reduce((sum, item) => sum + item.value, 0);
  const activePOs = poStatusData
    .filter(item => !['Completed', 'Cancelled'].includes(item.name))
    .reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Purchase Order Status
        </CardTitle>
        <p className="text-sm text-gray-600">
          Current status distribution and trends
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-900">{totalPOs}</p>
            <p className="text-sm text-blue-600">Total POs</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-900">{activePOs}</p>
            <p className="text-sm text-green-600">Active POs</p>
          </div>
        </div>

        {/* PO Status Distribution Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Status Distribution</h4>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Donut Chart */}
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={poStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {poStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value} POs`, 'Count']}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Status Legend */}
            <div className="flex-1 space-y-3">
              {poStatusData.map((entry, index) => {
                const Icon = entry.icon;
                const percentage = ((entry.value / totalPOs) * 100).toFixed(1);
                
                return (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <Icon className="h-4 w-4" style={{ color: COLORS[index] }} />
                      <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{entry.value}</p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PO Trends Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">6-Month Trends</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={poTrendsData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    const nameMap: { [key: string]: string } = {
                      'created': 'Created',
                      'completed': 'Completed',
                      'cancelled': 'Cancelled'
                    };
                    return [`${value} POs`, nameMap[name] || name];
                  }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="created" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="completed" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="cancelled" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend for trends */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-600">Created</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">Cancelled</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t">
          <Badge variant="outline" className="justify-center py-2 cursor-pointer hover:bg-blue-50">
            View All POs
          </Badge>
          <Badge variant="outline" className="justify-center py-2 cursor-pointer hover:bg-green-50">
            Create New PO
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
