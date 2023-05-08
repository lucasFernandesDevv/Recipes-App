import { useState } from 'react';

const useFetch = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (URL) => {
    setLoading(true);
    try {
      const data = await fetch(URL);
      const results = await data.json();
      return results;
    } catch (e) {
      setError(e);
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, fetchData };
};

export default useFetch;
