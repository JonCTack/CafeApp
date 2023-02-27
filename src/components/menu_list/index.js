import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app_context'
import MenuListItem from '../menu_list_item'
import './index.css'
const MenuList = () => {
    let { activeCategory, items } = useContext(AppContext)


    let itemsJSX = items.map((item,i) => {
        return(
            item.category.name === activeCategory ? <MenuListItem key={item._id} itemData={item}/> : null
        )
    })

  return (
    <div className="MenuList">
        {itemsJSX}
    </div>
  )
}

export default MenuList