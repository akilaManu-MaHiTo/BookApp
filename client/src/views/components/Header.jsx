import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import Loader from './Sloader'; // Add your Loader component here

const apiKey = 'AIzaSyD6XcEz6p-l-PFH4AprQnQ2rNRTOXkU1qY';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  // Fetch books based on the search query
  useEffect(() => {
    const fetchBooks = async (query) => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            key: apiKey,
            q: query,
            maxResults: 10,
          },
        });
        setSearchResults(response.data.items || []);
      } catch (error) {
        console.error('Error fetching books:', error.response?.data?.error?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchBooks(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Show dropdown when input is focused
  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  // Hide dropdown when input loses focus
  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 100); // Delay to allow dropdown to close
  };

  // Close dropdown when clicked outside of the input field
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-[#e3ded4] p-4 pt-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo Section */}
        <div className="flex items-center justify-center md:justify-start">
          <img src="readnest.png" alt="Bookstore Logo" className="h-24 md:h-32" />
          <h1 className="text-xl md:text-2xl text-[#ed8770] font-bold ml-4">ReadNest</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow flex flex-col relative">
          <div className="flex items-center bg-white border-black border mx-5 rounded-full shadow-sm overflow-hidden w-full md:w-auto">
            <FontAwesomeIcon icon={faSearch} className="text-[#ed8770] ml-4" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search books, authors, genres..."
              className="w-full h-12 px-4 focus:outline-none"
            />
            {isLoading && (
              <div className=''><Loader/></div>
            )}
          </div>
          {/* Search Results Dropdown */}
          {isDropdownVisible && searchResults.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 shadow-lg rounded-[0.9rem] mt-14 w-full max-h-64 overflow-y-auto">
              {searchResults.map((book) => (
                <li key={book.id} className="flex items-center px-4 py-2 border-b hover:bg-gray-100">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'default-image-placeholder.jpg'} // Fallback image
                    alt={book.volumeInfo.title}
                    className="h-20 w-12 mr-4"
                  />
                  <div>
                    <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                      <p className="text-sm font-medium">
                        {book.volumeInfo.title} - {book.volumeInfo.authors?.join(', ')}
                      </p>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Authentication Section */}
        <div className="flex flex-col items-center md:items-end space-y-2 w-full md:w-auto">
          <button className="w-full md:w-auto px-6 py-2 text-black bg-[#f7d89e] border border-white rounded-full hover:bg-[#e6c18c]">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Continue with Gmail
          </button>
          <button className="w-full md:w-auto px-6 py-2 text-white bg-black border border-white rounded-full hover:bg-gray-800">
            <FontAwesomeIcon icon={faApple} className="mr-2" />
            Continue with Apple
          </button>
          <button className="w-full md:w-auto px-6 py-2 text-white bg-[#ef6d51] border border-white rounded-full hover:bg-[#d95a42]">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Sign Up with Email
          </button>
          <p className="text-sm">
            Already a member?{' '}
            <a href="#" className="underline hover:text-gray-200 text-[#ed8770] font-bold">
              Login
            </a>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
