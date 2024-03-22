import { Dialog, TableCell, TableRow, Tooltip } from '@mui/material';
import { useState } from 'react';
import ProductDialog from '../productDialog/ProductDialog';
import ProductItemProps from './ProductItemProps';

function ProductItem({ product }: ProductItemProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="See details" placement="right-start">
        <TableRow
          onClick={handleOpen}
          hover
          sx={{
            cursor: 'pointer',
            bgcolor: product.color,
          }}
        >
          <TableCell component="th" scope="row" align="center">
            {product.id}
          </TableCell>
          <TableCell align="center">{product.name}</TableCell>
          <TableCell align="center">{product.year}</TableCell>
        </TableRow>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <ProductDialog product={product} handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default ProductItem;
