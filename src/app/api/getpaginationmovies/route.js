import { connect } from "../../dbconfig/db";
import Movie from "../../models/MovieModel";

// Connect to MongoDB
connect();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1
    const limit = parseInt(url.searchParams.get('limit')) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit; // Calculate skip value

    // Fetch paginated movies from the database
    const movies = await Movie.find().skip(skip).limit(limit);
    const totalMovies = await Movie.countDocuments(); // Count total movies
    const totalPages = Math.ceil(totalMovies / limit); // Calculate total pages

    // Return the response with the movies and pagination data
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Movies fetched successfully',
        data: movies,
        totalMovies,
        totalPages,
        currentPage: page,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching movies:", error.message);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Error occurred while fetching movies',
        data: [],
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
