import { Table, TableBody } from '@mui/material';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Product from '../../interfaces/Product';
import ProductItem from './ProductItem';

describe('ProductItem', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    year: 2022,
    color: '#FFFFFF',
    pantone_value: '12345',
  };

  it('renders without crashing', () => {
    render(
      <Table>
        <TableBody>
          <ProductItem product={mockProduct} />
        </TableBody>
      </Table>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('opens dialog on row click', async () => {
    render(
      <Table>
        <TableBody>
          <ProductItem product={mockProduct} />
        </TableBody>
      </Table>
    );
    await fireEvent.click(screen.getByText('Test Product'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes dialog on close click', async () => {
    render(
      <Table>
        <TableBody>
          <ProductItem product={mockProduct} />
        </TableBody>
      </Table>
    );
    await fireEvent.click(screen.getByText('Test Product'));
    const closeButton = await screen.findByRole('button', { name: 'Close' });
    await fireEvent.click(closeButton);
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });
});
