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
  Building2, 
  Calendar, 
  User, 
  DollarSign,
  Star,
  Phone,
  Mail,
  MapPin,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  Globe,
  Shield,
  TrendingUp,
  Package
} from 'lucide-react';

// Mock data for vendors
const vendors = [
  {
    id: 'VEN-001',
    name: 'ABC Supplies Inc.',
    category: 'Office Supplies',
    contact: {
      email: 'supplies@abc.com',
      phone: '+1 (555) 123-4567',
      website: 'www.abcsupplies.com',
      address: '123 Business Ave, New York, NY 10001',
    },
    primaryContact: {
      name: 'John Smith',
      role: 'Sales Manager',
      email: 'john.smith@abc.com',
      phone: '+1 (555) 123-4568',
    },
    status: 'ACTIVE',
    rating: 4.8,
    totalOrders: 156,
    totalSpent: 245000.00,
    lastOrderDate: '2024-01-15',
    paymentTerms: '30 days',
    certifications: ['ISO 9001', 'Green Certified'],
    performance: {
      onTimeDelivery: 95,
      qualityRating: 4.8,
      responseTime: 2.5,
    },
  },
  {
    id: 'VEN-002',
    name: 'Tech Solutions Ltd.',
    category: 'IT Equipment',
    contact: {
      email: 'orders@techsol.com',
      phone: '+1 (555) 987-6543',
      website: 'www.techsolutions.com',
      address: '456 Tech Park, San Francisco, CA 94105',
    },
    primaryContact: {
      name: 'Sarah Johnson',
      role: 'Account Manager',
      email: 'sarah.johnson@techsol.com',
      phone: '+1 (555) 987-6544',
    },
    status: 'ACTIVE',
    rating: 4.6,
    totalOrders: 89,
    totalSpent: 890000.00,
    lastOrderDate: '2024-01-14',
    paymentTerms: '45 days',
    certifications: ['ISO 27001', 'SOC 2'],
    performance: {
      onTimeDelivery: 92,
      qualityRating: 4.6,
      responseTime: 1.8,
    },
  },
  {
    id: 'VEN-003',
    name: 'Industrial Tools Co.',
    category: 'Manufacturing',
    contact: {
      email: 'sales@industrial.com',
      phone: '+1 (555) 456-7890',
      website: 'www.industrialtools.com',
      address: '789 Industrial Blvd, Detroit, MI 48201',
    },
    primaryContact: {
      name: 'Mike Davis',
      role: 'Regional Sales Director',
      email: 'mike.davis@industrial.com',
      phone: '+1 (555) 456-7891',
    },
    status: 'ACTIVE',
    rating: 4.2,
    totalOrders: 234,
    totalSpent: 567000.00,
    lastOrderDate: '2024-01-13',
    paymentTerms: '60 days',
    certifications: ['ISO 9001', 'CE Certified'],
    performance: {
      onTimeDelivery: 88,
      qualityRating: 4.2,
      responseTime: 3.2,
    },
  },
  {
    id: 'VEN-004',
    name: 'Clean & Maintain Pro',
    category: 'Facility Services',
    contact: {
      email: 'info@cleanpro.com',
      phone: '+1 (555) 321-0987',
      website: 'www.cleanmaintain.com',
      address: '321 Service Street, Chicago, IL 60601',
    },
    primaryContact: {
      name: 'Emily Chen',
      role: 'Service Coordinator',
      email: 'emily.chen@cleanpro.com',
      phone: '+1 (555) 321-0988',
    },
    status: 'ACTIVE',
    rating: 4.4,
    totalOrders: 67,
    totalSpent: 123000.00,
    lastOrderDate: '2024-01-11',
    paymentTerms: '30 days',
    certifications: ['Green Seal', 'OSHA Certified'],
    performance: {
      onTimeDelivery: 91,
      qualityRating: 4.4,
      responseTime: 2.1,
    },
  },
  {
    id: 'VEN-005',
    name: 'Print & Design Studio',
    category: 'Marketing Materials',
    contact: {
      email: 'orders@printdesign.com',
      phone: '+1 (555) 654-3210',
      website: 'www.printdesignstudio.com',
      address: '654 Creative Ave, Los Angeles, CA 90210',
    },
    primaryContact: {
      name: 'Tom Wilson',
      role: 'Creative Director',
      email: 'tom.wilson@printdesign.com',
      phone: '+1 (555) 654-3211',
    },
    status: 'PENDING_REVIEW',
    rating: 3.9,
    totalOrders: 45,
    totalSpent: 78000.00,
    lastOrderDate: '2024-01-10',
    paymentTerms: '15 days',
    certifications: ['FSC Certified'],
    performance: {
      onTimeDelivery: 85,
      qualityRating: 3.9,
      responseTime: 4.1,
    },
  },
  {
    id: 'VEN-006',
    name: 'Safety First Ltd.',
    category: 'Safety Equipment',
    contact: {
      email: 'orders@safetyfirst.com',
      phone: '+1 (555) 789-0123',
      website: 'www.safetyfirst.com',
      address: '789 Safety Blvd, Houston, TX 77001',
    },
    primaryContact: {
      name: 'Lisa Safety',
      role: 'Safety Specialist',
      email: 'lisa.safety@safetyfirst.com',
      phone: '+1 (555) 789-0124',
    },
    status: 'INACTIVE',
    rating: 3.2,
    totalOrders: 23,
    totalSpent: 45000.00,
    lastOrderDate: '2023-12-15',
    paymentTerms: '30 days',
    certifications: ['ANSI Certified', 'OSHA Approved'],
    performance: {
      onTimeDelivery: 78,
      qualityRating: 3.2,
      responseTime: 5.5,
    },
  },
];

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  PENDING_REVIEW: 'bg-yellow-100 text-yellow-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  SUSPENDED: 'bg-red-100 text-red-800',
};

