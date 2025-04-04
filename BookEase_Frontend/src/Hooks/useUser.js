import React from 'react'
import UserAxios from '../Axios/UserAxios'
import { useDispatch } from 'react-redux'
import { Get_User_Url } from '../Utils/Constance'
import { setUserData } from '../Redux/UserSlice'

const useUser = () => {

 const dispatch = useDispatch()
  const Get_User = async(user_id)=>{
    try{
       
        const response = await UserAxios.get(Get_User_Url,{
          params:{'id' :user_id},
          headers:{
            "Content-Type" : "application/json",
          }
        })
        if(response.status === 200){
          
          dispatch(setUserData(response.data))

        }
    }catch(error){

        console.error(error, "get user error");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.error("Something went wrong. Please log in again.");
      }
    }
  }
  return {Get_User}
}

export default useUser