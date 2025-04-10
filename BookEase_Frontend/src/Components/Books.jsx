import React, { useState } from 'react';
import { BaseURL } from '../Utils/Constance';
import { useNavigate } from 'react-router-dom';
import ModalManager from '../Modals/ModalManager';
import useBooks from '../Hooks/useBooks';
import { useSelector } from 'react-redux';

const Books = React.memo(({ books }) => {
  
  const [isModal, setIsModal] = useState(false)
  const [data,setData] = useState(null)
  const {addReadingListAxios} = useBooks()
  const user = useSelector((state)=>state.userdata.user_data)

  if (!books || books.length === 0) {
    return <div className="text-center p-8">No books available</div>;
  }
  
  const handleViewBook = (book)=>{
    setIsModal(!isModal)
    if(book){
      setData(book)
    }
  }
  
  const handleAddList=(book)=>{
    
    const data = {book_id:book,user_id:user.id}
    addReadingListAxios(data)
  }


  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <div 
            key={book.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={BaseURL + book.book_image || "/api/placeholder/200/300"} 
                alt={book.book_title}
                className="w-full h-full object-cover"
              />
              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-transparent bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="bg-orange-400 hover:bg-orange-500 font-semibold cursor-pointer text-white py-2 px-2 rounded-md transition-colors"
                  onClick={()=> handleAddList(book.id)}
                >
                  Add to Read List
                </button>
                <button 
                  className="bg-gray-200 font-semibold cursor-pointer hover:bg-gray-300 text-gray-800 py-2 px-2 rounded-md transition-colors"
                  onClick={() => handleViewBook(book)}
                >
                  View
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{book.book_title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author_name}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {book.genre}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ModalManager
      data = {data}
      modalType={"viewBook"}
      isModal={isModal}
      onClose={handleViewBook}
       />
    </div>
  );
});

export default Books;