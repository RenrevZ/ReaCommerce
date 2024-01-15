import axios from "axios"
import { useContext, useReducer,createContext } from "react"

const ACTIONS = {
    ADD_TO_CART:'addToCart',
    REMOVE_CART_ITEM:'removeCartItem',
    UPDATE_CART_LENGTH: 'updateCartLength',
    SUM_ORDER_TOTAL:'sumOrderTotal',
    SUBTRACT_ORDER_TOTAL : 'subtractOrderTotal',
    ADD_ITEM_ID_TO_ARRAY:'addItemIdToArray',
    REMOVE_ID_TO_ARRAY:'removeItemIdToArray',
}

interface reducerType {
    cartItems : Array<any> | any,
    orderTotal : number,
    cartLength : number,
    cartIdArray : Array<number>
}

const initialState : reducerType = {
    cartItems: [],
    orderTotal: 0,
    cartLength:  0,
    cartIdArray : []
}

const CartStateContext = createContext<{
    GlobalState: reducerType;
    Globaldispatch: React.Dispatch<any>;
} | undefined>(undefined);

const Cartreducer = (state = initialState, action : any) : reducerType => {
    switch(action.type){
        case ACTIONS.ADD_TO_CART :
            const totalPrice = state.cartItems.reduce((sum : number, product : any) => sum + product.total, 0);

               return { ...state,
                        orderTotal: totalPrice + action.productData.total,
                        cartItems :  [...state.cartItems,action.productData]
                    }

        case ACTIONS.REMOVE_CART_ITEM :

            const updatedProducts = state.cartItems.filter((_ : any, i : number) => i !== action.index);

               return { ...state,
                        cartItems : updatedProducts,
                        cartLength : state.cartLength - 1}

        case ACTIONS.UPDATE_CART_LENGTH :

               return { ...state,
                        cartLength : state.cartLength + 1 }

        case ACTIONS.SUM_ORDER_TOTAL :

               return { ...state,orderTotal : action.orderTotal }

        case ACTIONS.SUBTRACT_ORDER_TOTAL :

               return { ...state,orderTotal : state.orderTotal - action.subtractTotal }

        case ACTIONS.ADD_ITEM_ID_TO_ARRAY :

               return { ...state,
                        cartIdArray : [...state.cartIdArray,action.cartId] }

        case ACTIONS.REMOVE_ID_TO_ARRAY :
            const updatedIdArray = state.cartIdArray.filter((_ : any, i : number) => i !== action.cartId);
               
               return { ...state,
                        cartIdArray : updatedIdArray }

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
        dispatch({ type: ACTIONS.UPDATE_CART_LENGTH });
    }catch (error) {
        console.error('Error fetching data single Product:', error);
    }
}

const RemoveCartItem = (index : number,dispatch: Function) => {
    dispatch({ type: ACTIONS.REMOVE_CART_ITEM, index });
}


const CartGlobalStateProvider = ({ children} : any) => {
    const [GlobalState,Globaldispatch] = useReducer(Cartreducer,initialState)

    return (
        <CartStateContext.Provider value={{ GlobalState,Globaldispatch }}>
            {children}
        </CartStateContext.Provider>
    )
}

const CartGlobalState = () => {
    const context = useContext(CartStateContext);
    if (!context) {
        throw new Error('There was an error in Global State');
      }
    return context;
}

export{
    Cartreducer,
    addToCart,
    RemoveCartItem,
    CartGlobalStateProvider,
    CartGlobalState
}