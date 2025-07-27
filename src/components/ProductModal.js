import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Rating,
  Box,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getCountryOptions } from '../utils/countryList';

const countryOptions = getCountryOptions();

const categories =['Health and Beauty', 'Electronic Gadgets', 'Unique Items', 'Exotic Foods', 'Sports and Fitness',
  'Home Appliance and Decor','Kids and Babies','Travel & Outdoor','Office & Stationery','Toys & Hobbies','Auto & Accessories','Books & Learning','Gifts & Occasions','Home Cleaning & Storage'];

const initialFormData = {
  name: '',
  country: '',
  topSelling: false,
  banner: false,
  link: '',
  top3: false,
  topbrand: false,
  category: '',
  rating: 0,
  price: '',
  discount: '',
  totalSales: '',
};

function ProductModal({ open, onClose, onSave, product }) {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
      setFile(null);
    } else {
      setFormData(initialFormData);
      setFile(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (file) {
      form.append('image', file); // image is the field expected by the backend
    }

    onSave(form); // Pass FormData to parent handler
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{color:"#0A3663"}}>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Box>

          <FormControl fullWidth margin="normal">
  <InputLabel>Country</InputLabel>
  <Select
    name="country"
    value={formData.country}
    onChange={handleChange}
    label="Country"
  >
    {countryOptions.map((c) => (
      <MenuItem key={c.code} value={c.code}>
        {c.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Link"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, mb: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.topSelling}
                  onChange={handleChange}
                  name="topSelling"
                />
              }
              label="Top Selling"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.banner}
                  onChange={handleChange}
                  name="banner"
                />
              }
              label="Banner"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.top3}
                  onChange={handleChange}
                  name="top3"
                />
              }
              label="Top 3"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.topbrand}
                  onChange={handleChange}
                  name="topbrand"
                />
              }
              label="Top Brand"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleRatingChange}
              precision={0.5}
            />
          </Box>

          <TextField
            fullWidth
            margin="normal"
            label="Price ($)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Discount ($)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Total Sales"
            name="totalSales"
            type="number"
            value={formData.totalSales}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:"#9A1C25"}} className='cancelbutton'>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{backgroundColor:"#0A3663"}}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductModal;
