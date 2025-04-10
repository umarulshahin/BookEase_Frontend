import { createSlice } from "@reduxjs/toolkit"

const BooksSlice = createSlice({

    name: "books",
    initialState:{

        books :null,
        reading_list:null

    },
    reducers:{
        addBooks:(state,action)=>{
            state.books = action.payload
        },
        addNewBooks(state,action){
            state.books = [...state.books,action.payload]
        },
        DeleteBooks:(state,action)=>{
            const id = action.payload
            state.books = state.books.filter((book)=>book.id !== id)
        },
        addReadingList:(state,action)=>{
            state.reading_list = action.payload
        },
        RemoveReadingList:(state,action)=>{
            const id = action.payload
            console.log(id,'id')
            state.reading_list = state.reading_list.filter((book)=>book.book.id !== id)
        },
        RemoveBooks:(state,action)=>{
            state.books = null
            state.reading_list = null
        }
    }
})

export const {addBooks,RemoveBooks,addNewBooks,DeleteBooks,addReadingList,RemoveReadingList} = BooksSlice.actions
export default  BooksSlice.reducer