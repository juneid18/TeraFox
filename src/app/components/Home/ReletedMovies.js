import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import MovieCard from "./MovieCard";

const RelatedMovies = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedGenre = genre?.[0]?.id;

  useEffect(() => {
    if (!selectedGenre) {
      setMovies([]);
      return;
    }

    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/getgenre/${selectedGenre}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch movies");
        }

        if (data.success === false) {
          setError(data.message);
          setMovies([]);
          return;
        }

        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message || "An error occurred while fetching the movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <p className="mt-4 text-sm text-gray-500">Loading related movies...</p>
      </div>
    );
  }

//   if (error) {
//     return (
//       <div
//         class="p-4 m-10 mb-4 w-[50%] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//         role="alert"
//       >
//         <span class="font-medium">Error:</span> {error}
//       </div>
//     );
//   }

  if (!loading && movies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No movies found for this genre.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-extrabold text-white text-left">
        Related Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.slice(0,5).map((movie, index) => (
          <MovieCard key={movie.id || index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default RelatedMovies;
