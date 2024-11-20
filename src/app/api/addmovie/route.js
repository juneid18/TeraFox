import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../dbconfig/db";
import Movie from "../../models/MovieModel";

export async function POST(request) {
  try {
    // Connect to the database
    await connect();
    console.log("Database connected successfully");

    // Parse the request body
    const reqBody = await request.json();
    const { movieID, title, metaTitle, buttonUrlsAndTitles, genre_ids } = reqBody;

    // Validate input fields
    if (!movieID || !title || !metaTitle || !buttonUrlsAndTitles || !genre_ids) {
      return NextResponse.json({
        message: 'All fields are required.',
        success: false,
      });
    }
// Sanitize or validate additional fields if necessary
if (!Array.isArray(genre_ids)) {
  return NextResponse.json({
    message: 'Genre IDs should be an array.',
    success: false,
  });
}
    // Create a new movie object
    const newMovie = new Movie({
      movieID,
      title,
      metaTitle,
      buttonUrlsAndTitles,
      genre_ids,
    });

    // Save the new movie to the database
    const addMovie = await newMovie.save();
    console.log("Movie added:", addMovie);

    // Return a success response
    return NextResponse.json({
      success: true,
      message: 'Movie added successfully',
    });
  } catch (error) {
    console.error("Error while adding movie:", error);

    // Return an error response if the operation fails
    return NextResponse.json({
      message: 'Error occurred while sending movie data',
      success: false,
    });
  }
}
