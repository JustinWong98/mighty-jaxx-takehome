import { Card, CardProps, CardActionArea, CardMedia, CardActions, Typography, CardContent, Button } from '@mui/material';
import { useState } from 'react';
// import { styled } from "@mui/system";

import PlaceHolderIMG from '../../images/MightyJaxxIMG.jpg';

// interface StyledCardProps extends CardProps {
//     success?: boolean;
// }

const ProductCard = () => {
    const [state, setState] = useState({
        raised: false,
        shadow: 1
    });

    // const StyledCard = styled(Card)

    return (
        <Card sx={{ maxWidth: 310, transition: 'transform 0.15s ease-in-out' }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={PlaceHolderIMG} alt="to insert title" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Product Title
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="warning">
                    Delete
                </Button>
                <Button size="small" color="info">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
