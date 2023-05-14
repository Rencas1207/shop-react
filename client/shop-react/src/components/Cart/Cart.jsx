import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";

import './Cart.scss'

import { loadStripe } from '@stripe/stripe-js';
import { makeRequest } from "../../makeRequest";

export function Cart() {

   const products = useSelector(state => state.cart.products);

   const dispatch = useDispatch();

   const totalPrice = () => {
      let total = 0;
      products.forEach(item => total += item.quantity * item.price)
      return total.toFixed(2);
   }

   // Make sure to call `loadStripe` outside of a component’s render to avoid
   // recreating the `Stripe` object on every render.
   const stripePromise = loadStripe('pk_test_51N7m4DHuS4xEMmgAzORalQzLzRWu52VhTZBM5wXx764LuoIJ9hHFWFrhffU6gqrKUZP7raunnSZf4UgExqRLhIr100kQu194b0');

   const handlePayment = async () => {
      try {
         const stripe = await stripePromise;

         const res = await makeRequest.post('/orders', {
            products,
         })

         await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id
         })
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className='cart'>
         <h1>Products in your cart</h1>
         {
            products?.map(item => (
               <div className="item" key={item.id}>
                  <img src={import.meta.env.VITE_UPLOAD_URL + item.img} alt="" />
                  <div className="details">
                     <h1>{item.title}</h1>
                     <p>{item.desc?.substring(0, 100)}</p>
                     <div className="price">{item.quantity} x ${item.price}</div>
                  </div>
                  <DeleteOutlinedIcon
                     className="delete"
                     onClick={() => dispatch(removeItem(item, item.id))}
                  />
               </div>
            ))
         }
         <div className="total">
            <span>SUBTOTAL</span>
            <span>${totalPrice()}</span>
         </div>
         <button type="button" onClick={handlePayment}>PROCEED TO CHECKOUT</button>
         <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span>
      </div>
   )
}
