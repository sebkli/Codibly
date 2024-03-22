import { Dialog } from '@mui/material';
import { render, screen } from '@testing-library/react';
import Product from '../../interfaces/Product';
import ProductDialog from './ProductDialog';

describe('ProductDialog', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    year: 2022,
    color: '#FFFFFF',
    pantone_value: '12345',
  };

  it('renders product details correctly', () => {
    render(
      <Dialog open onClose={() => {}}>
        <ProductDialog product={mockProduct} handleClose={() => {}} />
      </Dialog>
    );
    expect(screen.getByText('Name: Test Product')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Pantone value')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('#FFFFFF')).toBeInTheDocument();
  });
});
