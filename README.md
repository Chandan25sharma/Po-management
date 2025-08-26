# Purchase Order (PO) Management Platform

A comprehensive Purchase Order Management System built with Next.js 14, TypeScript, MongoDB Atlas, and TailwindCSS. This platform streamlines the entire procurement process from requisition to payment.

## 🚀 Features

### Core Functionality
- **Purchase Requisitions**: Request approval for purchases with detailed specifications
- **Purchase Orders**: Convert approved requisitions to formal POs 
- **Goods Receipts**: Record and track delivery of ordered items
- **Invoice Management**: Process vendor invoices with 3-way matching
- **Vendor Management**: Maintain vendor database with contacts and terms
- **Budget Tracking**: Monitor spending against allocated budgets
- **Approval Workflows**: Configurable approval rules based on amount and department

### User Roles
- **Requester**: Create and track requisitions
- **Approver**: Review and approve/reject requests
- **Procurement**: Manage POs and vendor relationships
- **Receiver**: Record goods receipts
- **Finance**: Process invoices and payments
- **Admin**: System configuration and user management

### Technical Features
- **Role-Based Access Control (RBAC)**: Secure user permissions
- **Real-time Notifications**: Email and in-app notifications
- **Document Management**: File uploads and attachments
- **Audit Trail**: Complete transaction history
- **Dashboard Analytics**: KPIs and metrics
- **Mobile Responsive**: Works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB Atlas
- **Authentication**: NextAuth.js with JWT
- **State Management**: Zustand + TanStack Query
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Database**: MongoDB Atlas with Mongoose ODM

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PO-Management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas
MONGODB_URI=your_mongodb_atlas_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload (Optional - AWS S3 compatible)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

### 4. Database Setup

#### Get MongoDB Atlas Connection String:
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Go to Database Access → Add Database User
4. Go to Network Access → Add IP Address (0.0.0.0/0 for development)
5. Go to Databases → Connect → Connect your application
6. Copy the connection string and replace `<password>` with your database user password

#### Seed Database with Demo Data:
```bash
npm run seed
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👥 Demo Accounts

After running the seed script, use these demo accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Admin | admin@company.com | admin123 | Full system access |
| Manager | manager@company.com | manager123 | Approval authority |
| Procurement | procurement@company.com | admin123 | PO management |
| Receiver | receiver@company.com | admin123 | Goods receipt |
| Finance | finance@company.com | admin123 | Invoice processing |
| Requester | requester@company.com | admin123 | Create requisitions |

## 📱 Application Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   ├── login/            # Authentication pages
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── lib/                  # Utility libraries
├── models/               # MongoDB models
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🔄 Workflow Overview

### 1. Purchase Requisition Process
1. **Requester** creates requisition with items and justification
2. **Approver** reviews and approves/rejects based on rules
3. **Procurement** converts approved requisition to PO

### 2. Purchase Order Process
1. **Procurement** creates PO from requisition or directly
2. PO is sent to vendor with terms and delivery details
3. **Receiver** records goods receipt when items arrive

### 3. Invoice Processing
1. **Finance** submits vendor invoice
2. System performs 3-way match (PO vs Receipt vs Invoice)
3. Discrepancies flagged for resolution
4. **Finance** approves and marks as paid

### 4. Approval Rules
- Configurable by amount thresholds
- Department-specific approvers
- Multi-level approval chains
- Automatic notifications and reminders

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Environment variable security

## 📊 Key Pages & Features

### Dashboard (`/dashboard`)
- Key metrics and KPIs
- Quick action buttons
- Recent activity feed
- Budget utilization charts

### Requisitions (`/dashboard/requisitions`)
- List all requisitions with filtering
- Create new requisitions
- Track approval status
- Attach quotes and specifications

### Purchase Orders (`/dashboard/purchase-orders`)
- Convert requisitions to POs
- Send POs to vendors
- Track delivery status
- Generate PDF documents

### Invoices (`/dashboard/invoices`)
- Submit vendor invoices
- 3-way matching validation
- Dispute resolution
- Payment tracking

### Vendors (`/dashboard/vendors`)
- Vendor directory
- Contact information
- Payment terms
- Document management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@yourcompany.com
- 📖 Documentation: [Link to detailed docs]
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with core PO management features
- **v1.1.0** - Added approval workflows and notifications
- **v1.2.0** - Enhanced reporting and analytics

---

**Note**: This is a demonstration project. For production use, ensure proper security reviews, performance optimization, and compliance with your organization's requirements.
