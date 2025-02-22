import { Box, Button, TextField } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createOrder } from "../../../state/order/Action"
import { useEffect } from "react"

const DeliveryAddForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const order = useSelector(state => state.order.order)

    // Handling form submission to create an order
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const address = {
            firstname: data.get("firstname"),
            lastname: data.get("lastname"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zipCode"),
            phoneNumber: data.get("phoneNumber")
        }
        const orderData = {address}
        dispatch(createOrder(orderData))
    }

    // useEffect hook to navigate to the next step when the order ID is available
    const orderId = order?.data?.saveOrder?._id
    useEffect(() => {
        if (orderId) {
            navigate(`?step=3&order_id=${orderId}`);
        }
    }, [orderId, navigate])
    
    return (
        <div>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                    <Box className="border rounded-s-md shadow-md p-5">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        id="firstname"
                                        name="firstname"
                                        label="First Name"
                                        autoComplete="given-name"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        id="lastname"
                                        name="lastname"
                                        label="Last Name"
                                        autoComplete="given-name"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        id="address"
                                        name="address"
                                        label="Address"
                                        autoComplete="given-name"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        id="city"
                                        name="city"
                                        label="City"
                                        autoComplete="given-name"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        id="state"
                                        name="state"
                                        label="State"
                                        autoComplete="given-name"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        id="zipCode"
                                        name="zipCode"
                                        label="Zip / Postal code"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone  Number"
                                        autoComplete="given-name"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Button variant="contained" sx={{ bgcolor: "blueviolet", py: "10px", px: 6, mt: "20px", fontSize: "16px" }} type="submit">
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default DeliveryAddForm
