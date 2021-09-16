import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button  } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import useStyles from './styles'; 
import AdressForm from '../AdressForm'
import PaymentForm from '../PaymentForm';


const steps = ['Datos de facturacion', 'Revisar y confirmar']


const Checkout = ( {cart, onCaptureCheckout, order, error}) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();


    
    useEffect(() => {
        if (cart.id) {
        const generateToken = async () => {
            try {
            const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
            setCheckoutToken(token);
            } catch {
            if (activeStep !== steps.length) history.push('/');
            }
        };
    
        generateToken();
        }
    }, [cart]);
    
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        console.log("Aca vemos si llega la data")
        console.log(data)
        nextStep();
    };

    const timeout = () =>{
        setTimeout(()=>{
            setIsFinished(true);
        }, 3000);
    }


    let Confirmation = () => order.customer ? (
        <>
        <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} !</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
    ) : isFinished ? (
        <>
        <div>
            <Typography variant="h5">Gracias por tu compra, revisa tu correo electronico para seguir con la compra!!</Typography>
            <Divider className={classes.divider} />
            
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Volver al Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    
    if (error) {
    <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Volver al Home</Button>
    </>
    }

    const Form = () => activeStep===0
        ? <AdressForm nextStep={nextStep} setShippingData={setShippingData} next={next}/>
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>
        
    return (
        <>
        <CssBaseline />
        <div className={classes.toolbar}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Pagar</Typography>
                    <Stepper  activeStep={activeStep} className={classes.stepper} >
                        {steps.map((label)=>(
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>         
                            </Step>
                            
                        ))}
                    </Stepper>
                    {activeStep=== steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </div>
        </>
    )
}


export default Checkout
