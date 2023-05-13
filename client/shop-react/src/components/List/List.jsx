import './List.scss'
import { Card } from '../Card/Card'
import { useFetch } from '../../hooks/useFetch';

export function List({ catId, maxPrice, sort, subCats }) {

   const { data, loading, error } = useFetch(`/products?populate=*&[filters][categories][id][$eq]=${catId}${subCats.map(item => `&[filters][sub_categories][id][$eq]=${item}`)}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`);

   return (
      <div className='list'>
         {
            loading
               ? 'loading'
               : data?.map(item => (
                  <Card key={item.id} item={item} />
               ))
         }
      </div>
   )
}
