import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Calendar, TrendingUp } from 'lucide-react';

const TrendingMovies = ({ movies }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  // Filter trending movies
  const trendingMovies = movies.filter((movie) => movie.isTrending);

  // Fetch details for trending movies
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await Promise.all(
          trendingMovies.map(async (movie) => {
            const response = await axios.get(
              `${TMDB_BASE_URL}/movie/${movie.movieID}?api_key=${TMDB_API_KEY}`
            );
            return { ...movie, details: response.data };
          })
        );
        setMovieDetails(details);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    if (trendingMovies.length > 0) {
      fetchMovieDetails();
    } else {
      setLoading(false);
    }
  }, [trendingMovies]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(movieDetails.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-400">Loading trending movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-white">Trending Movies</h2>
        </div>
        <p className="text-gray-400">Discover what&rsquo;s hot in the world of cinema</p>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${totalPages * 100}%` }}
          >
            {movieDetails.map((movie, index) => (
              <div
                key={movie.id || index}
                className="relative flex-shrink-0 w-1/5"
              >
                <Link href={`/movies/${movie.metaTitle}/${movie._id}`} prefetch={true}>
                  <div className="relative h-96 rounded-lg overflow-hidden group">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.details.poster_path}`}
                      alt={movie.details.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:opacity-75 transition-opacity duration-300"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-bold text-white mb-2">{movie.details.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{movie.details.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(movie.details.release_date).getFullYear()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {movie.details.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-purple-500 w-4' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingMovies;
