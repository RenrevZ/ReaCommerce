// COMPONENTS
import { useEffect, useReducer } from 'react';
import '../LandingPage/LandingPage.css'
import Categories from '../../components/Categories/Categories'
import Products from '../../components/Products/Products';

// DATA
import { Productreducer,getSingleCategories,getCategories } from '../../store/productStore'
import { useParams } from 'react-router-dom';


export default function ShowSingleCategories() {

    const [state, dispatch] = useReducer(Productreducer, { product: [], categories: [] });

    const { category } = useParams()

    const loadProduct = async () => {
        if(category !== undefined) await getSingleCategories(category,dispatch)
    }

    const ProductCategories = async () => {
        await getCategories(dispatch)
    }

    useEffect(() => {
        loadProduct()
        ProductCategories()
    })
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
  )
}
