import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronUp, ChevronDown, X, BookOpen } from "lucide-react";
import useBooks from "../Hooks/useBooks";
import { BaseURL } from "../Utils/Constance";
import Spinner from "./Spinner";
import ModalManager from "../Modals/ModalManager";

const ReadingList = () => {
  // Add a loading state to track data fetching

  const books = useSelector((state) => state.booksdata.reading_list);
  const user = useSelector((state) => state.userdata.user_data);
  const dispatch = useDispatch();
  const { Get_Reading_list } = useBooks();

    const [isModal, setIsModal] = useState(false);
    const [data, setData] = useState(null);
    const [modalType, setModalType] = useState(null);
  
    const handleModals = (data, modalType) => {
      setIsModal(!isModal);
      if (data) {
        setData(data);
      }
      setModalType(modalType);
    };
  

  console.log(books, "books");
  useEffect(() => {
    Get_Reading_list(user?.id);
  }, []);

  
  // Function to move a book up in the list
  const moveBookUp = (index) => {
    if (index > 0) {
      dispatch({
        type: "REORDER_READING_LIST",
        payload: {
          oldIndex: index,
          newIndex: index - 1,
        },
      });
    }
  };

  // Function to move a book down in the list
  const moveBookDown = (index) => {
    if (index < books?.length - 1) {
      dispatch({
        type: "REORDER_READING_LIST",
        payload: {
          oldIndex: index,
          newIndex: index + 1,
        },
      });
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Reading List</h1>

      {!books || books.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book, index) => (
            <div
              key={book.book.id}
              className="flex bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              {/* Book cover image */}
              <div className="w-24 h-32 bg-gray-200 flex-shrink-0">
                {book.book.book_image ? (
                  <img
                    src={BaseURL + book.book.book_image}
                    alt={`${book.book.book_title} cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500 text-xs">No cover</span>
                  </div>
                )}
              </div>

              {/* Book details */}
              <div className="flex-grow p-4">
                <h3 className="font-bold text-lg">{book.book.book_title}</h3>
                <p className="text-sm text-gray-600">{book.book.author_name}</p>
                <p className="text-xs mt-1 inline-block px-2 py-1 bg-blue-300 rounded-full text-white">
                  {book.book.genre}
                </p>
                
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-between p-2 border-l border-gray-200">
                {/* Position controls */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => moveBookUp(index)}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                    disabled={index === 0}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => moveBookDown(index)}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                    disabled={index === books.length - 1}
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                {/* Book actions */}
                <div className="flex flex-col space-y-2 mt-auto">
                  <button
                    onClick={() => handleModals(book.book, "viewBook")}
                    className="p-1 rounded hover:bg-blue-100 text-blue-600"
                    title="View details"
                  >
                    <BookOpen size={16} />
                  </button>
                  <button
                    onClick={() => removeBook(book.book.id)}
                    className="p-1 rounded hover:bg-red-100 text-red-600"
                    title="Remove from list"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ModalManager
        data={data}
        modalType={modalType}
        isModal={isModal}
        onClose={handleModals}
      />
          </div>
  );
};

export default ReadingList;
