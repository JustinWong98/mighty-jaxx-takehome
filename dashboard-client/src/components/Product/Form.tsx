import {useState} from "react";
import { Container, AppBar, Typography, Grow, Grid, FormControl } from "@mui/material";

const ProductForm = () => {
    const [productData, setProductData] = useState({ SKU: 0, title: '', image: null, tags: [], selectedFile: '' });
    return (
        <Container>

        </Container>
    )
}

export default ProductForm;