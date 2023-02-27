import React, {useContext} from 'react'
import { AppContext } from '../../contexts/app_context'
import './index.css'


const CategoryList = ({categories}) => {

  const {activeCategory, setActiveCategory} = useContext(AppContext)

  const handleCatClick = (cat) => {
    setActiveCategory(cat)
  }

  let categoriesJSX = categories.map((cat) => {
    return (
      <li 
      key={cat._id} 
      onClick={() => handleCatClick(cat.name)}
      className={cat.name === activeCategory ? 'active' : ''}>
        {cat.name}
        </li>
    )
  })

  return (
    <div>
      <ul className='categoryList'>
        {categoriesJSX}
      </ul>
    </div>
  )
}

export default CategoryList