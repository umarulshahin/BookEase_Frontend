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
    }
})

export const {setUserData,setIsLogin} = UserSlice.actions;

export default UserSlice.reducer;