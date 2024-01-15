import  { forwardRef,Ref } from 'react'
import './Cart.css'
import DeleteIcon from '../../assets/icon-delete.svg'
import { CartGlobalState } from '../../store/CartStore'

const Cart = forwardRef((cartItems : any, ref: Ref<HTMLDivElement>) => {
 
const { GlobalState, Globaldispatch } = CartGlobalState();

 const deleteCartItem = (index : number,itemTotal : number) => {
    Globaldispatch({type:'removeCartItem', index : index})
    Globaldispatch({type:'removeItemIdToArray', cartId: index})
    Globaldispatch({type:'subtractOrderTotal', subtractTotal: itemTotal})
 }

 const { cartItems : itemOnCart } = cartItems
 interface CartItemsType {
    id : number,
    products : any[]
 }
  return (
    <div className="cart-container" ref={ref}>
            {/* cart header  */}
            <div className="cart-header">
                <h4>Cart</h4>
            </div>

                {/* cart items */}
            <div className="cart-items">
                {
                        itemOnCart.map((items : CartItemsType, i : number) => (
                            <div className="item-container" key={items.id}>
                                    { items.products.map((item,index) => (
                                        <div className="items" key={item.id}>
                                            <div className="item-image">
                                                <img src={ item.thumbnail} alt="" />
                                            </div>

                                            <div className="item-description">
                                                <p className="descriptiion">
                                                    { item.title }
                                                </p>

                                                <small className="price">
                                                    ${ Number(item.price).toLocaleString()  } x { item.quantity } <br />
                                                    Total: <span className="price-total">${ Number(item.total).toLocaleString() }</span>
                                                </small>
                                            </div>

                                            <div className="item-remove-btn" onClick={ () => deleteCartItem(i,item.total) }>
                                                <img src={DeleteIcon}
                                                    alt="" />
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        ))
                }

            </div>
                {   itemOnCart.length > 0 ?
                    <div className="checkout-details">
                        <div className="overAllTotal">

                            <div className="left">
                                <h4>Order Total:</h4>
                            </div>

                            <div className="left">
                                <h4>${ Number(GlobalState.orderTotal).toLocaleString() }</h4> 
                            </div>
                        </div>
                        <div className="cart-checkout-btn">
                            <button className="checkout-btn">Checkout</button>
                        </div>
                    </div>

                    :

                    <div className="empty-cart">
                        <h2>Your Cart is Empty</h2>
                    </div>
                }
        </div>
  )
})


export default Cart