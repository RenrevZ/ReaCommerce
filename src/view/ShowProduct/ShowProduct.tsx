// COMPONENT
import { useEffect, useReducer, useRef, useState } from 'react'
import './ShowProduct.css'
import Thumbnail from '../../components/Thumbnail/Thumbnail'
import RangeBtn from '../../components/RangeBtn/RangeBtn'
import CloseIcon from '../../assets/icon-close.svg'
import PreviousIcon from '../../assets/icon-previous.svg'
import NextIcon from '../../assets/icon-next.svg'
import {addToCart,Cartreducer} from '../../store/CartStore'
import { CartGlobalState } from '../../store/CartStore'

// DATA
import { getSingleProduct,Productreducer } from '../../store/productStore'
import { useParams } from 'react-router-dom'

export default function ShowProduct() {
  const container = {
    imageContainer : useRef<HTMLDivElement>(null),
    mobileImageContainer : useRef<HTMLDivElement>(null),
    productSlideShowDiv : useRef<HTMLDivElement>(null),
    slideShowImageHeader : useRef<HTMLDivElement>(null),
  }

  let { id } = useParams()

  const [state, dispatch] = useReducer(Productreducer, { product: [], categories: [] });

  const loadCategories = async (dispatch : Function) => {
    await getSingleProduct(Number(id),dispatch)
  }

  // SUCCESS MESSAGE LOGIC
   const [isAdded,setIsAdded] = useState<boolean>(false)
   const [isAlreadyAdded,setisAlreadyAdded] = useState<boolean>(false)

  // RANGE BUTTON
  const [RangeValue,setRangeValue] = useState<number>(1)

  // DESKTOP IMAGE TOGGLE
  const [currentSelectedIndex,setCurrentSelectedIndex] = useState<number>(0)
  const [isSlideShowActive,setisSlideShowActive] = useState<boolean>(false)

  

  // DESKTOP FUNCTION FOR TOGGLING IMAGES AND THUMBNAILS
  const changeHeaderPhoto = (index : number) => setCurrentSelectedIndex(index)
  const changeContainerImage = (container : any , image : string) => {
    container.current.style.background = `url(${image}) no-repeat center`
    container.current.style.backgroundSize = 'cover'
  }

  // PRODUCT SLIDESHOW FUNCTION
  const OpenSlideShow = () => setisSlideShowActive(true)
  const closeSlideShow = () => setisSlideShowActive(false)
  const prevImage = () => currentSelectedIndex !== 0 && setCurrentSelectedIndex(currentSelectedIndex - 1)
  const nextImage = () => currentSelectedIndex !== state.product.images.length -1 && setCurrentSelectedIndex(currentSelectedIndex + 1)
 
  // MOBILE FUNCTIONS
  const mobilePrev = () => currentSelectedIndex !== 0 && setCurrentSelectedIndex(currentSelectedIndex - 1)
  const mobileNext = () => currentSelectedIndex !== state.product.images.length -1 && setCurrentSelectedIndex(currentSelectedIndex + 1)
 
  // ADD TO CART FUNCTION
  const { GlobalState, Globaldispatch } = CartGlobalState();
 
  const AddToCart = async () => {
    const FormData = {
      merge: true,
      userId: 1,
      products: [
        {
          id: id,
          quantity : RangeValue
        }
      ]
    }
    const isAlreadyOnCart = GlobalState.cartIdArray.some((arrayId : number) => arrayId === Number(id));

    if(isAlreadyOnCart){
      setisAlreadyAdded(true)
    }else{
      await addToCart(FormData,Globaldispatch)
      Globaldispatch({type: 'addItemIdToArray',cartId:Number(id)})
      setIsAdded(true)
    }
  }
  
  
  useEffect(() => {
    loadCategories(dispatch)

    // CHANGE THE IMAGE CONTAINER BACKGROUND TO THUMBNAIL ONLOAD
    if (state.product.images && state.product.images.length > 0 && container.imageContainer.current) {
        changeContainerImage(container.imageContainer,state.product.images[currentSelectedIndex])
    }

    if(state.product.images && state.product.images.length > 0 && container.slideShowImageHeader){
       changeContainerImage(container.slideShowImageHeader,state.product.images[currentSelectedIndex])
    }

    if(state.product.images && state.product.images.length > 0 && container.mobileImageContainer){
       changeContainerImage(container.mobileImageContainer,state.product.images[currentSelectedIndex])
    }
  })

  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    
      return () => clearTimeout(timeoutId);
  }, [isAdded]);

  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setisAlreadyAdded(false);
      }, 2000);
    
      return () => clearTimeout(timeoutId);
  }, [isAlreadyAdded]);
  

  return (
    <div className="show-product-container">
  
        {/*  DESKTOP  */}
        <div className="image-container">
            <div className="wrapper">
                <div className="image-header" ref={ container.imageContainer }
                     onClick={ OpenSlideShow } >
                </div>
            </div>

            <div className="image-thumbnail">
                <Thumbnail images={state.product.images}  
                           changeHeaderPhoto={changeHeaderPhoto} 
                           selectedIndex={currentSelectedIndex}/>
            </div>

        </div>

        {/*  MOBILE */}
        <div className="image-container-mobile">
            <div className="wrapper">

                <div className="prev-icon" onClick={ mobilePrev } >
                    <img src={ PreviousIcon } alt="" />
                </div>

                <div className="image-header" ref={container.mobileImageContainer}></div>

                <div className="next-icon" onClick={ mobileNext }>
                    <img src={ NextIcon } alt="" />
                </div>
                
            </div>

            <Thumbnail images={state.product.images} 
                       changeHeaderPhoto={changeHeaderPhoto}
                       selectedIndex={currentSelectedIndex}/>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="item-description-container">

            <div className="company">
              <h4>{state.product.brand}</h4>
            </div>

            <div className="item-title">
              <h1>{state.product.title}</h1>
            </div>

            <div className="item-description">
              <p>{state.product.description}</p>
            </div>

          <div className="pricing">
              <div className="price">
                  <h1>${state.product.price}</h1>
                  <div className="discount">50%</div>
              </div>

              <div className="old-price">
                <h5>$250.00</h5>
              </div>
          </div>

          <div className="btn-container">
            {/* ALERT SUCCESS MESSAGE */}
            {
              isAdded && !isAlreadyAdded &&
                <div className="alert-container">
                  <div className="alert">
                    <div className="left">
                      added to your cart successfully
                    </div>
                  </div>
                </div>
            }

            {
              isAlreadyAdded &&
                <div className="alert-container">
                  <div className="alert">
                    <div className="left">
                      item is already on your cart
                    </div>
                  </div>
                </div>
            }

            
            <div className="cart-column">
              
                {/* RANGE INPUT BUTTON */}
                <RangeBtn itemValue={ RangeValue } 
                            decrementValue={ () => RangeValue !== 0 && setRangeValue(RangeValue - 1)} 
                            incrementValue={ () => setRangeValue(RangeValue + 1)}/>


                <div className="addToCart-btn">
                  
                  {/* ADD TO CART BUTTON */}
                  <button className="btn-add-cart" onClick={AddToCart}>
                    <img src="../assets/cart-white.svg" alt="" className="btn-icon" />
                    Add to cart
                  </button>

                </div>

            </div>

        </div>

      </div>

      <div className={`product-slideshow ${isSlideShowActive && 'active'}`} ref={container.productSlideShowDiv}>
        <div className="main-item">
          <div className="close-icon">
            <img src={ CloseIcon } alt="closeIcon" onClick={closeSlideShow} />
          </div>

          <div className="image-container">
            <div className="wrapper">
              <div className="prev-icon" onClick={ prevImage }>
                <img src={ PreviousIcon } alt="" />
              </div>

              <div className="image-header" ref={ container.slideShowImageHeader }></div>

              <div className="next-icon" onClick={ nextImage }>
                <img src={NextIcon} alt="" />
              </div>
            </div>

            <div className="image-thumbnail">
              {/* Render Thumbnail component here with appropriate props */}
              <Thumbnail images={state.product.images} 
                       changeHeaderPhoto={changeHeaderPhoto}
                       selectedIndex={currentSelectedIndex}/>
            </div>
          </div>
        </div>
      </div>

  </div>
  )
}
