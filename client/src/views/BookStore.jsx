import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'AIzaSyCmGwif2dxpwpdsw7q3u-34H169EBeAIIA'; // Use environment variable for API key

const FetchAllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of books per page

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                const startIndex = (currentPage - 1) * pageSize;
                const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                    params: {
                        key: apiKey,
                        q: 'love',
                        startIndex,
                        maxResults: pageSize,
                    },
                });

                const { items } = response.data;
                setBooks(items || []);
            } catch (error) {
                setError(error.response?.data?.error?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    if (loading) {
        return <p className="text-center text-blue-500">Loading books...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error loading books: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold underline text-blue-500 mb-4 text-center">Available Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-md hover:shadow-lg">
                        {book.volumeInfo.imageLinks?.thumbnail ? (
                            <img
                                src={book.volumeInfo.imageLinks.thumbnail}
                                alt={book.volumeInfo.title}
                                className="w-full h-48 object-cover mb-4"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                                <span className="text-gray-500">No Image Available</span>
                            </div>
                        )}
                        <h3 className="text-lg font-semibold mb-2">{book.volumeInfo.title}</h3>
                        <p className="text-sm text-gray-700 mb-2">
                            {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            {book.volumeInfo.description?.substring(0, 100) || 'No description available.'}...
                        </p>
                        <a
                            href={book.volumeInfo.infoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            More Info
                        </a>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">Page {currentPage}</span>
                <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FetchAllBooks;