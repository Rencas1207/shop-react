import './Card.scss';
import { Link } from 'react-router-dom';

export function Card({ id, title, img, img2, isNew, oldPrice, price }) {
   return (
      <Link className='link' to={`/product/${id}`}>
         <div className="card">
            <div className="image">
               {isNew && <span>New Season</span>}
               <img src={img} alt={title} className='mainImg' />
               <img src={img2} alt={title} className='secondImg' />
            </div>
            <h2>{title}</h2>
            <div className="prices">
               <h3>${oldPrice}</h3>
               <h3>${price}</h3>
            </div>
         </div>
      </Link>
   )
}
