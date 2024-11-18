import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function Sidebar({ filters, setFilters }) {
  // Map genre names to their respective IDs
  const genreMapping = {
    action: "27", // Action
    comedy: "35", // Comedy
    drama: "18",  // Drama
    horror: "27", // Horror
    thriller: "53", // Thriller
    romance: "10749", // Romance
    animation: "16", // Animation
    adventure: "12", // Adventure
    sciFi: "878", // Sci-Fi
    fantasy: "14", // Fantasy
    mystery: "9648", // Mystery
    crime: "80", // Crime
    documentary: "99", // Documentary
    family: "10751", // Family
    music: "10402", // Music
    history: "36", // History
    war: "10752", // War
    western: "37", // Western
    TVMovie: "10770", // TV Movie
    foreign: "10769", // Foreign
    musical: "10402", // Musical
    talkShow: "10767" // Talk Show
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(true);

  return (
    <>
      <button
        className="md:hidden p-2 bg-gray-700 text-white rounded mb-4"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        Filter
      </button>

      <aside
        className={`bg-gray-800 p-4 rounded-lg shadow-md w-full md:w-64 ${sidebarOpen ? "block" : "hidden"} md:block`}
      >
        <h2 className="text-xl font-semibold mb-6">Filter by</h2>

        {/* Genre Filter Section */}
        <div className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setGenresOpen(!genresOpen)}
          >
            <h3 className="font-bold text-white">Genres</h3>
            {genresOpen ? (
              <FiChevronDown className="text-gray-400" />
            ) : (
              <FiChevronRight className="text-gray-400" />
            )}
          </div>
          {genresOpen && (
            <ul className="mt-2">
              {Object.keys(genreMapping).map((genre) => (
                <li key={genre} className="mt-1">
                  <Link
                    href={`/genres/${genreMapping[genre]}`}  // Link to genre page using ID
                    className="text-gray-400 hover:text-white block w-full text-left py-1 px-2 rounded transition duration-200"
                  >
                    {genre.toUpperCase()} {/* Display genre name and ID */}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
