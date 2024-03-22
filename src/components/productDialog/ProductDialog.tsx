import CloseIcon from '@mui/icons-material/Close';
import SquareIcon from '@mui/icons-material/Square';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ProductDialogProps from './ProductDialogProps';

function ProductDialog({ product, handleClose }: ProductDialogProps) {
  return (
    <>
      <DialogTitle>Name: {product.name}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemText primary="ID" secondary={product.id} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Pantone value"
              secondary={product.pantone_value}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Year" secondary={product.year} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Color" secondary={product.color} />
            <SquareIcon fontSize="large" sx={{ color: product.color }} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="outlined"
          endIcon={<CloseIcon />}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
}

export default ProductDialog;
