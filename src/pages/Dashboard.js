import { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Rating,
  Box,
  TextField,
  Pagination,
  Paper,
  Chip,
  Avatar,
  InputAdornment,
  Skeleton,
  Checkbox,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import ProductModal from '../components/ProductModal';
import { fetchItems, addItem, updateItem, deleteItem } from '../services/itemServices';
import { getImageUrl } from '../services/imageUrl'
import Header from '../components/Header'
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const data = await fetchItems();
        setProducts(data);
        console.log(data)
      } catch (err) {
        console.error('Failed to fetch items', err);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);



  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setProducts(products.filter(p => p._id !== id));
      window.location.reload();
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditProduct(null);
  };

  const handleProductSave = async (formData) => {
    try {
      if (editProduct && editProduct.id) {
        // ✅ Use FormData version for update too
        await updateItem(editProduct.id, formData);
      } else {
        await addItem(formData);
      }
  
      handleModalClose();
      window.location.reload();
    } catch (err) {
      console.error('Save error', err);
    }
    window.location.reload()
  };
  

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const StatusIndicator = ({ value }) => (
    <Checkbox
      checked={value}
      color="primary"
      disabled
      sx={{ p: 0, '&.Mui-disabled': { color: value ? 'success.main' : 'grey.500' } }}
    />
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
<Header />

      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600,color:"#0A3663" }}>
            Products
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              sx={{ textTransform: 'none',backgroundColor:"#0A3663" }}
            >
              Add Product
            </Button>
          </Box>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
          <TableContainer>
            <Table sx={{ minWidth: 1200 }}>
              <TableHead sx={{ backgroundColor: 'grey.100' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 ,color:"white"}}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}} >Image</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}} >Country</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}}  align="center">Top Selling</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}}  align="center">Banner</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}}  align="center">Top 3</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}}  align="center">Top Brand</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}} >Category</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}} >Rating</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}} >Price</TableCell>
                  <TableCell sx={{ fontWeight: 600,color:"white"}} >Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from({ length: productsPerPage }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton variant="text" /></TableCell>
                      <TableCell><Skeleton variant="rectangular" width={40} height={40} /></TableCell>
                      <TableCell><Skeleton variant="text" width={80} /></TableCell>
                      <TableCell align="center"><Skeleton variant="circular" width={24} height={24} /></TableCell>
                      <TableCell align="center"><Skeleton variant="circular" width={24} height={24} /></TableCell>
                      <TableCell align="center"><Skeleton variant="circular" width={24} height={24} /></TableCell>
                      <TableCell align="center"><Skeleton variant="circular" width={24} height={24} /></TableCell>
                      <TableCell><Skeleton variant="text" width={100} /></TableCell>
                      <TableCell><Skeleton variant="text" width={80} /></TableCell>
                      <TableCell><Skeleton variant="text" width={60} /></TableCell>
                      <TableCell>
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} sx={{ ml: 1 }} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  paginatedProducts.map((product) => (
                    
                    <TableRow
                      key={product._id}
                      hover
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'action.hover' },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ref: {product._id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {product.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Avatar
                          src={getImageUrl(product.imageFileId)}
                          alt={product.name}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar
                            src={`https://flagcdn.com/${product.country.toLowerCase().slice(0,2)}.svg`}
                            alt={product.country}
                            sx={{ width: 24, height: 24 }}
                          />
                          {product.country}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <StatusIndicator value={product.topSelling} />
                      </TableCell>
                      <TableCell align="center">
                        <StatusIndicator value={product.banner} />
                      </TableCell>
                      <TableCell align="center">
                        <StatusIndicator value={product.top3} />
                      </TableCell>
                      <TableCell align="center">
                        <StatusIndicator value={product.topbrand} />
                      </TableCell>
                      <TableCell>
                        <Chip label={product.category} size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={product.rating} precision={0.5} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {product.rating}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            ${product.price}
                          </Typography>
                          {product.discount > 0 && (
                            <Typography variant="body2" color="error.main">
                              -${product.discount}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            onClick={() => handleEdit(product)}
                            size="small"
                            sx={{ color: '#0A3663' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(product.id)}
                            size="small"
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>

        <ProductModal
          open={modalOpen}
          onClose={handleModalClose}
          onSave={handleProductSave}
          product={editProduct}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;