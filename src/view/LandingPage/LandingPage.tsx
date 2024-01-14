import { useEffect, useReducer } from 'react';
import Categories from '../../components/Categories/Categories'
import './LandingPage.css'

// DATA
import { Productreducer,getProducts,getCategories } from '../../store/productStore'
import Products from '../../components/Products/Products';

const LandingPage = () => {
  const [state, dispatch] = useReducer(Productreducer, { product: [], categories: [] });

  const loadProduct = async () => {
    await getProducts(dispatch)
  }

  const ProductCategories = async () => {
    await getCategories(dispatch)
  }

  useEffect(() => {
    loadProduct()
    ProductCategories()
  },[])

  return (
    <div className="landing-page-container">
        
          {/* CATEGORIES  */}
          <Categories categories={state.categories}/>

          <div className="main-products-header">
                  <span className="header-background"></span>
                  <h4>All Products</h4>
          </div>

          {/*  MAIN PRODUCT */}
          <Products products={state.product}/>
    </div>
  );
};

export default LandingPage;
