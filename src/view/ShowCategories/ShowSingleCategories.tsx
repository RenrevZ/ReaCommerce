// COMPONENTS
import { useEffect, useReducer, useState } from 'react';
import '../LandingPage/LandingPage.css'
import Categories from '../../components/Categories/Categories'
import Products from '../../components/Products/Products';
import CardLoader from '../../components/cardLoader/CardLoader';
import {CategoryLoader} from '../../components/cardLoader/CardLoader'

// DATA
import { Productreducer,getSingleCategories,getCategories } from '../../store/productStore'
import { useParams } from 'react-router-dom';


export default function ShowSingleCategories() {
    const [state, dispatch] = useReducer(Productreducer, { product: [], categories: [] });
    const [productIsLoading,setproductIsLoading] = useState(false)
    const [categoryIsLoading,setcategoryIsLoading] = useState(false)

    const { category } = useParams()

    const loadProduct = async () => {
        if(category !== undefined){
          await getSingleCategories(category,dispatch)
                .finally(() => setproductIsLoading(false))
        } 
    }

    const ProductCategories = async () => {
        await getCategories(dispatch)
              .finally(() => setcategoryIsLoading(false))
    }

    useEffect(() => {
        loadProduct()
        ProductCategories()
    })
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
  )
}
