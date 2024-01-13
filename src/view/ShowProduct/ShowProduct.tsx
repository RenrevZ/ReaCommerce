import { useRef } from 'react'
import Categories from '../../components/Categories/Categories'
import './ShowProduct.css'

const OpenSlideShow = () => console.log('asdsad')

export default function ShowProduct() {
  const container = {
    imageContainer : useRef<HTMLDivElement>(null)
  }

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
                
                {/* <Thumbnail :changeHeaderPhoto="changeHeaderPhoto" 
                                    :images="product.images"
                                    :reference="image => Images.push(image)" /> */}
                  {/* <Categories /> */}
            </div>

        </div>

    </div>
  )
}
