import { useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(url);
        console.log(res.data.data);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
