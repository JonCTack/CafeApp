import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app_context'
import './index.css'
const UserLogOut = () => {

    const { user } = useContext(AppContext)

    const handleLogout = () => {}
  return (
    <div>
        <div className='userLogout btn-sm'>
        {user.name || "guest"}
        </div>
        <div className='email btn-xs'>
        {user.email || "guest@mail.com"}
        </div>
        <div className='button btn-sm' onClick={handleLogout}>
        LOG OUT
        </div>
    </div>
  )
}

export default UserLogOut