const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['REQUESTER', 'APPROVER', 'PROCUREMENT', 'RECEIVER', 'FINANCE', 'ADMIN'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  department: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Index for better performance and uniqueness
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const seedUsers = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create sample users
    const users = [
      {
        name: 'System Administrator',
        email: 'admin@company.com',
        password: await bcrypt.hash('admin123', 12),
        role: 'ADMIN',
        department: 'IT',
      },
      {
        name: 'John Approver',
        email: 'approver@company.com',
        password: await bcrypt.hash('approver123', 12),
        role: 'APPROVER',
        department: 'Management',
      },
      {
        name: 'Sarah Procurement',
        email: 'procurement@company.com',
        password: await bcrypt.hash('procurement123', 12),
        role: 'PROCUREMENT',
        department: 'Procurement',
      },
      {
        name: 'Mike Finance',
        email: 'finance@company.com',
        password: await bcrypt.hash('finance123', 12),
        role: 'FINANCE',
        department: 'Finance',
      },
      {
        name: 'Lisa Requester',
        email: 'requester@company.com',
        password: await bcrypt.hash('requester123', 12),
        role: 'REQUESTER',
        department: 'Marketing',
      },
      {
        name: 'Tom Receiver',
        email: 'receiver@company.com',
        password: await bcrypt.hash('receiver123', 12),
        role: 'RECEIVER',
        department: 'Warehouse',
      },
    ];

    // Insert users
    const createdUsers = await User.insertMany(users);
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
    await mongoose.connection.close();
    process.exit(0);
  }
};

// Load environment variables
require('dotenv').config({ path: '.env.local' });

seedUsers();
