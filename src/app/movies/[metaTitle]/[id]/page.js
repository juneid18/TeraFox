"use client";

import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Loader2, Star, Clock, Globe2, Download, Telegram } from "lucide-react";
import Footer from "@/app/components/Home/Footer";
import Contactus from "@/app/components/Home/Contactus";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReletedMovies from "@/app/components/Home/ReletedMovies";
import { FaTelegramPlane } from "react-icons/fa";

export default function MovieViewPage({ children }) {
  const router = useRouter();

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [tmdbData, setTmdbData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadOptions, setDownloadOptions] = useState([]); // Store download options
  const [Genres, setGenres] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch movie data from your database
        const response = await axios.post("/api/FetchbyID", { id });

        if (!response.data.success) {
          throw new Error("Failed to fetch movie from database");
        }

        setMovie(response.data.movie);
        setDownloadOptions(response.data.movie.buttonUrlsAndTitles || []);

        // Fetch TMDb data with API key as query parameter
        const tmdbResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${response.data.movie.movieID}?api_key=${process.env.TMDB_API_KEY}`
        );

        setTmdbData(tmdbResponse.data);
      } catch (error) {
        setError(error.message || "Failed to load movie details");
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  // Loading state with skeleton UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-white">Loading movie details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <h1>Error</h1>
      </div>
    );
  }

  if (!movie || !tmdbData) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <h1>No movie details found</h1>
      </div>
    );
  }

  // Format release date
  const releaseDate = new Date(tmdbData.release_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <h2
        onClick={() => router.back()}
        className="z-20 back-button absolute top-5 left-5 text-white font-semibold text-lg bg-black bg-opacity-70 px-5 py-3 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-105 flex items-center justify-center gap-2"
      >
        <IoArrowBack className="text-white text-xl" />
        <span>Back</span>
      </h2>

      {/* Meta title */}

      {/* <Head>
        <title>{`${tmdbData.title} (${new Date(
          tmdbData.release_date
        ).getFullYear()}) - Movie Details`}</title>
        <meta name="description" content={tmdbData.overview} />
        <meta
          name="keywords"
          content={tmdbData.genres?.map((genre) => genre.name).join(", ")}
        />
      </Head> */}

      {/* Backdrop Header */}
      <div className="relative h-[60vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`}
          alt={tmdbData.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
          <div className="container mx-auto h-full flex items-end p-6">
            <div className="mb-6">
              <h1 className="text-4xl mb-[6.5rem] font-bold">
                {tmdbData.title}
              </h1>
              <p className="text-xl text-gray-300">{tmdbData.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`}
              alt={tmdbData.title}
              width={300}
              height={450}
              className="rounded-lg shadow-xl"
              priority
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400" />
                <span className="font-bold">
                  {tmdbData.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock />
                <span>{tmdbData.runtime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe2 />
                <span>{tmdbData.original_language.toUpperCase()}</span>
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-6">{tmdbData.overview}</p>

            {/* Movie Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Release Date</h3>
                <p className="text-gray-300">{releaseDate}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {tmdbData.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Production Companies */}
            {tmdbData.production_companies?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Production Companies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tmdbData.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="bg-gray-800 p-4 rounded-lg flex items-center gap-3"
                    >
                      {company.logo_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                          {company.name[0]}
                        </div>
                      )}
                      <span className="text-sm">{company.name}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-10">{movie.metaTitle}</p>
              </div>
            )}

            {/* Download Buttons */}
            <div className="p-10 text-center flex flex-col flex-wrap gap-4 mb-8">
              {downloadOptions.length > 0 ? (
                downloadOptions.map((option) => (
                  <Link
                    key={option.title}
                    href={option.url}
                    className="flex items-center text-center gap-2 bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg"
                  >
                    <Download size={20} />
                    {option.title || "Download"}
                  </Link>
                ))
              ) : (
                <p className="text-gray-300">No download options available</p>
              )}
            </div>

            <div className="flex justify-center text-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center gap-2 justify-center"
              >
                <FaTelegramPlane className="text-lg" /> Join Telegram
              </button>
            </div>

            {/* Notices and rules */}
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <div>
                <span className="font-medium">
                  Please Do Not Use VPN for Downloading Movies From Our Site.
                </span>
              </div>
            </div>

            <div
              className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
              role="alert"
            >
              <div>
                <span className="font-medium">
                  Click On The Above Download Button Download File.
                </span>
              </div>
            </div>

            <div
              className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
              role="alert"
            >
              <div>
                <span className="font-medium">
                  If You Find Any Broken Link Then Report To Us.
                </span>
              </div>
            </div>

            <div
              className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
              role="alert"
            >
              <div>
                <span className="font-medium">
                  Comment Your Queries And Requests Below In The Comment Box.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Related Movies */}
      <Suspense fallback={<div>Loading...</div>}>
          <ReletedMovies genre={tmdbData.genres} />
      </Suspense>
      {/* Contact us */}
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <Contactus />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};


