import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsList from './ProductsList';

describe('ProductsList', () => {
  test('renders "No products found." when there are no products', () => {
    render(
      <MemoryRouter initialEntries={['?page=1']}>
        <ProductsList
          products={[]}
          hasNextPage={false}
          hasPreviousPage={false}
          fetchNextPage={() => {}}
          fetchPreviousPage={() => {}}
          isFetchingNextPage={false}
          isError={false}
        />
      </MemoryRouter>
    );
    const noProductsMessage = screen.getByText('No products found.');
    expect(noProductsMessage).toBeInTheDocument();
  });
});
