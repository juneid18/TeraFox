import { NextResponse } from "next/server";
import { connect } from "../../dbconfig/db";  // Ensure your path is correct
import Movie from "@/app/models/MovieModel";  // Ensure this is your Movie model

connect();

export async function POST(request) {
    try {
        // Parse request body
        const reqbody = await request.json();
        const { id } = reqbody;  // Only the id is needed to toggle `isTrending`

        // Check if an ID is provided
        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Movie ID is required',
                data: []
            }, { status: 400 });
        }

        // Find the movie by ID
        const movie = await Movie.findById(id);

        if (!movie) {
            return NextResponse.json({
                success: false,
                message: `Movie with ID ${id} not found`,
                data: []
            }, { status: 404 });
        }

        // Toggle the `isTrending` value
        movie.isTrending = !movie.isTrending;

        // Save the movie back to the database
        await movie.save();

        // Return a success response
        return NextResponse.json({
            success: true,
            message: `Movie marked as ${movie.isTrending ? 'trending' : 'not trending'} successfully`,
            data: movie
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating movie's trending status:", error.message);
        return NextResponse.json({
            success: false,
            message: error.message || 'Error occurred while updating movie\'s trending status',
            data: []
        }, { status: 500 });
    }
}
