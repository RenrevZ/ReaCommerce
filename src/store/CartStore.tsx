import axios from "axios"

const ACTIONS = {
    ADD_TO_CART:'addToCart',
    REMOVE_CART_ITEM:'removeCartItem',
    SUM_ORDER_TOTAL:'sumOrderTotal'
}

interface reducerType {
    cartItems : Array<any> | any,
    orderTotal : number
}

const Cartreducer = (state : any, action : any) : reducerType => {
    switch(action.type){
        case ACTIONS.ADD_TO_CART :
               return { ...state,cartItems : action.productData }
        case ACTIONS.REMOVE_CART_ITEM :
            const updatedProducts = state.product.filter((_ : any, i : number) => i !== action.index);
               return { ...state,cartItems : updatedProducts }
        case ACTIONS.SUM_ORDER_TOTAL :
               return { ...state,orderTotal : action.orderTotal }
        default:
              return state
    }
}

interface addToCartType {
    merge: boolean;
    userId: number;
    products: Array<object>
}

const addToCart = async (formData : addToCartType, dispatch : Function) => {
    try{
        const response: { data: any } = await axios.post(
            'https://dummyjson.com/carts/add',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const responseData: any = await response.data;
        
        dispatch({ type: ACTIONS.ADD_TO_CART, productData : responseData });
    }catch (error) {
        console.error('Error fetching data single Product:', error);
    }
}

const RemoveCartItem = (index : number,dispatch: Function) => {
    dispatch({ type: ACTIONS.REMOVE_CART_ITEM, index });
}


export{
    Cartreducer,
    addToCart,
    RemoveCartItem
}