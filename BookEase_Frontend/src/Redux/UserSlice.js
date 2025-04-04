import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: "user",
    initialState:{
        user_data: null,
        isLogin : true,
    },
    reducers:{
        setUserData:(state,action)=>{
            state.user_data = action.payload;
        },
        setIsLogin:(state,action)=>{
            state.isLogin = action.payload;
        },
        
        UserLogout:(state)=>{
            state.user_data = null;
            state.isLogin = true;
        }
    }
})

export const {setUserData,setIsLogin,UserLogout} = UserSlice.actions;

export default UserSlice.reducer;