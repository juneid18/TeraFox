import { NextResponse } from 'next/server';
import { connect } from '../../dbconfig/db';
import Notice from '../../models/NoticeModel';

connect();

export async function DELETE(request) {
  try {
    // Parse the request body to get the ID
    const reqBody = await request.json();
    const { id } = reqBody;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Notice ID is required',
      }, { status: 400 });
    }

    // Find and delete the notice by its ID
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return NextResponse.json({
        success: false,
        message: 'Notice not found',
      }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Notice deleted successfully',
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting notice:", error.message);

    return NextResponse.json({
      success: false,
      message: error.message || 'An error occurred while deleting the notice',
    }, { status: 500 });
  }
}
