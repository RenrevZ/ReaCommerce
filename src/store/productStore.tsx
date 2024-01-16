import axios from "axios"

const ACTIONS = {
    GET_PRODUCT : 'getProduct',
    GET_SINGLE_PRODUCT : 'getSingleProduct',
    GET_CATEGORIES: 'getCategories',
    GET_SINGLE_CATEGORY: 'getSingleCategory'
}

interface reducerType {
    product : Array<any> | any,
    categories : Array<string>
}


const Productreducer = (state : any, action : any) : reducerType => {
    switch(action.type){
        case ACTIONS.GET_PRODUCT :
               return { ...state,product : action.productData }
        case ACTIONS.GET_SINGLE_PRODUCT :
               return { ...state,product : action.SingleproductData }
        case ACTIONS.GET_CATEGORIES :
               return { ...state,categories : action.categories }
        case ACTIONS.GET_SINGLE_CATEGORY :
               return { ...state,product : action.singleCategories }
        default:
              return state
    }
}

const getProducts = async (dispatch : Function) : Promise<void>  => {
    try{
        const response: { data : any } = await axios.get('https://dummyjson.com/products?limit=100')
        const responseData: any = await response.data.products;
       
        dispatch({ type: ACTIONS.GET_PRODUCT, productData: responseData });  

    }catch (error) {
        console.error('Error fetching Products:', error);
    }
}

const getSingleProduct = async (id : number,dispatch : Function) : Promise<void> => {
    try{
        const response: { data : any } = await axios.get(`https://dummyjson.com/products/${id}`)
        const responseData: any = await response.data;
       
        dispatch({ type: ACTIONS.GET_SINGLE_PRODUCT, SingleproductData: responseData });

    }catch (error) {
        console.error('Error fetching data single Product:', error);
    }
}

const getCategories = async (dispatch : Function) : Promise<void>  => {
    try{
        const response: { data : any } = await axios.get('https://dummyjson.com/products/categories')
        const responseData: any = await response.data;
       
        dispatch({ type: ACTIONS.GET_CATEGORIES, categories: responseData });

    }catch (error) {
        console.error('Error fetching data single Product:', error);
    }
}

const getSingleCategories = async (category : string | number,dispatch : Function) : Promise<void> => {
    try{
        const response: { data : any } = await axios.get(`https://dummyjson.com/products/category/${category}`)
        const responseData: any = await response.data.products;
       
        dispatch({ type: ACTIONS.GET_SINGLE_CATEGORY, singleCategories: responseData });

    }catch (error) {
        console.error('Error fetching data single Product:', error);
    }
}

export { Productreducer,
         getProducts,
         getSingleProduct,
         getCategories,
         getSingleCategories}