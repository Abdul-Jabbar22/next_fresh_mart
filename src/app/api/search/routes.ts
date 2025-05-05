import { NextResponse } from 'next/server';
import { Product } from '@/lib/models/Product';
import connectDB from '@/lib/db';

export async function GET(request: Request) {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');

    if (!query) {
      console.log('🔍 Empty search query received');
      return NextResponse.json([]);
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Search with text index (ensure you've created a text index on your schema)
    const results = await Product.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .select('_id name price image slug') // include slug for product pages
      .sort({ score: { $meta: "textScore" } }) // sort by relevance
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const totalResults = await Product.countDocuments({
      $text: { $search: query }
    });

    console.log(`🔍 Search "${query}" →`, results.length, 'results');
    
    return NextResponse.json({
      results,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalResults / limit),
        totalResults,
        limit
      }
    });
  } catch (error) {
    console.error('❌ Search error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}