import React, { useState } from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import ModalManager from '../Modals/ModalManager'



const Base_page = () => {

    const [isModal, setIsModal] = useState(false)
    const handleAccount = ()=>{
        setIsModal(!isModal)
    }
    return (
        <div className='min-h-screen min-w-screen bg-gray-300 ' >
          <Header handleAccount={handleAccount} />
        <main className=' pt-8 '>
          <Outlet />
        </main>
           <ModalManager
                 data={null}
                 modalType={'userAccount'}
                 isModal={isModal} 
                 onClose={handleAccount}
                 />
                 
        </div>
      )
}

export default Base_page