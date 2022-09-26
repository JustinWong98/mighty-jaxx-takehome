import { Container, Box, AppBar, Typography, Grow, Grid, CssBaseline, CircularProgress, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { RootState } from '../../app/store';

import ProductCard from '../Product/ProductCard';
import { fetchProducts } from '../Product/productSlice';
import ProductForm from '../Product/ProductForm';
import { useNavigate } from 'react-router-dom';
import { ProductListing } from '../../app/types';

export const Dashboard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector((state) => state.products.isLoading);
    const products = useAppSelector((state: RootState) => state.products.productList);
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                            navigate('/addProduct');
                        }}
                    >
                        Add a New Product
                    </Button>
                    <Grid container spacing={2}>
                        {products.map((product: ProductListing) => (
                            <Grid item xs={6}>
                                <ProductCard key={product.sku} sku={product.sku} title={product.title} image={product.image} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};
