import React from 'react'
import UserAxios from '../Axios/UserAxios';
import { BookManagement_Url } from '../Utils/Constance';
import { useDispatch } from 'react-redux';
import { addBooks, addNewBooks, DeleteBooks } from '../Redux/BooksSlice';
import { toast } from 'sonner';

const useBooks = () => {
   
    const dispatch = useDispatch()
    const Get_Books = async() =>{
        
        try{
            const response = await UserAxios.get(BookManagement_Url,{
                headers:{
                    "Content-Type" : "application/json",
                }
            })
            
            if(response.status === 200){
                dispatch(addBooks(response.data))
            }
        }catch(error){
            console.error(error, "get books error");
        }
    }
    
    const Add_BookAxios = async (data)=>{
        try{
            const response = await UserAxios.post(BookManagement_Url,data,{
                headers:{
                    "Content-Type" : "Multipart/form-data"
                }
            })
            if (response.status === 201){
                console.log(response.data, "add book response")
                dispatch(addNewBooks(response.data.data))
                toast.success("Book added successfully")
            }
        }catch(error){
            console.error(error, "add books error")
            if (error.response?.status === 401){
                toast.error("Unauthorized access. Please log in again.");
       
             }else if (error.response?.status === 400){
       
                toast.warning("Something went wrong. Please try again")

             }
    }
}

const Delete_BookAxios = async (data)=>{
    
    console.log(data, "delete book data")
    try{
        const response = await UserAxios.delete(BookManagement_Url,{
            data :data,
            headers:{
                "Content-Type" : "application/json",
            }
        })
        if (response.status === 200){
            dispatch(DeleteBooks(data.id))
            toast.success("Book deleted successfully")
        }
    }catch(error){
      console.error(error, "delete books error")
      if (error.response?.status === 401){
        toast.error("Unauthorized access. Please log in again.");
       
       }else if (error.response?.status === 400){

        toast.warning("Something went wrong. Please try again")

       }
      if (error.response?.status === 404){
        toast.warning("Book not found. Please try again")
       }
    }
}
    return {Get_Books,Add_BookAxios,Delete_BookAxios}
}


export default useBooks