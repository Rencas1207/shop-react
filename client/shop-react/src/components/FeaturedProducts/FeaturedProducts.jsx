import { Card } from '../Card/Card';
import { useFetch } from '../../hooks/useFetch';
import './FeaturedProducts.scss';

export default function FeaturedProducts({ type }) {

   const { data, loading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);

   return (
      <div className='featuredProducts'>
         <div className="top">
            <h1>{type} products</h1>
            <p>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, tenetur ea rerum quam in amet eligendi porro officia mollitia quas obcaecati qui suscipit neque vero aliquid vitae quibusdam tempora earum.
            </p>
         </div>
         <div className="bottom">
            {error
               ? "Something went wrong!"
               : loading
                  ? "loading"
                  : data?.map((item) => <Card item={item} key={item.id} />)}
         </div>
      </div>
   )
}
