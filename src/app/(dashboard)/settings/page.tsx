'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Globe, 
  Palette, 
  Clock, 
  DollarSign,
  FileText,
  Users,
  Building,
  Key,
  Download,
  Upload,
  RefreshCw,
  Check,
  AlertTriangle,
  Info,
  Save,
  X,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

// Mock data for system settings
const systemSettings = {
  company: {
    name: 'Acme Corporation',
    address: '123 Business Street, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'admin@acme.com',
    website: 'www.acme.com',
    timezone: 'America/New_York',
    currency: 'USD',
    fiscalYearStart: 'January',
    logoUrl: '',
  },
  purchaseOrder: {
    autoApproval: true,
    approvalLimit: 5000,
    requiresThreeQuotes: 2500,
    defaultPaymentTerms: '30 days',
    allowPartialReceiving: true,
    autoCreateInvoices: false,
    numberingPrefix: 'PO-',
    startingNumber: 1000,
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    approvalReminders: true,
    budgetAlerts: true,
    deliveryUpdates: true,
    systemMaintenance: true,
    weeklyReports: true,
  },
  security: {
    passwordMinLength: 8,
    requireSpecialChars: true,
    sessionTimeout: 120,
    twoFactorRequired: false,
    allowGuestAccess: false,
    ipWhitelist: '',
    auditLogging: true,
  },
  integrations: {
    accountingSystem: 'QuickBooks',
    inventorySystem: 'None',
    emailProvider: 'SMTP',
    backupProvider: 'AWS S3',
    apiEnabled: true,
    webhooksEnabled: false,
  },
};

const userRoles = [
  { id: 1, name: 'Administrator', users: 2, permissions: ['All'], color: 'bg-red-100 text-red-800' },
  { id: 2, name: 'Manager', users: 5, permissions: ['Approve PO', 'View Reports', 'Manage Budget'], color: 'bg-blue-100 text-blue-800' },
  { id: 3, name: 'Buyer', users: 8, permissions: ['Create PO', 'Receive Goods', 'View Vendors'], color: 'bg-green-100 text-green-800' },
  { id: 4, name: 'Viewer', users: 12, permissions: ['View Only'], color: 'bg-gray-100 text-gray-800' },
];

