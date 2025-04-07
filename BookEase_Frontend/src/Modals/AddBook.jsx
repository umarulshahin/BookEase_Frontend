import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import useBooks from "../Hooks/useBooks";

const AddBook = ({ isModal, onClose }) => {
  const fileInputRef = useRef(null);

  if (!isModal) return null;
  
  const user = useSelector((state)=>state.userdata.user_data)
  const {Add_BookAxios} = useBooks()

  const GENRE_CHOICES = [
    { value: "fiction", label: "Fiction" },
    { value: "non_fiction", label: "Non-Fiction" },
    { value: "romance", label: "Romance" },
    { value: "fantasy", label: "Fantasy" },
    { value: "mystery", label: "Mystery" },
    { value: "thriller", label: "Thriller" },
    { value: "science_fiction", label: "Science Fiction" },
    { value: "historical", label: "Historical" },
    { value: "biography", label: "Biography" },
    { value: "self_help", label: "Self Help" },
    { value: "horror", label: "Horror" },
    { value: "poetry", label: "Poetry" },
    { value: "adventure", label: "Adventure" },
    { value: "young_adult", label: "Young Adult" },
    { value: "children", label: "Children" },
    { value: "drama", label: "Drama" },
  ];


  const namePattern = /^(?!\s+$)[A-Za-z][A-Za-z0-9_ ]{2,}$/;

  const validationSchema = Yup.object({
    book_title: Yup.string()
      .required("Book title is required")
      .max(100, "Title cannot exceed 100 characters")
      .matches(
        namePattern,
        "Invalid Book Name. Book Name must contain at least 3 characters and must start with a letter"
      ),
    author_name: Yup.string()
      .required("Author name is required")
      .max(100, "Author name cannot exceed 100 characters")
      .matches(
        namePattern,
        "Invalid Author Name. Author Name must contain at least 3 characters and must start with a letter"
      ),
    book_description: Yup.string().matches(namePattern, "Invalid Book Description").required("Book description is required"),
    genre: Yup.string().required("Genre is required"),
    book_image: Yup.mixed().required("Book cover image is required"),
  });

  // Initial form values
  const initialValues = {
    book_title: "",
    author_name: "",
    book_description: "",
    genre: "",
    book_image: null,
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {

    console.log("Form values:", values);
    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("book_title", values.book_title);
    formData.append("author_name", values.author_name);
    formData.append("book_description", values.book_description);
    formData.append("genre", values.genre);
    formData.append("book_image", values.book_image);
    formData.append('created_by',user.id)

    // Call the API to add the book
    Add_BookAxios(formData)

    setSubmitting(false);
    resetForm();
    onClose();
  };

  // Prevent modal click from closing
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
<div className="fixed inset-0 bg-whilte/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>

<div
  className="bg-white rounded-lg shadow-xl w-full max-w-md"
  onClick={stopPropagation}
>
  {/* Modal Header */}
  <div className="flex justify-between items-center w-full bg-orange-400 text-white px-6 py-3 rounded-t-lg">
    <h2 className="text-xl font-bold">Add New Book</h2>
    <button onClick={onClose} className="hover:text-gray-700">
      <X size={24} />
    </button>
  </div>

  {/* Formik Form */}
  <div className="px-6 py-4">

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              {/* Book Title */}
              <div>
                <label
                  htmlFor="book_title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Book Title
                </label>
                <Field
                  type="text"
                  name="book_title"
                  id="book_title"
                  className={`w-full p-2 border  focus:outline-gray-300  rounded-md ${
                    errors.book_title && touched.book_title
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="book_title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Author Name */}
              <div>
                <label
                  htmlFor="author_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author Name
                </label>
                <Field
                  type="text"
                  name="author_name"
                  id="author_name"
                  className={`w-full p-2 border  focus:outline-gray-300 rounded-md ${
                    errors.author_name && touched.author_name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="author_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Book Description */}
              <div>
                <label
                  htmlFor="book_description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Book Description
                </label>
                <Field
                  as="textarea"
                  name="book_description"
                  id="book_description"
                  rows="4"
                  className={`w-full p-2 border  focus:outline-gray-300 rounded-md ${
                    errors.book_description && touched.book_description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="book_description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Genre Selection */}
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Genre
                </label>
                <Field
                  as="select"
                  name="genre"
                  id="genre"
                  className={`w-full p-2 border  focus:outline-gray-300   rounded-md ${
                    errors.genre && touched.genre
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Genre</option>
                  {GENRE_CHOICES.map((genre) => (
                    <option key={genre.value} value={genre.value}>
                      {genre.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="genre"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Book Image Upload */}
              <div>
                <label
                  htmlFor="book_image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Book Cover Image
                </label>
                <input
                  type="file"
                  id="book_image"
                  name="book_image"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    setFieldValue("book_image", event.currentTarget.files[0]);
                  }}
                />
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2   bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Choose File
                  </button>
                  <span className="ml-3 text-sm text-gray-500">
                    {errors.book_image && touched.book_image ? (
                      <span className="text-red-500">
                        Please select an image
                      </span>
                    ) : (
                      fileInputRef.current?.files?.[0]?.name || "No file chosen"
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="book_image"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-orange-400 cursor-pointer text-white rounded-md hover:bg-orange-500 transition-colors disabled:bg-orange-300"
                >
                  {isSubmitting ? "Adding..." : "Add Book"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>

  );
};

export default AddBook;
