import { createSlice } from "@reduxjs/toolkit"


const BooksSlice = createSlice({

    name: "books",
    initialState:{

        books :null

    },
    reducers:{
        addBooks:(state,action)=>{
            state.books = action.payload
        },
        RemoveBooks:(state,action)=>{
            state.books = null
        }
    }
})

export const {addBooks,RemoveBooks} = BooksSlice.actions
export default  BooksSlice.reducer