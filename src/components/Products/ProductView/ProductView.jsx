import React from 'react'
import { InputLabel, Grid, Button, Container, Typography, Select, MenuItem } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { commerce } from "../../../lib/commerce";
import { useState, useEffect } from "react";
import VariantSelector from './VariantSelector';

const createMarkup = (text) => {
    return { __html: text };
};

const ProductView = ({ onAddToCart, handleUpdateCartQty}) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [variants, setVariants] = useState([]);
    const [variant, setVariant] = useState('');
    const [loading, setLoading] = useState(true);



    const fetchProduct = async (id) => {
        const response = await commerce.products.retrieve(id);
        const { name, price, media, quantity, description} = response;
        setProduct({
        id,
        name,
        quantity,
        description,
        src: media.source,
        price: price.formatted_with_symbol,
        });
        
        
        console.log("response: ",response);
        if(response.variant_groups.length > 0 ){
            console.log("este producto tiene variants", response.id)
        }else{
            console.log("todo mal con las variants")
        }
    };

    // commerce.products.getVariants('prod_8XO3wpWNjNlYAz', {
    // limit: 15,
    //     page: 3,
    // }).then((variantes) => console.log("variantes.data: ",variantes.data));


    
        
    const handleQuantity = (param) => {
        if (param === "decries" && quantity > 1) {
        setQuantity(quantity - 1);
        }
        if (param === "increase" && quantity < 10) {
        setQuantity(quantity + 1);
        }
    };

    

    // const fetchVariants = async (idProd) => {
    //     const  {variants}  = await commerce.products.getVariants(idProd, {
    //         limit: 150,
    //         page: 3,
    //     });
    
    //     setVariants(variants);
    //     // setVariant(Object.keys(variants)[0]);
    // };

    

    useEffect(() => {
        const id = window.location.pathname.split("/");
        fetchProduct(id[2]);
        // console.log("venimos al fetchVariants")
        // fetchVariants(id[2]);
    }, []);



    
    // console.log("Las variants", variants)



    
    return (
        <Container className="product-view">
        <Grid container spacing={4}>
        <Grid item xs={12} md={8} className="image-wrapper">
            <img onLoad={() => {setLoading(false);}} 
            src={product.src} alt={product.name}/>
        </Grid>
        <Grid item xs={12} md={4} className="text">
            <Typography variant="h2">{product.name}</Typography>
            <Typography variant="h2" dangerouslySetInnerHTML={createMarkup(product.description)} />
            <Typography variant="h3">Price: {product.price}</Typography>
            <Grid container spacing={4}>
            
{/*             
                <div >
                    <Button type="button" size="small" onClick={() => onUpdateCartQty (item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty (item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Quitar</Button>
             */}
            <Grid item xs={12}>
                <Button size="small" variant="contained" className="increase-product-quantity" 
                    onClick={() => { handleQuantity("increase")}}>
                +
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Typography className="quantity" variant="h3">
                Quantity: {quantity}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button size="small" color="secondary" variant="contained"  
                    onClick={() => {handleQuantity("decries")}}>
                -
                </Button>
            </Grid> 
            
            
            {/* Condicionante de undefined*/}
            {product.id && <VariantSelector product={product}/> }
            
            <Grid item xs={12}>
                <Button size="large" className="custom-button"
                    onClick={() => {onAddToCart(product.id, quantity)}}>
                        <ShoppingCart /> Add to basket
                </Button>
            </Grid>
            </Grid>
        </Grid>
        </Grid>
        {/* {loading && <Spinner />} */}
    </Container>
    )
}

export default ProductView
