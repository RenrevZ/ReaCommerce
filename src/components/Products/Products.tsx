import { Link } from 'react-router-dom'
import './Product.css'

interface ProductType {
    id: number;
    price: number;
    brand: string;
    title: string;
    rating: number;
    discountPercentage: Float32Array;
    thumbnail: string; // Assuming you have a 'thumbnail' property
}
  
interface ProductsProps {
   products: ProductType[];
}

export default function Products({ products  } : ProductsProps)  {

  
  return (
    <div className="main-products">
        <div className="product-container">
         {
            products.map((product : ProductType) => (

                <Link to={`/product/${product.id}`} key={product.id} className="product">
                    {
                     product.price <= 100 &&  
                     <div className="lowest-guarantee">
                            <p>lowest price</p>
                     </div>
                    }
                    

                    <div className="image">
                    <img src={product.thumbnail} alt="" />
                    </div>

                    <div className="product-category">
                    {product.brand}
                    </div>

                    <div className="ratings">
                    {Array.from({ length: Math.round(product.rating) }, (_, index) => (
                        <span key={index} className="material-symbols-outlined star-symbol">
                            star
                        </span>
                        ))}
                    </div>

                    <div className="product-title">
                    {product.title}
                    </div>

                    <div className="price-container">
                        <div className="price">
                            ${product.price}
                        </div>

                        <div className="discount-price">
                            ${product.discountPercentage}
                        </div>
                    </div>
                </Link>
            ))
            
           }
        </div>
    </div>
  )
}
