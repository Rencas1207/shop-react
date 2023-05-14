import { useState } from 'react';

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";

import './Product.scss';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

export function Product() {
   const { id } = useParams();
   const [selectedImg, setSelectedImg] = useState('img');
   const [quantity, setQuantity] = useState(1);

   const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

   // console.log(data);
   // console.log(selectedImg, data?.attributes[selectedImg]?.data?.attributes?.url);


   return (
      <div className='product'>
         {
            loading
               ? 'Loading'
               : (<>
                  <div className="left">
                     <div className="images">
                        <img src={import.meta.env.VITE_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url} alt="" onClick={e => setSelectedImg('img')} />
                        <img src={import.meta.env.VITE_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url} alt="" onClick={e => setSelectedImg('img2')} />
                     </div>
                     <div className="mainImg">
                        <img src={import.meta.env.VITE_UPLOAD_URL + data?.attributes[selectedImg]?.data?.attributes?.url} alt="" />
                     </div>
                  </div>
                  <div className="right">
                     <h1>{data?.attributes?.title}</h1>
                     <span className='price'>${data?.attributes?.price}</span>
                     <p>
                        {data?.attributes?.desc}
                     </p>
                     <div className="quantity">
                        <button type='button' onClick={() => setQuantity(prev => (prev === 1 ? 1 : prev - 1))}>-</button>
                        {
                           quantity
                        }
                        <button type='button' onClick={() => setQuantity(prev => prev + 1)}>+</button>
                     </div>
                     <button className='add'>
                        <AddShoppingCartIcon /> ADD TO CART
                     </button>
                     <div className="links">
                        <div className="item">
                           <FavoriteBorderIcon /> ADD TO WISH LIST
                        </div>
                        <div className="item">
                           <BalanceIcon /> ADD TO COMPARE
                        </div>
                     </div>
                     <div className="info">
                        <span>Vendor: Polo</span>
                        <span>Product Type: T-Shirt</span>
                        <span>Tag: T-Shirt, Women, Top</span>
                     </div>
                     <hr />
                     <div className="info">
                        <span>DESCRIPTION</span>
                        <hr />
                        <span>ADDITIONAL INFORMATION</span>
                        <hr />
                        <span>FAQ</span>
                     </div>
                  </div>
               </>
               )
         }
      </div>
   )
}
