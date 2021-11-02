import React from 'react'
import { InputLabel, Grid, Button, Container, Typography, Select, MenuItem } from "@material-ui/core";
import { commerce } from "../../../lib/commerce";
import { useState, useEffect } from "react";

const VariantSelector = ({product}) => {
    const [variants, setVariants] = useState([]);
    const [variant, setVariant] = useState('');

    
    console.log("Id I got from fetchProduct in ProductView: ", product.id);
    
    const fetchVariants = async (id) => {
        console.log("Id from fetchVariants: ", id);
        const { data } = await commerce.products.getVariants(id);
        console.log(" {data} : ", data);
        setVariants(data);
        setVariant(Object.keys(variants)[0]);
    };
    

    useEffect(() => {
        const id= product.id;
        console.log("Id from useEffect: ", id);
        fetchVariants(id);

        commerce.products.getVariants('prod_8XO3wpWNjNlYAz', {
            limit: 150,
            page: 3,
        }).then((variants) => console.log("Variants how the documentation with my product.id: ",variants.data));
    }, []);
    console.log("Now see the variants: ", variants);
    return (

        <Grid item xs={12} sm={6}>
        <InputLabel>Talle</InputLabel>
            <Select value={variant} fullWidth onChange={(e) => setVariant(e.target.value)}>
                {Object.entries(variants).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                    {item.label}
                    </MenuItem>
                ))}
            </Select>
        </Grid>
    )
}

export default VariantSelector
