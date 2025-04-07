import React, { useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { BaseURL } from "../Utils/Constance";
import ModalManager from "../Modals/ModalManager";

const MyBooks = () => {
  const books = useSelector((state) => state.booksdata.books);
  const user = useSelector((state) => state.userdata.user_data);
  const mybooks = books.filter((book) => book.created_by === user.id);
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState(null);
  const [modalType, setModalType] = useState(null)

  const handleModals = (data,modalType) => {
    console.log('hello ')
    setIsModal(!isModal);
    if (data) {
      setData(data);
    }
    setModalType(modalType)

  };



  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Books</h1>

      {/* Books grid */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mybooks.map((book) => (
          <div
            key={book.id}
            onClick={() => handleModals(book,"viewBook")}
            className="relative cursor-pointer  rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl"
          >
            {/* Book cover */}
            <div className="h-64 bg-gray-200">
              <img
                src={BaseURL + book.book_image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{book.book_title}</h3>
              <p className="text-gray-600">{book.author_name}</p>
            </div>

            {/* Action buttons - only visible on hover */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <button
                // onClick={() => handleEdit(book.id)}
                className="p-2 cursor-pointer rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Edit size={20} />
              </button>
              <button
                // onClick={() => handleDelete(book.id)}
                className="p-2 cursor-pointer rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

        {/* Modal for viewing book details */}

      <ModalManager
        data={data}
        modalType={modalType}
        isModal={isModal}
        onClose={handleModals}
      />

      {/* Add book button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={()=>handleModals(null,"addBook")}
          className="p-4 rounded-full cursor-pointer bg-orange-400 text-white shadow-lg hover:bg-orange-500 transition-all duration-300 hover:shadow-xl"
        >
          <PlusCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default MyBooks;
