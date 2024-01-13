// COMPONENTS
import { NavLink } from "react-router-dom";
import Cart from "../Cart/Cart";

// CSS
import './Navbar.css'

// ASSETS
import iconMenu from '../../assets/icon-menu.svg'
import logo from '../../logo.svg'
import cartIcon from '../../assets/cart-white.svg'
import avatarIcon from '../../assets/image-avatar.png'
import { useRef } from 'react';

export default function Navbar() {
      
  const containers  = {
      sideMenuContainer: useRef<HTMLDivElement>(null),
      cartContainer:useRef<HTMLDivElement>(null)
  }

//   const ToggleClass = () => {}

  const OpenSideMenu = () => console.log('asdsadsa')
  const toggleCart = () => {
    console.log('click')
    containers.cartContainer.current !== null && containers.cartContainer.current.classList.toggle('active')
  }
  const CloseSideMenu = () => console.log('asdsadsa')

  return (
    <div className="contain">
        {/* ICON */}
        <div className="navigation">

            <div className="mobile-menu">
                <img src={ iconMenu }
                    alt=""
                    onClick={ OpenSideMenu }/>
            </div>

            <NavLink  to="/" className='icon-desktop'>
                <img src={ logo }
                     alt="" />
                <h5>Reacommerce</h5>
            </NavLink>

            <div className="icon-mobile">
                <img src={ iconMenu } 
                     alt="" />
            </div>
        </div>
        
        {/* CART */}
        <div className="profile">
            <div className="cart" onClick={ toggleCart }>
                {/* cart length */}
                <span className="cart-items-length">
                    3
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
            <Cart  ref={ containers.cartContainer} />
        </div>

        {/*  SIDEMENU */}
        <div className="side-menu" ref={ containers.sideMenuContainer } >
            <div className="main-menu">

                <div className="close-icon" >
                    <img src="../assets/close-icon-black.svg" 
                         alt=""
                         onClick={ CloseSideMenu } />
                </div>

                <div className="link-items">
                    <ul>
                        {/* <li v-for="category in productCategory" :key="category">
                            <router-link :to="{name:'ShowProductCategories',params:{category:category}}">
                            {{  category }}
                            </router-link>
                        </li> */}
                    </ul>
                </div>

            </div>
        </div>
    </div>
  )
}
