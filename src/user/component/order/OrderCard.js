import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/user/order/${item._id}`)}
            className="p-5 shadow-lg hover:shadow-xl border border-gray-300 rounded-md"
        >
            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                {item?.orderItems?.map((orderItem) => (
                    <Grid container key={orderItem._id} spacing={2}>
                        <Grid item xs={6}>
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
                        <Grid item xs={2}>
                            <p>₹{orderItem?.discountedPrice}</p>
                        </Grid>
                    </Grid>

                ))}

                <Grid item xs={4}>
                    <div>
                        {item?.orderStatus}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default OrderCard;
