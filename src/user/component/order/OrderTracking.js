import { Step, StepLabel, Stepper } from "@mui/material"

const steps = ["Placed", "Order Confirmed", "Shipped", "Delivered"]

const OrderTracking = ({ activeStep }) => {
    return (
        <div className="w-full">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => <Step>
                    <StepLabel sx={{ color: "#9155FD", fontSize: "40px"}}>
                        {label}
                    </StepLabel>
                </Step>)}
            </Stepper>
        </div>
    )
}

export default OrderTracking
