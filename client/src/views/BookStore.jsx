import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const apiKey = 'AIzaSyD6XcEz6p-l-PFH4AprQnQ2rNRTOXkU1qY'; // Use environment variable for API key
const pageSize = 10; // Number of books per fetch
const visibleCards = 5; // Number of cards to show at once

const FetchAllBooks = () => {
    const [categories, setCategories] = useState({
        Novels: [],
        Biography: [],
        Fictions: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndexes, setCurrentIndexes] = useState({
        Novels: 0,
        Biography: 0,
        Fictions: 0,
    });

    useEffect(() => {
        const fetchBooksByCategory = async (category) => {
            try {
                const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                    params: {
                        key: apiKey,
                        q: category,
                        maxResults: pageSize,
                    },
                });
                return response.data.items || [];
            } catch (error) {
                throw new Error(error.response?.data?.error?.message || error.message);
            }
        };

        const fetchAllCategories = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await Promise.all([
                    fetchBooksByCategory('Novels'),
                    fetchBooksByCategory('Biography'),
                    fetchBooksByCategory('Fictions'),
                ]);

                setCategories({
                    Novels: results[0],
                    Biography: results[1],
                    Fictions: results[2],
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCategories();
    }, []);

    const handleNext = (category) => {
        setCurrentIndexes((prev) => ({
            ...prev,
            [category]: prev[category] + 1,
        }));
    };

    const handlePrevious = (category) => {
        setCurrentIndexes((prev) => ({
            ...prev,
            [category]: prev[category] - 1,
        }));
    };

    const renderCategory = (categoryName, books) => {
        const currentIndex = currentIndexes[categoryName];

        return (
            <div className="mb-10">
                
                <h2 className="text-xl font-bold mb-4 mt-7">{categoryName}</h2>
                <div className="flex justify-between items-center">
                    {/* Previous button */}
                    <button
                        onClick={() => handlePrevious(categoryName)}
                        className={`mr-2 px-4 py-4 rounded-full flex items-center justify-center ${
                            currentIndex === 0 ? 'bg-gray-200' : 'bg-[#ed8770] text-white'
                        }`}
                        disabled={currentIndex === 0}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    </button>

                    {/* Scrollable Book Container */}
                    <div className="relative w-full overflow-x-auto md:overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
                        >
                            {books.map((book, index) => (
                                <div
                                    key={index}
                                    className="h-full flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 border rounded-lg shadow-md hover:shadow-lg bg-white flex flex-col justify-between"
                                >
                                    {/* Image Section */}
                                    {book.volumeInfo.imageLinks?.thumbnail ? (
                                        <img
                                            src={book.volumeInfo.imageLinks.thumbnail}
                                            alt={book.volumeInfo.title}
                                            className="w-full h-96 object-cover mb-4 rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center mb-4 rounded-lg">
                                            <span className="text-gray-500">No Image Available</span>
                                        </div>
                                    )}

                                    {/* Content Section */}
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{book.volumeInfo.title}</h3>
                                        <p className="text-sm text-gray-700 mb-4 line-clamp-1">
                                            {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                                        </p>
                                    </div>

                                    {/* Link Section */}
                                    <a
                                        href={book.volumeInfo.infoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline text-sm mt-auto"
                                    >
                                        More Info
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={() => handleNext(categoryName)}
                        className={`ml-2 px-4 py-4 rounded-full flex items-center justify-center ${
                            currentIndex + visibleCards >= books.length
                                ? 'bg-gray-200'
                                : 'bg-[#ed8770] text-white'
                        }`}
                        disabled={currentIndex + visibleCards >= books.length}
                    >
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                    </button>
                </div>
            </div>
            
        );
    };

    if (loading) {
        return <p className="text-center text-blue-500">Loading books...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading books: {error}</p>;
    }

    return (
        <div>
            <div className="w-full z-10 md:fixed"><Header /></div> 
                <div className="bg-[#e3ded4] min-h-screen pt-5">
                    <div className="container mx-auto md:mt-48 p-4">
                        <div className="flex flex-col md:flex-row gap-8 justify-between py-5 px-14">
                            <div className='w-[48rem] flex'>
                            {/* First Section */}
                            <div className=" rounded-md p-6">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2 ">What are the books?</h1>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                Books are collections of written, printed, or digital content that convey information, stories, ideas, or knowledge. 
                                They come in various formats, such as novels, textbooks, biographies, poetry, and more, serving as tools for education,
                                entertainment, and self-improvement
                                </p>
                            </div>
                            {/* Second Section */}
                            <div className="rounded-md p-6">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">Why we need to read?</h1>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                Reading helps you learn, grow, and relax. Choose books based on your interests: nonfiction for 
                                knowledge, fiction for entertainment, self-help for growth, and fantasy or mysteries for fun.
                                </p>
                            </div>
                            </div>
                            <div className="grid grid-cols-3 gap-1 gap-x-4">
                                {Object.values(categories)
                                    .flat() // Flatten all books into a single array
                                    .filter((book) => book.volumeInfo.imageLinks?.smallThumbnail) // Only include books with images
                                    .sort(() => Math.random() - 0.5) // Shuffle the books randomly
                                    .slice(0, 6) // Take only 15 books
                                    .map((book, index) => (
                                        <div 
                                            key={index} 
                                            className=""
                                        >
                                            <img
                                                src={book.volumeInfo.imageLinks.smallThumbnail}
                                                alt={book.volumeInfo.title}
                                                className="w-20 h-32 object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className='px-20 w-[48rem]'>
                            <h1 className='text-2xl font-bold text-gray-800 mb-2'>In our store,</h1>
                                we provide a wide range of books across various genres, 
                                including fiction, non-fiction, academic, and self-help, catering to readers of 
                                all interests and ages.
                        </div>
                        {Object.entries(categories).slice(0, 15).map(([categoryName, books]) => (
                        renderCategory(categoryName, books)
                    ))}

                    {/* Tailwind CSS grid for links */}
                    <div className="flex justify-between mt-5 px-[4rem]">
                        {/* Left Side: Category Links */}
                        <div className="w-auto">
                            <div className="grid grid-cols-3 gap-10 gap-x-44">
                                {[
                                    'Art', 'Adventure', 'Biography', 'Fantasy', 'Horror',
                                    'Music', 'Mystery', 'Poetry', 'Romance', 'Science',
                                    'Self-help', 'Technology', 'Thriller', 'History','Comedy',
                                ]
                                    .sort()
                                    .map((category, index) => (
                                        <a 
                                            key={index} 
                                            href="#" 
                                            className="text-[#ed8770] font-medium text-lg hover:underline block"
                                        >
                                            {category}
                                        </a>
                                    ))}
                            </div>
                        </div>

                        {/* Center Space: Random Book Images Grid */}
                        <div className="">
                            <div className="grid grid-cols-3 gap-1 gap-x-4">
                                {Object.values(categories)
                                    .flat() // Flatten all books into a single array
                                    .filter((book) => book.volumeInfo.imageLinks?.smallThumbnail) // Only include books with images
                                    .sort(() => Math.random() - 0.5) // Shuffle the books randomly
                                    .slice(0, 12) // Take only 15 books
                                    .map((book, index) => (
                                        <div 
                                            key={index} 
                                            className=""
                                        >
                                            <img
                                                src={book.volumeInfo.imageLinks.smallThumbnail}
                                                alt={book.volumeInfo.title}
                                                className="w-20 h-32 object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <div><Footer></Footer></div>
        </div>

    );
};

export default FetchAllBooks;
