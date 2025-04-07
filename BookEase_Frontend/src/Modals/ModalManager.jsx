import React from 'react'
import UserAccount from './UserAccount'
import ViewBook from '../Components/ViewBook'

const ModalManager = ({data,modalType,isModal,onClose}) => {
  
    switch(modalType){
        case "userAccount":
            return (<UserAccount data={data} isModal={isModal} onClose={onClose} />)

        case "viewBook":
            return (<ViewBook  data={data} isModal={isModal} onClose={onClose} />)
        default:
            return null
    }
}

export default ModalManager