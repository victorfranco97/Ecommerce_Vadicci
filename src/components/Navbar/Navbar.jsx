import React, {useState} from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Switch } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import {Link, useLocation} from 'react-router-dom';

import logo from '../../assets/fire.png'
import useStyles from './styles'

const Navbar = ( {totalItems, cambiarTema} ) => {
    const classes = useStyles();
    const location = useLocation();


    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Vadicci Store" heigth="25px" className={classes.image} />
                    Vadicci Store
                </Typography>
                <div className={classes.grow}/>
                {location.pathname === '/' && (
                <div className={classes.button}>
                    <IconButton component={Link} to="/carrito" aria-label="Mostrar carrito" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                </div> )}
                 {/*<Switch

                    onChange={cambiarTema}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> */}
            </Toolbar>
        </AppBar>   
        </>
    )
}

export default Navbar
