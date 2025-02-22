import Grid from "@mui/material/Grid2"
import { useDispatch, useSelector } from "react-redux"
import { getUserOrder } from "../../../state/order/Action"
import React, { Suspense, useEffect } from "react";
const OrderCard = React.lazy(() => import("./OrderCard"));

const Order = () => {
    const order = useSelector((state) => state.order.orders)
    const dispatch = useDispatch()

    // useEffect hook to fetch user orders 
    useEffect(() => {
        dispatch(getUserOrder())
    }, [dispatch])

    return (
        <div className="px-5 lg:px-20 mt-10">
            <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid size={{ xs: 12 }}>
                    <div className="space-y-5">
                        <Suspense fallback={<div className="text-black">Loading orders...</div>}>
                            {/* Check if orders exist before mapping */}
                            {order?.data?.orders?.length > 0 ? (
                                order.data.orders.map((item) => (
                                    <OrderCard key={item._id} item={item} />
                                ))
                            ) : (
                                <div className="text-black text-center">No orders found</div>
                            )}
                        </Suspense>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default Order