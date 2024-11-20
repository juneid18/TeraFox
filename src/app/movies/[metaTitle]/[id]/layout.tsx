import { Metadata } from 'next';
import axios from 'axios';

// Define the Movie type
interface Movie {
  title: string;
  release_date: string;
  overview: string;
  genres?: { name: string }[];
  poster_path?: string;
  metatitle?: string;
}

// Define API response types
interface ApiResponse {
  success: boolean;
  movie: {
    movieID: string;
    metaTitle: string;
  };
}

interface TmdbResponse {
  title: string;
  overview: string;
  release_date: string;
  genres: { name: string }[];
  poster_path: string;
}

// Function to fetch movie data
async function getMovie(id: string): Promise<Movie> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const response = await axios.post<ApiResponse>(`${baseUrl}/api/FetchbyID`, { id });
    if (!response.data.success) throw new Error('Failed to fetch movie from database');

    const tmdbResponse = await axios.get<TmdbResponse>(
      `https://api.themoviedb.org/3/movie/${response.data.movie.movieID}?api_key=${process.env.TMDB_API_KEY}`
    );

    return {
      title: response.data.movie.metaTitle || tmdbResponse.data.title,
      release_date: tmdbResponse.data.release_date,
      overview: tmdbResponse.data.overview,
      genres: tmdbResponse.data.genres,
      poster_path: tmdbResponse.data.poster_path,
      metatitle: response.data.movie.metaTitle,
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return {
      title: 'Movie Not Found',
      release_date: new Date().toISOString(),
      overview: 'Movie details not available',
      genres: [],
      metatitle: 'Movie Not Found',
    };
  }
}

export async function generateMetadata({ params }: { params: { id: string; metaTitle: string } }): Promise<Metadata> {
  try {
    const movie = await getMovie(params.id);

    return {
      title: movie.metatitle || movie.title,
      description: movie.overview,
      keywords: movie.genres?.map((genre) => genre.name).join(', '),
      openGraph: {
        title: movie.metatitle || movie.title,
        description: movie.overview,
        images: movie.poster_path ? [`https://image.tmdb.org/t/p/original${movie.poster_path}`] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: movie.metatitle || movie.title,
        description: movie.overview,
        images: movie.poster_path ? [`https://image.tmdb.org/t/p/original${movie.poster_path}`] : [],
      },
      alternates: {
        canonical: `/movies/${params.metaTitle}/${params.id}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Movie Details',
      description: 'Movie information not available',
    };
  }
}

export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
