import { useState, useEffect, useCallback, Suspense } from 'react';
import { Search } from 'lucide-react';
import MovieCard from './MovieCard';
import RequestMovie from './RequestMovie';
export default function MovieGrid({ movies, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Custom debounce implementation
  const debounce = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  // Debounced search effect
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    handler();
    return () => clearTimeout(handler);
  }, [searchTerm, debounce]);

  // Filter movies effect
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredMovies(movies);
      return;
    }

    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [debouncedSearchTerm, movies]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // The search is already handled by the debounced effect
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form 
        onSubmit={handleSubmit}
        className="max-w-md mx-auto px-4"
      >
        <div className="relative">
          <input
            type="search"
            placeholder="Search movies..."
            className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-4 pr-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search movies"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Movies Grid */}
      {!isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie,index) => (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                  <MovieCard key={movie._id} movie={movie} />
              </Suspense>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
  <p className="text-lg text-gray-400">
    {searchTerm ? (
      <>
        No movies found matching `{searchTerm}`` <RequestMovie />
      </>
    ) : (
      "No movies available"
    )}
  </p>
</div>

          )}
        </div>
      )}
    </div>
  );
}