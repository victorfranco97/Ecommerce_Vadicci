import React, { useState }from 'react'
import { Typography, Button, Divider } from '@material-ui/core';
import emailjs from "emailjs-com";
import Review from './Review'


const PaymentForm = ( {checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout, timeout} ) => {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const templateParams = {
            to: shippingData.email,
            nombre: shippingData.nombre,
            direccion: shippingData.direccion,
            ciudad: shippingData.ciudad,
            carrito: '<ul>' + checkoutToken.live.line_items.map((product, productId) => (
                
                '<li>'+'<pre>'+'<h2 >'+product.name+'</h2>'+'<h3>'+"Cantidad: "+product.quantity+'</h3>'+
                '<h4>'+"Precio total del: "+product.line_total.formatted_with_symbol+'</h4>'+'</pre>'+'</li>'
            )).join('') + '</ul>',
            total: checkoutToken.live.subtotal.formatted_with_symbol
        }

        emailjs.send('service_2qmfjqu', 'template_r7ix4c3', templateParams, "user_LBA6XIGxn6468v8Ye7ooN")
        .then(res=>{console.log(res.text)})
        .catch(err=> console.log(err));


        const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: { firstName: shippingData.nombre, email: shippingData.email },
            shipping: { name: 'Nacional', 
            street: shippingData.direccion, 
            town_city: shippingData.ciudad, 
            county_state: 'AR-M', 
            postal_zip_code: shippingData.cp, 
            country: 'AR' 
            }
            // fulfillment: { shipping_method: '' },
            // payment: {
             //     gateway: '' 
        }
        
        
        
        
        onCaptureCheckout(checkoutToken.id, orderData);
        
        timeout();

        nextStep();
    
    };

    return (
        <>
            <Review checkoutToken={checkoutToken} />

            <form onSubmit={(e) => handleSubmit(e)}>
                
                <br /> <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" onClick={backStep}>Back</Button>
                    <Button type="submit" variant="contained" color="primary">
                Enviar {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
                </div>
            </form>
        </>
    )

};
export default PaymentForm
