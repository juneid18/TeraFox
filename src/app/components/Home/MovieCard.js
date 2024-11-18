"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieCard({ movie }) {
  const [tmdbData, setTmdbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname; // e.g., "/rock"
  const TMDB_API_KEY = process.env.TMDB_API_KEY; // Use the TMDB API Key from .env file.
const route = useRouter();
  // Fetch TMDB data directly from their API
  const fetchTmdbMovieDetails = async (movieID) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch TMDB movie details");
      }
      const data = await response.json();
      setTmdbData(data); // Save the TMDB movie details
    } catch (error) {
      console.error("Error fetching TMDB movie details:", error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    if (movie.movieID) {
      fetchTmdbMovieDetails(movie.movieID);
    }
  }, [movie.movieID]);

  if (loading) {
    return (
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md flex items-center justify-center h-[300px]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!tmdbData) {
    return (
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md flex items-center justify-center h-[300px]">
        <p className="text-red-500">Failed to load movie</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition duration-200">
 
      <Link href={`/movies/${movie.metaTitle}/${movie._id}`} prefetch={true}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`}
          alt={tmdbData.title}
          width={200}
          height={300}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 flex flex-col justify-end p-4 transition-opacity">
          <h3 className="text-white text-lg font-semibold">{tmdbData.title}</h3>
          <p className="text-gray-400 text-sm">
            {tmdbData.release_date?.split("-")[0]}
          </p>
          <p className="text-gray-400 text-sm">{Math.ceil(tmdbData.vote_average)} / 10</p>
        </div>
      </Link>
    </div>
  );
}
