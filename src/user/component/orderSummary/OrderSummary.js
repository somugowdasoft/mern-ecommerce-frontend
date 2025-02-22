import { Button, Divider } from "@mui/material"
import CartItem from "../cart/CartItem"
import AddressCard from "../deliveryAddressForm/AddressCard"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getOrderById } from "../../../state/order/Action"
import { createPayment, paymentVerification } from "../../../state/payment/Action"

const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const order = useSelector((state) => state.order.order)
    const payment = useSelector((state) => state.payment.payment)

    // Extract the orderId query parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id")

    // useEffect hook to fetch order details, when 'orderId' changes
    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [dispatch, orderId])

    // useEffect hook to trigger the creation of a payment when amount is available
    const amount = order?.data?.order?.totalDiscountPrice
    useEffect(() => {
        if(amount) {
            dispatch(createPayment(amount, 'INR'));
        }
    }, [dispatch, amount])

    // Function to handle the payment process using Razorpay
    const handlePayment = () => {
        const options = {
            key: process.env.ROZ_KEY_ID,
            amount: amount,
            currency: 'INR',
            name: 'SHOPPER',
            description: `Payment for product`,
            order_id: payment?.data?.id,
            handler: async (response) => {
                dispatch(paymentVerification(  payment?.data?.id, response.razorpay_payment_id, response.razorpay_signature, orderId))
            },
            theme: {
                color: '#F37254',
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }

    // useEffect hook to navigate to the success page when payment is successful
    useEffect(() => {
        if(payment?.data?.success) {
            navigate("/payment-success")
        }
    }, [payment, navigate])

    return (
        <div>
            <div className="p-5 shadow-lg rounded-md border">
                <AddressCard address={order?.data?.order?.shippingAddress}/>
            </div>
            <div className="my-6">
                <div className="lg:grid grid-cols-3 relative">
                    <div className="col-span-2">
                        {order?.data?.order?.orderItems?.map((item) => <CartItem item={item} />)}
                    </div>

                    <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                        <div className="border p-5">
                            <p className="uppercase font-bold opacity-60 pb-4"> Price Details </p>
                            <Divider />
                            <div className="space-y-3 font-semibold">
                                <div className="flex justify-between pt-3 text-black">
                                    <span> Price </span>
                                    <span> ₹{order?.data?.order?.totalPrice} </span>
                                </div>
                                <div className="flex justify-between pt-3 text-black">
                                    <span> Discount </span>
                                    <span className="text-green-600"> -₹{order?.data?.order?.discount} </span>
                                </div>
                                <div className="flex justify-between pt-3 text-black">
                                    <span> Delivery Charges </span>
                                    <span className="text-green-600"> Free </span>
                                </div>
                                <Divider />
                                <div className="flex justify-between pt-3 text-black font-bold">
                                    <span> Total Amount </span>
                                    <span className="text-green-600"> ₹{order?.data?.order?.totalDiscountPrice} </span>
                                </div>
                            </div>
                            <Button variant="contained" sx={{ bgcolor: "blueviolet", mt: "20px", width: "100%" }} onClick={handlePayment}>
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
