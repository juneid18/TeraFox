import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../dbconfig/db";
import Movie from "@/app/models/MovieModel";

connect();

export async function PUT(request) {
  try {
    const reqBody = await request.json();
    const { id, title, metaTitle, buttonData } = reqBody;

    // Validate input
    if (!id || !title || !metaTitle || !Array.isArray(buttonData)) {
      return NextResponse.json({
        success: false,
        message: "ID, Title, Meta Title, and Button Data are required",
      });
    }

    // Find the movie by its ID
    const movieToUpdate = await Movie.findById(id);
    if (!movieToUpdate) {
      return NextResponse.json({
        success: false,
        message: "Movie not found",
      });
    }

    // Update the movie's fields
    movieToUpdate.title = title;
    movieToUpdate.metaTitle = metaTitle;
    movieToUpdate.buttonData = buttonData;

    // Save the updated movie
    await movieToUpdate.save();

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Movie updated successfully",
      movie: movieToUpdate,
    });
  } catch (error) {
    console.log("Error while updating movie:", error.message);
    return NextResponse.json({
      success: false,
      message: "Error while updating movie",
      error: error.message,
    });
  }
}
