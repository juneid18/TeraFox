"use client";

import { useEffect, useState } from "react";
import Header from "./components/Home/Header";
import Sidebar from "./components/Home/Sidebar";
import MovieGrid from "./components/Home/MovieGrid";
import Footer from "./components/Home/Footer";
import Pagination from "./components/Home/Pagination";
import Trending from "./components/Home/Trending";
import axios from "axios";
import NoticeBar from "./components/Home/NoticeBar";
import { revalidatePath } from "next/cache";

export default function Home() {
  const [filters, setFilters] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [movieData, setMovieData] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0); // Store the total number of movies
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch movies for pagination from the server
  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/getpaginationmovies", {
        params: {
          page: currentPage,
          limit: pageSize, // Pass the page size as well
        },
      });
      if (response.data.success) {
        setMovieData(response.data.data || []);
        setTotalMovies(response.data.totalMovies || 0); // Set total number of movies
      } else {
        throw new Error(response.data.message || "Failed to fetch movies");
      }
    } catch (err) {
      console.error("Error fetching movies:", err.message);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch movies when the page or filters change
  useEffect(() => {
    fetchMovies();
  }, [currentPage, pageSize]); // Dependency on currentPage and pageSize

  const totalPages = Math.ceil(totalMovies / pageSize); // Calculate total pages dynamically

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <NoticeBar />
      <Trending movies={movieData} />
      <main className="container mx-auto flex flex-col md:flex-row py-8">
        {/* Sidebar for filters */}
        <Sidebar filters={filters} setFilters={setFilters} />

        {/* Main Content */}
        <div className="flex-1 md:ml-4 mt-4 md:mt-0">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading movies...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : movieData.length > 0 ? (
            <>
              <MovieGrid
                movies={movieData}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages} // Pass the calculated total pages
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <p className="text-center text-gray-400">No movies found.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
