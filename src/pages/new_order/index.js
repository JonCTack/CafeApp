import React, { useContext } from 'react'
import Cart from '../../components/cart'
import MenuList from '../../components/menu_list'
import { AppContext } from '../../contexts/app_context'
import './index.css'

const NewOrder = () => {

  const { activeCategory } = useContext(AppContext)

  return (
    <div className='cafePage newOrderPage'>
      <MenuList/>
      <Cart/>
    </div>
  )
}

export default NewOrder