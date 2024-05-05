import { useCallback, useEffect, useState } from 'react';

// Assuming the function passed to useAppwrite returns a Promise of type T
const useFetchData = <T,>(function_: () => Promise<T>) => {
  // State to store data with initial empty array, typed as T[]
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string | undefined>();
  // State to store loading status, typed as boolean
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Memoize fetchData using useCallback to prevent redefinition unless function_ changes
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await function_();
      setData(response);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [function_]); // Dependency array includes function_

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const refetch = async () => fetchData();

  // Return type explicitly typed with the structure of the returned object
  return { data, isLoading, error, refetch };
};

export default useFetchData;
