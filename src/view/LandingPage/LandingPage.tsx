// COMPONENTS
import { useEffect, useReducer, useState } from 'react';
import './LandingPage.css'
import Categories from '../../components/Categories/Categories'
import Products from '../../components/Products/Products';
import CardLoader from '../../components/cardLoader/CardLoader';
import {CategoryLoader} from '../../components/cardLoader/CardLoader'

// DATA
import { Productreducer,getProducts,getCategories } from '../../store/productStore'



const LandingPage = () => {
  const [state, dispatch] = useReducer(Productreducer, { product: [], categories: [] });
  const [productIsLoading,setproductIsLoading] = useState(true)
  const [categoryIsLoading,setcategoryIsLoading] = useState(true)

  const loadProduct = async () => {
    
      await getProducts(dispatch)
            .finally(() => setproductIsLoading(false))
  }

  const ProductCategories = async () => {

    await getCategories(dispatch)
          .finally(() => setcategoryIsLoading(false))
  }

  useEffect(() => {
    loadProduct()
    ProductCategories()
  },[])

  return (
    <div className="landing-page-container">
        
          {/* CATEGORIES  */}
          {
            categoryIsLoading ? 
            <CategoryLoader />
            :
            <Categories categories={state.categories}/>
          }
          
         
          <div className="main-products-header">
                  <span className="header-background"></span>
                  <h4>All Products</h4>
          </div>

          {/*  MAIN PRODUCT */}
          {
            productIsLoading ? 
            <CardLoader />

            :

            
            <Products products={state.product}/>
          }
         
    </div>
  );
};

export default LandingPage;