const categoryColors = {
  'Office Supplies': 'bg-blue-100 text-blue-800',
  'IT Equipment': 'bg-purple-100 text-purple-800',
  'Manufacturing': 'bg-orange-100 text-orange-800',
  'Facility Services': 'bg-teal-100 text-teal-800',
  'Marketing Materials': 'bg-pink-100 text-pink-800',
  'Safety Equipment': 'bg-red-100 text-red-800',
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
    />
  ));
};

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || vendor.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(vendors.map(v => v.category)));

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            Vendors
          </h1>
          <p className="text-gray-600 mt-1">Manage vendor relationships and performance metrics</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-green-600">
                  {vendors.filter(v => v.status === 'ACTIVE').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">
                  {vendors.reduce((sum, v) => sum + v.totalOrders, 0)}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(vendors.reduce((sum, v) => sum + v.totalSpent, 0) / 1000000).toFixed(1)}M
                </p>
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
                placeholder="Search vendors, categories, contacts..."
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
                All Status
              </Button>
              <Button
                variant={selectedStatus === 'ACTIVE' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('ACTIVE')}
              >
                Active
              </Button>
              <Button
                variant={selectedStatus === 'PENDING_REVIEW' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('PENDING_REVIEW')}
              >
                Pending
              </Button>
              <Button
                variant={selectedStatus === 'INACTIVE' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('INACTIVE')}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">{vendor.id}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={statusColors[vendor.status as keyof typeof statusColors]}>
                  {vendor.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Category and Rating */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={categoryColors[vendor.category as keyof typeof categoryColors]}>
                  {vendor.category}
                </Badge>
                <div className="flex items-center gap-1">
                  {getRatingStars(vendor.rating)}
                  <span className="text-sm font-medium ml-1">{vendor.rating}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600 truncate">{vendor.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">{vendor.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600 truncate">{vendor.contact.address}</span>
                </div>
              </div>

              {/* Primary Contact */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Primary Contact</p>
                <p className="font-medium text-sm">{vendor.primaryContact.name}</p>
                <p className="text-xs text-gray-600">{vendor.primaryContact.role}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <p className="font-semibold">{vendor.totalOrders}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Spent</p>
                  <p className="font-semibold">${(vendor.totalSpent / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-gray-500">On-Time Delivery</p>
                  <p className="font-semibold">{vendor.performance.onTimeDelivery}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Avg Response</p>
                  <p className="font-semibold">{vendor.performance.responseTime}h</p>
                </div>
              </div>

              {/* Certifications */}
              {vendor.certifications.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
