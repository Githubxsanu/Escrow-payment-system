import { NextResponse } from 'next/server';

// Temporary in-memory storage for MVP file transfers
// In a real production app, this would be IPFS, AWS S3, or a database
const fileStore: Record<string, any> = {};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { escrowId, fileData, fileHash, signature, fileName } = data;

    if (!fileData || fileData.length > 6 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File data missing or too large' }, { status: 413 });
    }
    
    // Store in memory mapping
    fileStore[escrowId] = { 
      fileData, 
      fileHash, 
      signature, 
      fileName,
      uploadedAt: Date.now()
    };
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const escrowId = searchParams.get('id');
  
  if (escrowId && fileStore[escrowId]) {
    return NextResponse.json({ success: true, data: fileStore[escrowId] });
  }
  
  return NextResponse.json({ success: false, error: 'No file found' }, { status: 404 });
}
