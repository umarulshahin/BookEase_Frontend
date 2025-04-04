import React from 'react'
import UserAccount from './UserAccount'

const ModalManager = ({data,modalType,isModal,onClose}) => {
  
    switch(modalType){
        case "userAccount":
            return (<UserAccount data={data} isModal={isModal} onClose={onClose} />)
    }
}

export default ModalManager