import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Requisition from '@/models/Requisition';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const costCenter = searchParams.get('costCenter');

    const query: any = {};
    
    // Role-based filtering
    if (session.user.role === 'REQUESTER') {
      query.requesterId = session.user.id;
    }

    if (status) query.status = status;
    if (costCenter) query.costCenter = costCenter;

    const skip = (page - 1) * limit;

    const [requisitions, total] = await Promise.all([
      (Requisition as any).find(query)
        .populate('requesterId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      (Requisition as any).countDocuments(query),
    ]);

    return NextResponse.json({
      data: requisitions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    const requisition = new (Requisition as any)({
      ...body,
      requesterId: session.user.id,
    });

    await requisition.save();
    await requisition.populate('requesterId', 'name email');

    return NextResponse.json(
      { data: requisition, message: 'Requisition created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating requisition:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
