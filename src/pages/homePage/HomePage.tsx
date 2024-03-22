import { CircularProgress, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductsList from '../../components/productsList/ProductsList';
import Product from '../../interfaces/Product';

function HomePage() {
  const fetchProducts = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<{
    data: Product[];
    currentPage: number;
    nextPage: number | null;
  }> => {
    const { data } = await axios.get(
      `https://reqres.in/api/products?page=${pageParam}`
    );

    return {
      data: data.data,
      currentPage: pageParam,
      nextPage: pageParam < data.total_pages ? pageParam + 1 : null,
    };
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        Loading... <CircularProgress size={90} />
      </Typography>
    );
  }

  if (error || !data) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        {error?.message || 'Something went wrong'}, try again later
      </Typography>
    );
  }

  return (
    <ProductsList
      products={data.pages.flatMap((page) => page.data)}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      fetchNextPage={fetchNextPage}
      fetchPreviousPage={fetchPreviousPage}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
    />
  );
}

export default HomePage;
