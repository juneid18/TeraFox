'use client'

import { useState, useEffect, use } from "react";
import axios from "axios";
import Header from "@/app/components/Home/Header";
import MovieCard from "@/app/components/Home/MovieCard";
import Sidebar from "@/app/components/Home/Sidebar";

export default function GenrePage({ params }) {
  const { genre } = use(params);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/getgenre/${genre}`);
        setMovies(response.data.movies);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching the data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesByGenre();
  }, [genre]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[200px]" key="loading">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6" key="error">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      );
    }

    if (!movies?.length) {
      return (
        <div className="col-span-full text-center py-12" key="empty">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No movies found</h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn&apos;t find any movies in the {genre.replace(/-/g, ' ')} genre.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" key="movies-grid">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id || index} movie={movie} />
        ))}
      </div>
    );
  };
console.log(movies);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="container mx-auto flex flex-col md:flex-row py-8">
        <Sidebar />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Genre Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white-900 capitalize">
                Category ID:  {genre.replace(/-/g, ' ')}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Discover the best movies in our collection
              </p>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}