import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BaseURL } from "../Utils/Constance";
import { useSelector } from "react-redux";
import useBooks from "../Hooks/useBooks";

const ViewBook = ({ data, isModal, onClose }) => {
  if (!isModal) return null;
  const [book, setBook] = useState(data);
  const user = useSelector((state)=> state.userdata.user_data)
  const {addReadingListAxios} = useBooks()

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            No Book Selected
          </h2>
          <p className="mt-2 text-gray-600">
            Please select a book to view details.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToReadList = () => {

    const data ={
      user_id:user.id,
      book_id:book.id   }

    addReadingListAxios(data)


  };

  return (
<div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
<div className="bg-white bg-opacity-90 rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Modal Header with Genre and Close Button */}
        <div className="bg-orange-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">{book.genre}</h3>
          <button
            onClick={onClose}
            className="text-white cursor-pointer hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Book Cover */}
          <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-6">
            {book.book_image ? (
              <img
                src={BaseURL + book.book_image}
                alt={`Cover of ${book.book_title}`}
                className="w-full h-64 object-cover rounded-md shadow"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {book.book_title}
            </h1>
            <p className="mt-2 text-lg text-gray-600">by {book.author_name}</p>

            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                About this book
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {book.book_description}
              </p>
            </div>

            {/* Add to Read List Button */}
            <div className="mt-8">
              <button
                onClick={handleAddToReadList}
                className="px-4 py-2 cursor-pointer rounded-lg text-white font-medium transition-colors bg-orange-400 hover:bg-orange-500">
                Add to Read List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;