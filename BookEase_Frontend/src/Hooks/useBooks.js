import React from "react";
import UserAxios from "../Axios/UserAxios";
import { BookManagement_Url, ReadingList_Url } from "../Utils/Constance";
import { useDispatch } from "react-redux";
import { addBooks, addNewBooks, addReadingList, DeleteBooks, RemoveReadingList } from "../Redux/BooksSlice";
import { toast } from "sonner";

const useBooks = () => {
  const dispatch = useDispatch();
  const Get_Books = async () => {
    try {
      const response = await UserAxios.get(BookManagement_Url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        dispatch(addBooks(response.data));
      }
    } catch (error) {
      console.error(error, "get books error");
    }
  };

  const Add_BookAxios = async (data) => {
    try {
      const response = await UserAxios.post(BookManagement_Url, data, {
        headers: {
          "Content-Type": "Multipart/form-data",
        },
      });
      if (response.status === 201) {
        console.log(response.data, "add book response");
        dispatch(addNewBooks(response.data.data));
        toast.success("Book added successfully");
      }
    } catch (error) {
      console.error(error, "add books error");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else if (error.response?.status === 400) {
        toast.warning("Something went wrong. Please try again");
      }
    }
  };

  const Delete_BookAxios = async (data) => {

    try {
      const response = await UserAxios.delete(BookManagement_Url, {
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        dispatch(DeleteBooks(data.id));
        toast.success("Book deleted successfully");
      }
    } catch (error) {
      console.error(error, "delete books error");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else if (error.response?.status === 400) {
        toast.warning("Something went wrong. Please try again");
      }
      if (error.response?.status === 404) {
        toast.warning("Book not found. Please try again");
      }
    }

  };
  const Update_BookAxios = async (data) => {
    try {
      const response = await UserAxios.put(BookManagement_Url, data, {
        headers: {
          "Content-Type": "Multipart/form-data",
        },
      });
      if (response.status === 200) {
        console.log(response.data, "update book response");
        Get_Books();
        toast.success("Book updated successfully");
      }
    } catch (error) {
      console.error(error, "update books error");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.warning("Something went wrong. Please try again");
      }
    }
  };

  const Get_Reading_list = async (data)=>{

    try{

        const response = await UserAxios.get(ReadingList_Url,{

            params : {'id': data},
            headers:{
                'Content-Type': 'application/json'
            }
        }
    )
    if(response.status === 200){
        dispatch(addReadingList(response.data))
    }

    }catch(error){
        console.error(error,'get reading list error');
        if(error.response?.status === 401){
            toast.error("Unauthorized access. Please log in again.");
        }

        toast.warning('Something went wrong. Please try again')
    }
  }

  const addReadingListAxios = async(data)=>{


    try{
        const response = await UserAxios.post(ReadingList_Url,data,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(response.status === 200){
            
            toast.success("Book added to reading list successfully")
        }

    }catch(error){
        console.log(error,'error add reading list axios')
        
        if(error.response?.status === 401){
            toast.error("Unauthorized access. Please log in again.");
        }
        if (error.response?.status=== 400){
            const errorMessage = error.response.data?.error?  "This book is already in your reading list.": "Something went wrong. Please try again" ;
            toast.warning(errorMessage)

        }
        
    }
  }

  const RemoveReadingList_Axios = async (data)=>{

    try {
      const response = await UserAxios.delete(ReadingList_Url, {
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        dispatch(RemoveReadingList(data.book_id));
        toast.success("Book Remove successfully");
      }
    } catch (error) {
      console.error(error, "delete books error");

      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else if (error.response?.status === 400) {
        toast.warning("Something went wrong. Please try again");
      }
      if (error.response?.status === 404) {
        toast.warning("Book not found. Please try again");
      }
    }
  }
   
  const Update_Position = async (data)=>{

    try{
        const response = await UserAxios.put(ReadingList_Url,data,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(response.status === 200){
              
            Get_Reading_list(data[0].user_id)
        }
    }catch(error){
       
        if(error.response?.status === 401){
            toast.error("Unauthorized access. Please log in again.");
        }
        if (error.response?.status=== 400){
            toast.warning("Something went wrong. Please try again")
        }
    }
  }
  return { Get_Books, Add_BookAxios, Delete_BookAxios,Update_BookAxios,Get_Reading_list,addReadingListAxios,RemoveReadingList_Axios,Update_Position};
};

export default useBooks;
