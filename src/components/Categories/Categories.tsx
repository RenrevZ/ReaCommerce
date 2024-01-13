import { useRef } from 'react'
import './Categories.css'

// ASSETS
import leftArrowIcon from '../../assets/left-icon.svg'
import rightArrowIcon from '../../assets/rigth-icon.svg'


const scrollLeft = () => console.log('left')
const scrollRight = () => console.log('scrollRight')

interface categories {
    categories : Array<string>
}

export default function Categories({ categories } : categories) {
  const categoriesContainer = useRef(null)
  
  const CategoryList = (categories : Array<string>) => {
    return (
        categories.map(category => (
            <li key={category}>{category}</li>
        ))
    )
  }
  return (
         <div className="main-navigation-item">

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
                  {
                    CategoryList(categories)
                  }
            </ul> 
     </div>
  )
}
