import React from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import emailjs from "emailjs-com";
import { Link } from 'react-router-dom';

import FormInput from './Checkout/CustomTextField'

const AdressForm = ( { next }) => {
    

    function sendEmail(e) {
        e.preventDefault();
        
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE, e.target, process.env.REACT_APP_EMAILJS_USER_ID).then(res=>{
            console.log(res.text);
        }).catch(err=> console.log(err));
    }

    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom>Datos de facturacion</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data}))} >
                    <Grid container spacing={3}>
                        <FormInput  name='nombre' label='Nombre y apellidos'/>
                        <FormInput  name='direccion' label='Direccion'/>
                        <FormInput  name='ciudad' label='Ciudad'/>
                        <FormInput  name='cp' label='Codigo Postal'/>
                        <FormInput  name='email' label='Email'/>
                        <FormInput  name='nroTelefono' label='Numero de telefono'/>
                        
                    </Grid>
                    
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button component={Link} variant="outlined" to="/carrito">Volver al carrito</Button>
                    <Button type="submit" variant="contained" color="primary">Proximo</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AdressForm
