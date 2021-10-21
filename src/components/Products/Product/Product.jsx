import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, IconButton, Paper} from '@material-ui/core'
import {  ThemeProvider, createTheme} from '@material-ui/core/styles'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles'; 


const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();





    return (
        
            
            <Card className={classes.root}>
                {/* <Link to={`vista-producto/${product.id}`} style={{ textDecoration: 'none' }}> */}
                <CardActionArea component={Link} to={`vista-producto/${product.id}`} >
                <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
                    <CardContent>
                        <div className={classes.CardContent}>
                            <Typography variant="h5" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="h5">
                                {product.price.formatted_with_symbol}
                            </Typography>
                        </div>
                        <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary"/>
                    </CardContent>
                    </CardActionArea>
                    {/* </Link> */}
                    <CardActions disableSpacing className={classes.CardActions}>
                        <IconButton aria-label="Agregar al carrito" onClick={() => onAddToCart(product.id, 1)}>
                            <AddShoppingCart/>
                        </IconButton>
                    </CardActions>
            </Card>
            
            
    );
}

export default Product

