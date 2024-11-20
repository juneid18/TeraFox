import { NextResponse } from 'next/server';
import { connect } from '../../dbconfig/db';
import Movie from '../../models/MovieModel';

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { movieId } = reqBody.data; // Ensure movieId is correctly destructured

    // Attempt to delete the movie by its ID
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    // If the movie is not found
    if (!deletedMovie) {
      return NextResponse.json({
        success: false,
        message: 'Movie not found',
      });
    }

    // Successfully deleted movie
    return NextResponse.json({
      success: true,
      message: 'Movie deleted successfully',
    });
  } catch (error) {
    console.error("Error while deleting movie:", error);

    // Handle errors and return a meaningful message
    return NextResponse.json({
      success: false,
      message: error.message || 'An error occurred while deleting the movie',
    });
  }
}
