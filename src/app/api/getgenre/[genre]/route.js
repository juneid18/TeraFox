import { NextResponse, NextRequest } from "next/server";
import { connect } from "../../../dbconfig/db";
import Movie from "@/app/models/MovieModel";

connect();

export async function GET(request, { params }) {
  try {
    const {genre} = await params;

    if(!genre){
        return NextResponse.json({
            success: false,
            message: "Genre parameter is required.",
        });    
    }

    const getGenres = await Movie.find({genre_ids : genre})
    if(getGenres.length === 0){
        return NextResponse.json({
            success: false,
            message: `No movies found for the genre: ${genre}.`,
          });    
    }
    return NextResponse.json({
        success: true,
        message: "Genres Movies fetched successfully",
        movies: getGenres,
      });
  
  } catch (error) {
    console.error("Error while fetching genre:", error.message);
    return NextResponse.json({
      success: false,
      message: "Error occurred while fetching genre data by ID",
    });
  }
}
