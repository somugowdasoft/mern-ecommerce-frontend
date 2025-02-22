import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DeliveryAddForm from '../deliveryAddressForm/DeliveryAddForm';
import OrderSummary from '../orderSummary/OrderSummary';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const location = useLocation()

    // query string to retrieve the step value from the URL
    const querySearch = new URLSearchParams(location.search);
    const step = parseInt(querySearch.get("step"), 10)
    
    // Function to decrease the active step by 1
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="px-10 lg:px-20 mt-10">
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                        </Box>

                        <Box className="mt-10">
                            {step===2 ? <DeliveryAddForm /> : <OrderSummary />}
                        </Box>
                    </Fragment>
                )}
            </Box>
        </div>
    );
}

export default Checkout
