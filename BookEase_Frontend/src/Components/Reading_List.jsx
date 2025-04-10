import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, BookOpen, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useBooks from "../Hooks/useBooks";
import { BaseURL } from "../Utils/Constance";
import Spinner from "./Spinner";
import ModalManager from "../Modals/ModalManager";

// Sortable book item component
const SortableBookItem = ({ book, index, user, handleModals }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: book.book.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-grab ${
        isDragging ? "bg-blue-50 shadow-lg" : ""
      }`}
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
      <div className="flex flex-col justify-end p-2 border-l border-gray-200">
        <div className="flex flex-col space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleModals(book.book, "viewBook");
            }}
            className="p-1 rounded cursor-pointer hover:bg-blue-100 text-blue-600"
            title="View details"
          >
            <BookOpen size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag when clicking buttons
              handleModals({id: book.book.id, user_id: user.id, book_title: book.book.book_title}, "RemoveBook");
            }}
            className="p-1 cursor-pointer rounded hover:bg-red-100 text-red-600"
            title="Remove from list"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReadingList = () => {
  const books = useSelector((state) => state.booksdata.reading_list);
  const user = useSelector((state) => state.userdata.user_data);
  const { Get_Reading_list,Update_Position } = useBooks();

  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {

    Get_Reading_list(user?.id);

  }, []);

  // Define sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleModals = (data, modalType) => {

    setIsModal(!isModal);
    if (data) {
      setData(data);
    }
    setModalType(modalType);
  };



  // Handle the end of drag operation
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }
  
    // Find the indices of the dragged and target items
    const oldIndex = books.findIndex((book) => book.book.id === active.id);
    const newIndex = books.findIndex((book) => book.book.id === over.id);
  
    // Create a new array with the updated order (for local state management)
    const updatedBooks = arrayMove([...books], oldIndex, newIndex);
  
    // Only collect the affected items that changed position
    const affectedBooks = [];
    
    // Moving down: update positions for items between oldIndex and newIndex (inclusive)
    if (oldIndex < newIndex) {
      for (let i = oldIndex; i <= newIndex; i++) {
        affectedBooks.push({
          book_id: updatedBooks[i].book.id,
          position: i + 1, // +1 because positions are typically 1-indexed
          user_id: user.id
        });
      }
    } 
    // Moving up: update positions for items between newIndex and oldIndex (inclusive)
    else {
      for (let i = newIndex; i <= oldIndex; i++) {
        affectedBooks.push({
          book_id: updatedBooks[i].book.id,
          position: i + 1, // +1 because positions are typically 1-indexed
          user_id: user.id
        });
      }
    }
  
    Update_Position(affectedBooks)
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Reading List</h1>

      {!books || books.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={books.map(book => book.book.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {books.map((book, index) => (
                <SortableBookItem
                  key={book.book.id}
                  book={book}
                  index={index}
                  user={user}
                  handleModals={handleModals}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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