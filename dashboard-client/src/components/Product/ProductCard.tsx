import { Card, CardProps, CardActionArea, CardMedia, CardActions, Typography, CardContent, Button, CardHeader } from '@mui/material';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ProductListing } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteProduct, productFailure, writeProductSuccess } from './productSlice';
import Cookies from 'js-cookie';
// import { styled } from "@mui/system";

// interface StyledCardProps extends CardProps {
//     success?: boolean;
// }

const ProductCard = ({ sku, title, image }: ProductListing) => {
    // const StyledCard = styled(Card)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector((state) => state.products);
    const [serverError, setServerError] = useState(error);
    const handleDelete = async () => {
        const deleteRes = await dispatch(deleteProduct(sku));
        if (deleteRes.type === 'products/deleteProduct/rejected') {
            dispatch(productFailure(deleteRes.payload));
            setServerError(deleteRes.payload.data.message);
        } else if (deleteRes.type === 'products/deleteProduct/fulfilled') {
            dispatch(writeProductSuccess());
            navigate('/dashboard');
        }
    };

    return (
        <Card sx={{ maxWidth: 310, transition: 'transform 0.15s ease-in-out', height: 300, backgroundColor: '#fccf01' }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={image} alt={`${title}`} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        SKU: {sku}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="warning" onClick={handleDelete}>
                    Delete
                </Button>
                <Link to={`/product/${sku}`}>
                    <Button size="medium" color="info">
                        Edit
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
