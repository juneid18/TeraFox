// pages/api/getmovie.js
import { NextResponse } from "next/server";
import { connect } from "../../dbconfig/db";
import Movie from "../../models/MovieModel";

connect();

export async function POST(request) {
    try {
        // Fetch all movies from the database
        const movies = await Movie.find();

        return NextResponse.json({
            success: true,
            message: 'Movies fetched successfully',
            data: movies
        });
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        
        return NextResponse.json({
            success: false,
            message: error.message || 'Error occurred while fetching movies',
            data: []
        }, { status: 500 });
    }
}