import React from 'react'
import UserAccount from '../Modals/UserAccount'
import ModalManager from '../Modals/ModalManager'

const Dashboard = ({isModal,onClose}) => {
  return (
    <div>
      <div>
        <ModalManager
         data={null}
         modalType={'userAccount'}
         isModal={isModal} 
         onClose={onClose}
         />
      </div>
    </div>
  )
}

export default Dashboard