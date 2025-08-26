import bcrypt from 'bcryptjs';
import connectDB from '../src/lib/mongodb';
import User from '../src/models/User';
import { Role } from '../src/types';

const seedUsers = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing users (optional - remove this if you want to keep existing users)
    await (User as any).deleteMany({}).exec();
    console.log('Cleared existing users');

    // Create sample users
    const users = [
      {
        name: 'System Administrator',
        email: 'admin@company.com',
        password: await bcrypt.hash('admin123', 12),
        role: Role.ADMIN,
        department: 'IT',
      },
      {
        name: 'John Approver',
        email: 'approver@company.com',
        password: await bcrypt.hash('approver123', 12),
        role: Role.APPROVER,
        department: 'Management',
      },
      {
        name: 'Sarah Procurement',
        email: 'procurement@company.com',
        password: await bcrypt.hash('procurement123', 12),
        role: Role.PROCUREMENT,
        department: 'Procurement',
      },
      {
        name: 'Mike Finance',
        email: 'finance@company.com',
        password: await bcrypt.hash('finance123', 12),
        role: Role.FINANCE,
        department: 'Finance',
      },
      {
        name: 'Lisa Requester',
        email: 'requester@company.com',
        password: await bcrypt.hash('requester123', 12),
        role: Role.REQUESTER,
        department: 'Marketing',
      },
      {
        name: 'Tom Receiver',
        email: 'receiver@company.com',
        password: await bcrypt.hash('receiver123', 12),
        role: Role.RECEIVER,
        department: 'Warehouse',
      },
    ];

    // Insert users
    const createdUsers = await (User as any).create(users);
    console.log(`Created ${createdUsers.length} users:`);
    
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@company.com / admin123');
    console.log('Approver: approver@company.com / approver123');
    console.log('Procurement: procurement@company.com / procurement123');
    console.log('Finance: finance@company.com / finance123');
    console.log('Requester: requester@company.com / requester123');
    console.log('Receiver: receiver@company.com / receiver123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedUsers();
