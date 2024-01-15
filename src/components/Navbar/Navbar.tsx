// COMPONENTS
import { NavLink } from "react-router-dom";
import Cart from "../Cart/Cart";
import { Link } from 'react-router-dom'

// DATA
import { Productreducer,getCategories } from '../../store/productStore'

// CSS
import './Navbar.css'

// ASSETS
import iconMenu from '../../assets/icon-menu.svg'
import logo from '../../logo.svg'
import cartIcon from '../../assets/cart-white.svg'
import avatarIcon from '../../assets/image-avatar.png'
import { useEffect, useReducer, useRef, useState } from 'react';
import {CartGlobalState} from '../../store/CartStore'
import closeIcon from '../../assets/icon-close.svg'
 
export default function Navbar() {
  const [state, dispatch] = useReducer(Productreducer, { product: [], categories: [] });

  const containers  = {
      sideMenuContainer: useRef<HTMLDivElement>(null),
      cartContainer:useRef<HTMLDivElement>(null)
  }

  const [isSideMenuOpen,setisSideMenuOpen] = useState(false)

  const { GlobalState, Globaldispatch } = CartGlobalState();

  const OpenSideMenu = () => setisSideMenuOpen(true)
  const toggleCart = () => {
    containers.cartContainer.current !== null && containers.cartContainer.current.classList.toggle('active')
  }
  const CloseSideMenu = () => setisSideMenuOpen(false)

  const ProductCategories = async () => {
     await getCategories(dispatch)
  }


  useEffect(() => {
    ProductCategories()
  },[])

   // LIST FOR CATEGORIES  
   const CategoryList = (categories : Array<string>) => {
    return (
        categories.map(category => (
            <Link to={`/product/category/${category}`} key={ category } onClick={CloseSideMenu}>
                <li>{ category }</li>
            </Link>
        ))
    )
  }

  return (
    <div className="contain">
        {/* ICON */}
        <div className="navigation">

            <div className="mobile-menu">
                <img src={ iconMenu }
                    alt=""
                    onClick={ OpenSideMenu }/>
            </div>

            <Link  to="/" className='icon-desktop'>
                <img src={ logo }
                     alt="" />
                <h5>Reacommerce</h5>
            </Link>

            <Link  to="/">
                <div className="icon-mobile">
                        <img src={ logo } 
                            alt="" />
                </div>
            </Link>
        </div>
        
        {/* CART */}
        <div className="profile">
            <div className="cart" onClick={ toggleCart }>
                {/* cart length */}
                <span className="cart-items-length">
                    {GlobalState.cartLength} 
                </span>

                {/* cart icon */}
                <img src={ cartIcon } 
                     alt=""
                     draggable="false" />
            </div>

             <div className="profile-img">
                <img src={ avatarIcon }
                     alt=""
                     draggable="false" />
            </div>

            {/* CART CONTAINER */}
            <Cart  ref={ containers.cartContainer} cartItems={GlobalState.cartItems}/>
        </div>

        {/*  SIDEMENU */}
        <div className={`side-menu ${isSideMenuOpen && 'active'}`} ref={ containers.sideMenuContainer } >
            <div className="main-menu">

                <div className="close-icon" >
                    <img src={closeIcon}
                         alt=""
                         onClick={ CloseSideMenu } />
                </div>

                <div className="link-items">
                    <ul>
                      {CategoryList(state.categories)}
                    </ul>
                </div>

            </div>
        </div>
    </div>
  )
}
