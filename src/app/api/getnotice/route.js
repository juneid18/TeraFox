// pages/api/getmovie.js
import { NextResponse } from "next/server";
import { connect } from "../../dbconfig/db";
import Notice from "@/app/models/NoticeModel";

connect();

export async function POST(request) {
    try {
        // Fetch all movies from the database
        const notices = await Notice.find();

        return NextResponse.json({
            success: true,
            message: 'Notices fetched successfully',
            data: notices
        });
    } catch (error) {
        console.error("Error fetching notices:", error.message);
        
        return NextResponse.json({
            success: false,
            message: error.message || 'Error occurred while fetching notices',
            data: []
        }, { status: 500 });
    }
}