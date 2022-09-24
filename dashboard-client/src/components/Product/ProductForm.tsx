import { useRef, useState, useEffect } from 'react';
import { Container, Typography, Grid, FormControl, CssBaseline, CircularProgress, Box, Avatar, TextField, Button, Link, IconButton } from '@mui/material';
import { InsertPhoto, LocalGroceryStoreOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import equal from 'fast-deep-equal';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../app/types';
import { addProduct, productPending, productSuccess, productFailure } from './productSlice';

const ProductForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const imageRef = useRef();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const serverError = useAppSelector((state) => state.auth.error);
    const [showServerError, setShowServerError] = useState(serverError);
    const [productData, setProductData] = useState({
        SKU: 0,
        title: ''
    });

    const [imageFile, setImageFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string>();

    const [errors, setErrors] = useState({
        SKU: '',
        title: '',
        image: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const noErrors = equal(errors, {
            SKU: '',
            title: '',
            image: ''
        });
        if (noErrors && isSubmitting) {
            const formData = new FormData();
            formData.append('image', imageFile!);
            formData.append('SKU', productData.SKU.toString());
            formData.append('title', productData.title);
            console.log(formData);
            dispatch(productPending());
            dispatch(addProduct(formData)).then((res) => {
                if (res.type === 'products/addProduct/rejected') {
                    dispatch(productFailure(res.payload));
                    setShowServerError(res.payload.data.message);
                } else if (res.type === 'products/addProduct/fulfilled') {
                    dispatch(productSuccess(res.payload));
                    // navigate('/dashboard');
                }
            });
        }
    }, [errors]);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsSubmitting(false);
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSubmitting(false);
        const { files } = e.target;
        setImageFile(files![0]);
        setImagePreview(URL.createObjectURL(files![0]));
    };

    const validateRegistration = ({ SKU, title, image }: Product) => {
        const newErrors = { SKU: '', title: '', image: '' };
        if (SKU === 0) {
            newErrors.SKU = 'SKU must be higher than 0';
        } else if (title.trim() === '') {
            newErrors.title = 'Title must not be empty';
        }
        if (image === null) {
            newErrors.image = 'Product must come with an image!';
        }
        setIsSubmitting(true);
        setErrors(newErrors);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ SKU: '', title: '', image: '' });
        validateRegistration({ ...productData, image: imageFile! });
    };

    return (
        <Container maxWidth="xs">
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LocalGroceryStoreOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add a New Product
                    </Typography>
                    {serverError && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{showServerError}</Typography>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="SKU"
                                    label="Enter SKU for Product"
                                    name="SKU"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={productData.SKU}
                                    onChange={handleOnChange}
                                />
                                {errors.SKU && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.SKU}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="title" label="Enter Product Title" id="title" value={productData.title} onChange={handleOnChange} />
                                {errors.title && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.title}</Typography>}
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography component="h4" variant="h6">
                                    {imagePreview ? 'Change Product Image' : 'Upload Product Image'}
                                </Typography>
                                <input type="file" id="icon-button-file" accept="image/*" style={{ display: 'none' }} onChange={handleSelectImage} />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                                        <InsertPhoto />
                                    </IconButton>
                                </label>
                                {errors.image && <Typography sx={{ fontWeight: 'bold', color: '#cc0000' }}>{errors.image}</Typography>}
                                {imagePreview && <img src={imagePreview} width="200" height="200" />}
                            </Grid>
                        </Grid>
                        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Add Product to Listing
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/dashboard" variant="body2">
                                    Go back to Dashboard
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default ProductForm;
