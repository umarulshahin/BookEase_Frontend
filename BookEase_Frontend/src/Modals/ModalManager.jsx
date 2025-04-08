import React from 'react'
import UserAccount from './UserAccount'
import ViewBook from './ViewBook'
import AddBook from './AddBook'
import DeleteBook from './DeleteBook'

const ModalManager = ({data,modalType,isModal,onClose}) => {
    
    switch(modalType){
        case "userAccount":
            return (<UserAccount data={data} isModal={isModal} onClose={onClose} />)

        case "viewBook":
            return (<ViewBook  data={data} isModal={isModal} onClose={onClose} />)

        case "addBook":
            return (<AddBook isModal={isModal} onClose={onClose} />)

        case "deleteBook":
            return (<DeleteBook data={data} isModal={isModal} onClose={onClose} />)
        default:
            return null
    }
}

export default ModalManager