import { useRef } from 'react'
import './Categories.css'

// ASSETS
import leftArrowIcon from '../../assets/left-icon.svg'
import rightArrowIcon from '../../assets/rigth-icon.svg'
import { NavLink } from 'react-router-dom'



interface categories {
    categories : Array<string>
}

export default function Categories({ categories } : categories) {
  const categoriesContainer = useRef<HTMLUListElement | null>(null)
  
  
 const scrollLeft = () : void => {
    if (!categoriesContainer.current) {
        console.log('categoriesContainer is null');
        return; // Guard clause to exit early if null
      }
    
    categoriesContainer.current.scrollLeft += (-200);
 }


 const scrollRight = () : void => {
    if (!categoriesContainer.current) {
        console.log('categoriesContainer is null');
        return; // Guard clause to exit early if null
      }
    
    categoriesContainer.current.scrollLeft += 200;
 }

  // LIST FOR CATEGORIES  
  const CategoryList = (categories : Array<string>) => {
    return (
        categories.map(category => (
            <NavLink to={`product/category/${category}`}>
                <li key={category}>{category}</li>
            </NavLink>
        ))
    )
  }

  return (
      <div className="main-container">

            <div className="categories-header">

                {/*  HEADER NAME */}
                <div className="left">
                    <span className="header-background"></span>
                    <h4>Categories</h4>
                </div>
                
                {/*  SLIDE ARROW  */}
                <div className="right">
                    <div className="arrow" onClick={ scrollLeft }>
                        <img src={ leftArrowIcon }
                             alt="" />
                    </div>

                    <div className="arrow" onClick= { scrollRight }>
                        <img src={ rightArrowIcon }
                             alt="" />
                    </div>
                </div>
                
            </div>
            
            {/* CATEGORY LIST */}
           <ul  ref={ categoriesContainer }>
                  { CategoryList(categories) } 
            </ul> 
     </div>
  )
}
