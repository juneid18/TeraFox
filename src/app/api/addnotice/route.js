import { connect } from "../../dbconfig/db";
import Notice from "../../models/NoticeModel";
import { NextResponse, NextRequest } from "next/server";

connect();
export async function POST(request) {
    try {
      const reqBody = await request.json();
      const { content } = reqBody;
  
      if (!content || typeof content !== 'string') {
        return NextResponse.json(
          { success: false, message: 'Invalid or missing content' },
          { status: 400 }
        );
      }
  
      const notice = await Notice.create({ content });
      return NextResponse.json({
        success: true,
        message: 'Notice created successfully',
        data: notice,
      });
    } catch (error) {
      console.error('Error creating notice:', error.message);
      return NextResponse.json(
        { success: false, message: error.message || 'Failed to create notice' },
        { status: 500 }
      );
    }
  }
  