const auditLogs = [
  { id: 1, user: 'John Admin', action: 'Updated approval limit', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.100' },
  { id: 2, user: 'Sarah Manager', action: 'Enabled email notifications', timestamp: '2024-01-14 14:22:00', ip: '192.168.1.101' },
  { id: 3, user: 'Mike Buyer', action: 'Changed password', timestamp: '2024-01-14 09:15:00', ip: '192.168.1.102' },
  { id: 4, user: 'Emily Facilities', action: 'Accessed vendor settings', timestamp: '2024-01-13 16:45:00', ip: '192.168.1.103' },
  { id: 5, user: 'System', action: 'Automatic backup completed', timestamp: '2024-01-13 02:00:00', ip: 'localhost' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const tabs = [
    { id: 'company', label: 'Company', icon: Building },
    { id: 'purchase', label: 'Purchase Orders', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'audit', label: 'Audit Log', icon: Eye },
  ];

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>Basic company details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <Input defaultValue={systemSettings.company.name} />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue={systemSettings.company.email} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input defaultValue={systemSettings.company.phone} />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input defaultValue={systemSettings.company.website} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Address</label>
              <Input defaultValue={systemSettings.company.address} />
            </div>
            <div>
              <label className="text-sm font-medium">Timezone</label>
              <Input defaultValue={systemSettings.company.timezone} />
            </div>
            <div>
              <label className="text-sm font-medium">Currency</label>
              <Input defaultValue={systemSettings.company.currency} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Logo</CardTitle>
          <CardDescription>Upload your company logo for documents and emails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Logo
              </Button>
              <p className="text-xs text-gray-500">Recommended: 200x200px, PNG or JPG</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPurchaseSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Purchase Order Settings
          </CardTitle>
          <CardDescription>Configure purchase order workflow and approvals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Approval Limit ($)</label>
              <Input defaultValue={systemSettings.purchaseOrder.approvalLimit} type="number" />
            </div>
            <div>
              <label className="text-sm font-medium">Three Quotes Required Above ($)</label>
              <Input defaultValue={systemSettings.purchaseOrder.requiresThreeQuotes} type="number" />
            </div>
            <div>
              <label className="text-sm font-medium">Default Payment Terms</label>
              <Input defaultValue={systemSettings.purchaseOrder.defaultPaymentTerms} />
            </div>
            <div>
              <label className="text-sm font-medium">PO Number Prefix</label>
              <Input defaultValue={systemSettings.purchaseOrder.numberingPrefix} />
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto Approval</p>
                <p className="text-xs text-gray-500">Automatically approve POs under approval limit</p>
              </div>
              <Switch defaultChecked={systemSettings.purchaseOrder.autoApproval} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Allow Partial Receiving</p>
                <p className="text-xs text-gray-500">Allow receiving partial quantities</p>
              </div>
              <Switch defaultChecked={systemSettings.purchaseOrder.allowPartialReceiving} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto Create Invoices</p>
                <p className="text-xs text-gray-500">Automatically create invoices on goods receipt</p>
              </div>
              <Switch defaultChecked={systemSettings.purchaseOrder.autoCreateInvoices} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Manage email and system notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive notifications via email</p>
              </div>
              <Switch defaultChecked={systemSettings.notifications.emailEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SMS Notifications</p>
                <p className="text-xs text-gray-500">Receive urgent notifications via SMS</p>
              </div>
              <Switch defaultChecked={systemSettings.notifications.smsEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Approval Reminders</p>
                <p className="text-xs text-gray-500">Reminder for pending approvals</p>
              </div>
              <Switch defaultChecked={systemSettings.notifications.approvalReminders} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Budget Alerts</p>
                <p className="text-xs text-gray-500">Alerts when approaching budget limits</p>
              </div>
              <Switch defaultChecked={systemSettings.notifications.budgetAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Delivery Updates</p>
                <p className="text-xs text-gray-500">Notifications about delivery status</p>
              </div>
              <Switch defaultChecked={systemSettings.notifications.deliveryUpdates} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Weekly Reports</p>
                <p className="text-xs text-gray-500">Receive weekly summary reports</p>
              </div>
              <Switch defaultChecked={systemSettings.notifications.weeklyReports} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Configure password policies and security options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Minimum Password Length</label>
              <Input defaultValue={systemSettings.security.passwordMinLength} type="number" />
            </div>
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input defaultValue={systemSettings.security.sessionTimeout} type="number" />
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Require Special Characters</p>
                <p className="text-xs text-gray-500">Password must contain special characters</p>
              </div>
              <Switch defaultChecked={systemSettings.security.requireSpecialChars} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Require 2FA for all users</p>
              </div>
              <Switch defaultChecked={systemSettings.security.twoFactorRequired} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Audit Logging</p>
                <p className="text-xs text-gray-500">Log all user actions for security</p>
              </div>
              <Switch defaultChecked={systemSettings.security.auditLogging} />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <label className="text-sm font-medium">IP Whitelist</label>
            <Input 
              placeholder="Enter IP addresses separated by commas" 
              defaultValue={systemSettings.security.ipWhitelist}
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to allow all IPs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsersSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Roles & Permissions
          </CardTitle>
          <CardDescription>Manage user roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userRoles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className={role.color}>
                    {role.name}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">{role.users} users</p>
                    <p className="text-xs text-gray-500">
                      {role.permissions.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Role
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Integrations
          </CardTitle>
          <CardDescription>Configure third-party integrations and APIs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Accounting System</label>
              <Input defaultValue={systemSettings.integrations.accountingSystem} />
            </div>
            <div>
              <label className="text-sm font-medium">Inventory System</label>
              <Input defaultValue={systemSettings.integrations.inventorySystem} />
            </div>
            <div>
              <label className="text-sm font-medium">Email Provider</label>
              <Input defaultValue={systemSettings.integrations.emailProvider} />
            </div>
            <div>
              <label className="text-sm font-medium">Backup Provider</label>
              <Input defaultValue={systemSettings.integrations.backupProvider} />
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">API Access</p>
                <p className="text-xs text-gray-500">Enable API for third-party integrations</p>
              </div>
              <Switch defaultChecked={systemSettings.integrations.apiEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Webhooks</p>
                <p className="text-xs text-gray-500">Send real-time updates via webhooks</p>
              </div>
              <Switch defaultChecked={systemSettings.integrations.webhooksEnabled} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAuditLog = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Audit Log
          </CardTitle>
          <CardDescription>View system activity and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-gray-500">
                    {log.user} • {log.timestamp} • {log.ip}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">Showing last 5 entries</p>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Full Log
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company': return renderCompanySettings();
      case 'purchase': return renderPurchaseSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'users': return renderUsersSettings();
      case 'integrations': return renderIntegrationsSettings();
      case 'audit': return renderAuditLog();
      default: return renderCompanySettings();
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="h-8 w-8 text-gray-600" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage system configuration and preferences</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {unsavedChanges && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Unsaved Changes</p>
                <p className="text-sm text-yellow-600">
                  You have unsaved changes. Please save or they will be lost.
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setUnsavedChanges(false)}>
                  Discard
                </Button>
                <Button size="sm" onClick={() => setUnsavedChanges(false)}>
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Tabs */}
        <div className="lg:w-64">
          <Card>
            <CardContent className="p-3">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
