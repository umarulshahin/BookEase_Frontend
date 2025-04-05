import React from 'react'
import UserAxios from '../Axios/UserAxios'
import { useDispatch } from 'react-redux'
import { Get_User_Url, Update_User_Url } from '../Utils/Constance'
import { setUserData } from '../Redux/UserSlice'
import { toast } from 'sonner'

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

  const Update_UserAxios = async (data)=>{
    try{
      
      const response = await UserAxios.patch(Update_User_Url,data,{
        headers:{
          "Content-Type" : "application/json",
        }
      })
      if (response.status === 200){
        console.log(response.data, "update user ")
        dispatch(setUserData(response.data?.data))
        toast.success("User details updated successfully.")
      }
    }catch(error){
      console.error(error, "update user error");
      if (error.response?.status === 401){
         toast.error("Unauthorized access. Please log in again.");

      }else if (error.response?.status === 400){

        const errorMessage = error.response.data?.username? "Username already exists." :
                       error.response.data?.email? "Email already exists." :
                       "Something went wrong. Please try again"
        toast.warning(errorMessage)
        
      }
    }
  }
  return {Get_User,Update_UserAxios}
}

export default useUser