import { NextResponse, NextRequest } from "next/server";
import {connect} from "../../dbconfig/db";
import Movie from "@/app/models/MovieModel";

connect();

export async function POST(request) {
  try {
      const reqBody = await request.json();
      const { id } = reqBody; // Make sure this matches what the client sends

      // Fetch movie by id (make sure your schema has the correct field for _id)
      const findMovie = await Movie.findById(id);

      if (!findMovie) {
          return NextResponse.json({
              success: false,
              message: "Movie not found",
          });
      }

      return NextResponse.json({
          success: true,
          message: "Movie fetched successfully",
          movie: findMovie,
      });
  } catch (error) {
      console.error("Error while fetching movie:", error.message);
      return NextResponse.json({
          success: false,
          message: "Error occurred while fetching movie data by ID",
      });
  }
}