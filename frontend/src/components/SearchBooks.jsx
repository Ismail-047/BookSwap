import React, { useState } from "react";
import useBookStore from "../zustand/book.store";

const SearchBooks = () => {
  const { allBooks, setSearchResults } = useBookStore();

  const [filters, setFilters] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredBooks = allBooks.filter((book) => {
      const matchesTitle = book.title?.toLowerCase().includes(filters.title.toLowerCase());
      const matchesAuthor = book.author?.toLowerCase().includes(filters.author.toLowerCase());
      const matchesGenre = filters.genre ? book.genre?.toUpperCase() === filters.genre : true;
      const matchesLocation = book.location?.toLowerCase().includes(filters.location.toLowerCase());

      return matchesTitle && matchesAuthor && matchesGenre && matchesLocation;
    });

    setSearchResults(filteredBooks);
  };

  const handleReset = () => {
    const resetFilters = {
      title: "",
      author: "",
      genre: "",
      location: "",
    };
    setFilters(resetFilters);
    setSearchResults([]);
  };

  const genreOptions = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Technology",
    "Science",
    "Poetry",
    "Other",
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg rounded-xl p-6 mb-6 border border-indigo-100">
      <h3 className="text-xl font-semibold text-indigo-600 mb-5 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
        </svg>
        Search Books
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-indigo-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={filters.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="outline-none w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-indigo-700 mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={filters.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="outline-none w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-indigo-700 mb-1">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={handleChange}
              className="outline-none w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white transition duration-150"
            >
              <option value="">All Genres</option>
              {genreOptions.map((genre) => (
                <option key={genre} value={genre?.toUpperCase()}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-indigo-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="outline-none w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition duration-150"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition duration-150"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBooks;