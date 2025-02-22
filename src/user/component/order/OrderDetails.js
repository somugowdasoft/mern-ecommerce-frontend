import Grid from "@mui/material/Grid2"
import AddressCard from "../deliveryAddressForm/AddressCard"
import OrderTracking from "./OrderTracking"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getOrderById } from "../../../state/order/Action"


const OrderDetails = () => {
    const dispatch = useDispatch();
    const orderId = useParams();
    const order = useSelector((state) => state.order.order)

    // useEffect hook to fetch order details, when orderId changes
    useEffect(() => {
        dispatch(getOrderById(orderId?.orderId))
    }, [dispatch, orderId])

    // active step based on the order's status (for OrderTracking)
    let activeStep = 0;
    if (order?.data?.order.orderStatus === "CONFIRMED") {
        activeStep = 1;
    } else if (order?.data?.order.orderStatus === "SHIPPED") {
        activeStep = 2;
    } else if (order?.data?.order.orderStatus === "DELIVERED") {
        activeStep = 3;
    }

    return (
        <div className="px-5 lg:px-20 mt-10">
            <div className="p-5 shadow-lg rounded-md border">
                <h1 className="font-bold text-lg py-6"> Delivery Address </h1>
                <AddressCard address={order?.data?.order?.shippingAddress} />
            </div>

            <div className="py-20">
                <OrderTracking activeStep={activeStep} />
            </div>

            <div className="p-5 shadow-lg hover:shadow-xl border border-gray-300 rounded-md">
                <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                    {order?.data?.order?.orderItems?.map((orderItem) => (
                        <Grid container key={orderItem._id} spacing={2}>
                            <Grid size={8}>
                                <div className="flex items-center cursor-pointer">
                                    <img
                                        className="w-[80px] h-[80px] object-cover object-top"
                                        src={orderItem?.product?.imageUrl}
                                        alt={orderItem?.product?.title}
                                    />
                                    <div className="ml-5 space-y-2">
                                        <p>{orderItem?.product?.title}</p>
                                        <p className="opacity-50 text-xs font-semibold">
                                            Size: {orderItem?.size}
                                        </p>
                                        <p className="opacity-50 text-xs font-semibold">
                                            Color: {orderItem?.product?.color}
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid size={4} sx={{ fontWeight: 600 }}>
                                <p>₹{orderItem?.discountedPrice}</p>
                            </Grid>
                        </Grid>
                    ))}

                </Grid>
            </div>
        </div>
    )
}

export default OrderDetails
