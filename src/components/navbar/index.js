import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import CategoryList from '../category_list'
import Logo from '../logo'
import UserLogOut from '../user_logout'
import './index.css'


const Navbar = () => {

  const location = useLocation()

  return (
    <nav>
      <Logo/>
      
      {location.pathname === '/orders/new' ? <>
      <CategoryList/>
      <Link to="/orders" className='button '>Previous Orders</Link>
      </>
      :
      <Link to="/orders/new" className='button '>New Orders</Link>
      }
      
      <UserLogOut/>
      
    </nav>
  )
}

export default Navbar