import React from 'react'
import UserAxios from '../Axios/UserAxios';
import { BookManagement_Url } from '../Utils/Constance';
import { useDispatch } from 'react-redux';
import { addBooks } from '../Redux/BooksSlice';

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

    return {Get_Books}
}


export default useBooks