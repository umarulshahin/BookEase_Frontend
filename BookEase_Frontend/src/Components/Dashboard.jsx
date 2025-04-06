import React, { useEffect } from 'react'
import Books from './Books'
import { useSelector } from 'react-redux'
import useBooks from '../Hooks/useBooks'

const Dashboard = React.memo(({isModal,onClose}) => {

      const books = useSelector((state)=>state.booksdata.books)
      const {Get_Books} = useBooks()
      useEffect(()=>{
          Get_Books()
      },[])
      console.log(books,'books')
      
  return (
    <div>
      <Books
      books = {books} />
      <div>
     
      </div>
    </div>
  )
})

export default Dashboard