declare const useFetchData: <T>(function_: () => Promise<T>) => {
  data: T | undefined;
  isLoading: boolean;
  error: string | undefined;
  refetch: () => Promise<void>;
};
export default useFetchData;
