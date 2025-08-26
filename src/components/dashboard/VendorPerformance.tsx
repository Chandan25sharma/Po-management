'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Users, Star, TrendingUp, Award, Clock } from 'lucide-react';

// Mock data for vendor performance metrics
const vendorPerformanceData = [
  { metric: 'On-Time Delivery', value: 92 },
  { metric: 'Quality Rating', value: 88 },
  { metric: 'Response Time', value: 85 },
  { metric: 'Cost Competitiveness', value: 78 },
  { metric: 'Communication', value: 91 },
  { metric: 'Compliance', value: 95 },
];

// Mock data for top vendors
const topVendors = [
  { 
    name: 'Tech Solutions Ltd.', 
    rating: 4.8, 
    orders: 45, 
    onTime: 96, 
    amount: 125000,
    trend: 'up'
  },
  { 
    name: 'ABC Supplies Inc.', 
    rating: 4.6, 
    orders: 32, 
    onTime: 92, 
    amount: 89000,
    trend: 'up'
  },
  { 
    name: 'Industrial Tools Co.', 
    rating: 4.2, 
    orders: 28, 
    onTime: 88, 
    amount: 76000,
    trend: 'stable'
  },
  { 
    name: 'Office Pro Supply', 
    rating: 4.0, 
    orders: 21, 
    onTime: 85, 
    amount: 54000,
    trend: 'down'
  },
];

// Mock data for vendor spending distribution
const vendorSpendingData = [
  { name: 'Tech Solutions', amount: 125000, percentage: 35 },
  { name: 'ABC Supplies', amount: 89000, percentage: 25 },
  { name: 'Industrial Tools', amount: 76000, percentage: 21 },
  { name: 'Office Pro', amount: 54000, percentage: 15 },
  { name: 'Others', amount: 14000, percentage: 4 },
];

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
    />
  ));
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-3 w-3 text-green-500" />;
    case 'down':
      return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
    default:
      return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
  }
};

export default function VendorPerformance() {
  const totalSpending = vendorSpendingData.reduce((sum, vendor) => sum + vendor.amount, 0);
  const averageRating = (topVendors.reduce((sum, vendor) => sum + vendor.rating, 0) / topVendors.length).toFixed(1);
  const averageOnTime = Math.round(topVendors.reduce((sum, vendor) => sum + vendor.onTime, 0) / topVendors.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-600" />
          Vendor Performance
        </CardTitle>
        <p className="text-sm text-gray-600">
          Vendor metrics and spending analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{topVendors.length}</p>
            <p className="text-xs text-gray-600">Active Vendors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{averageRating}</p>
            <p className="text-xs text-gray-600">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{averageOnTime}%</p>
            <p className="text-xs text-gray-600">On-Time Delivery</p>
          </div>
        </div>

        {/* Performance Radar Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Overall Performance Metrics</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={vendorPerformanceData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 8, fill: '#6b7280' }}
                />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#f97316"
                  fill="#fed7aa"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Score']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Vendors List */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Top Performing Vendors</h4>
          <div className="space-y-3">
            {topVendors.map((vendor, index) => (
              <div key={vendor.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {getRatingStars(vendor.rating)}
                      </div>
                      <span className="text-xs text-gray-500">{vendor.rating}</span>
                      {getTrendIcon(vendor.trend)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${(vendor.amount / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-500">
                    {vendor.orders} orders • {vendor.onTime}% on-time
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Spending Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Spending Distribution</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorSpendingData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  stroke="#6b7280"
                  fontSize={10}
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#6b7280"
                  fontSize={10}
                  width={80}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spending']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="amount" fill="#f97316" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Average Response Time</span>
            <div className="flex items-center gap-2">
              <Progress value={78} className="w-20 h-2" />
              <span className="text-sm font-medium">2.3 hours</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Quality Compliance</span>
            <div className="flex items-center gap-2">
              <Progress value={94} className="w-20 h-2" />
              <span className="text-sm font-medium">94%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cost Savings</span>
            <div className="flex items-center gap-2">
              <Progress value={85} className="w-20 h-2" />
              <span className="text-sm font-medium">12.5%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t">
          <Badge variant="outline" className="justify-center py-2 cursor-pointer hover:bg-orange-50">
            <Award className="h-3 w-3 mr-1" />
            View All Vendors
          </Badge>
          <Badge variant="outline" className="justify-center py-2 cursor-pointer hover:bg-blue-50">
            <Clock className="h-3 w-3 mr-1" />
            Performance Reports
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
