import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app_context'

const Cart = () => {

  let { cart } = useContext(AppContext)

  return (
    <div className='cart'>
        <section className='secHeading'>
        {cart.CheckoutDone ?
        <>
         <span>ORDER <span>9999999</span> </span> 
         <span>date of order </span> 
        </>
         :
        <>
         <span>NEW ORDER</span>
         <span>{new Date().toLocaleDateString()}</span>
        </>
        }
        </section>
        <div className='orderItemContain'>
        {cart.CheckoutDone ?
        <span>TOTAL</span>
        :
        <button className='btn-sm'>Checkout</button>
        }
        <span>qty</span>
        <span className='right'>Order Total Price</span>
        </div>
    </div>
  )
}

export default Cart