import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CategoryList from '../category_list'
import Logo from '../logo'
import UserLogOut from '../user_logout'
import './index.css'


const Navbar = () => {

  let [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
    let res = await axios('/get_categories')
    
    let sortedCats = res.data.sort((a,b) => a.sortOrder - b.sortOrder)

    setCategories(sortedCats)
    }
    getCategories()
  },[])

  const location = useLocation()

  return (
    <nav>
      <Logo/>
      
      {location.pathname === '/orders/new' ? <>
      <CategoryList categories={categories}/>
      <Link to="/orders" className='button '>Previous Orders</Link>
      </>
      :
      <Link to="/orders/new" className='button '>New Orders</Link>
      }
      
      <UserLogOut className='logOut'/>
      
    </nav>
  )
}

export default Navbar