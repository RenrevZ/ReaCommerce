import  { forwardRef,Ref } from 'react'
import './Cart.css'

// const deleteCartItem =  () : void => {

// }

const Cart = forwardRef((props : any, ref: Ref<HTMLDivElement>) => {
  return (
    <div className="cart-container" ref={ref}>
            {/* cart header  */}
            <div className="cart-header">
                <h4>Cart</h4>
            </div>

                {/* cart items */}
            <div className="cart-items">

                  {/* <div className="item-container" v-for="(items,index) in cartItems" :key="items.id">
                        <div className="items" v-for="item in items.products" :key="item.id">
                            <div className="item-image">
                                <img :src="item.thumbnail" alt="">
                            </div>

                            <div className="item-description">
                                <p className="descriptiion">
                                     {{ item.title }}
                                </p>

                                <small className="price">
                                    ${{ Number(item.price).toLocaleString()  }} x {{ item.quantity }} <br>
                                    Total: <span className="price-total">${{ Number(item.total).toLocaleString() }}</span>
                                </small>
                            </div>

                            // <div className="item-remove-btn" onClick={ deleteCartItem(index) }>
                            //     <img src="../assets/icon-delete.svg" 
                            //         alt="" />
                            // </div>

                          </div>
                  </div> */}

                <div className="checkout-details">
                    <div className="overAllTotal">

                        <div className="left">
                            <h4>Order Total:</h4>
                        </div>

                        <div className="left">
                            {/* <h4>${{ Number(orderTotal).toLocaleString() }}</h4> */}
                           <h4>$300</h4> 
                        </div>
                    </div>
                    <div className="cart-checkout-btn">
                        <button className="checkout-btn">Checkout</button>
                    </div>
                </div>
            </div>

            {/* <div className="empty-cart">
                <h2>Your Cart is Empty</h2>
            </div> */}
        </div>
  )
})


export default Cart