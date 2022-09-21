import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from "../../app/store";

import ProductCard from "../Product/ProductCard";

export const Dashboard = () => {
    const products = useSelector((state: RootState) => state.products)

    return (
        <ProductCard />
    )
}