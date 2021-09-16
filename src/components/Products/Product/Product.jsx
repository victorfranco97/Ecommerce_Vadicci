import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Paper} from '@material-ui/core'
import {  ThemeProvider, createTheme} from '@material-ui/core/styles'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles'; 

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();





    return (
        
            <Paper className={classes.root}>
            <Card className={classes.root}>
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
                    <CardActions disableSpacing className={classes.CardActions}>
                        <IconButton aria-label="Agregar al carrito" onClick={() => onAddToCart(product.id, 1)}>
                            <AddShoppingCart/>
                        </IconButton>
                    </CardActions>
            </Card>
            </Paper>
            
    );
}

export default Product

