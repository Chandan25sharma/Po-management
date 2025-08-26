import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../src/lib/mongodb';
import User from '../src/models/User';
import Vendor from '../src/models/Vendor';
import { Role } from '../src/types';

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await (User as any).deleteMany({});
    await (Vendor as any).deleteMany({});
    console.log('Cleared existing data');

    // Create demo users
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const managerPassword = await bcrypt.hash('manager123', 12);
    
    const users = [
      {
        name: 'System Admin',
        email: 'admin@company.com',
        role: Role.ADMIN,
        password: hashedPassword,
        department: 'IT',
      },
      {
        name: 'John Smith',
        email: 'manager@company.com',
        role: Role.APPROVER,
        password: managerPassword,
        department: 'Finance',
      },
      {
        name: 'Sarah Johnson',
        email: 'procurement@company.com',
        role: Role.PROCUREMENT,
        password: hashedPassword,
        department: 'Procurement',
      },
      {
        name: 'Mike Davis',
        email: 'receiver@company.com',
        role: Role.RECEIVER,
        password: hashedPassword,
        department: 'Warehouse',
      },
      {
        name: 'Emily Chen',
        email: 'finance@company.com',
        role: Role.FINANCE,
        password: hashedPassword,
        department: 'Finance',
      },
      {
        name: 'Tom Wilson',
        email: 'requester@company.com',
        role: Role.REQUESTER,
        password: hashedPassword,
        department: 'Operations',
      },
    ];

    await (User as any).insertMany(users);
    console.log('Created demo users');

    // Create demo vendors
    const vendors = [
      {
        name: 'ABC Office Supplies',
        email: 'orders@abcoffice.com',
        phone: '+966-11-123-4567',
        address: 'Riyadh Business District, Saudi Arabia',
        paymentTerms: 'NET 30',
        bankInfo: 'Al Rajhi Bank - Account: 123456789',
        items: ['Office Furniture', 'Stationery', 'Electronics'],
      },
      {
        name: 'Tech Solutions Ltd',
        email: 'sales@techsolutions.com',
        phone: '+966-11-234-5678',
        address: 'King Fahd Road, Riyadh, Saudi Arabia',
        paymentTerms: 'NET 15',
        bankInfo: 'Saudi British Bank - Account: 987654321',
        items: ['Computers', 'Software', 'IT Services'],
      },
      {
        name: 'Industrial Equipment Co',
        email: 'info@indequip.com',
        phone: '+966-12-345-6789',
        address: 'Jeddah Industrial City, Saudi Arabia',
        paymentTerms: 'NET 45',
        bankInfo: 'National Commercial Bank - Account: 456789123',
        items: ['Machinery', 'Tools', 'Safety Equipment'],
      },
      {
        name: 'Green Cleaning Services',
        email: 'orders@greenclean.com',
        phone: '+966-13-456-7890',
        address: 'Dammam Business Park, Saudi Arabia',
        paymentTerms: 'NET 30',
        bankInfo: 'Riyad Bank - Account: 789123456',
        items: ['Cleaning Supplies', 'Janitorial Services'],
      },
    ];

    await (Vendor as any).insertMany(vendors);
    console.log('Created demo vendors');

    console.log('Database seeded successfully!');
    console.log('\nDemo Login Credentials:');
    console.log('Admin: admin@company.com / admin123');
    console.log('Manager: manager@company.com / manager123');
    console.log('Procurement: procurement@company.com / admin123');
    console.log('Receiver: receiver@company.com / admin123');
    console.log('Finance: finance@company.com / admin123');
    console.log('Requester: requester@company.com / admin123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seed function
seedDatabase();
