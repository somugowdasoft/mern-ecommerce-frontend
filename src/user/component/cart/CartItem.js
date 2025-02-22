import { Button, IconButton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../state/cart/Action";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleupdateCartItem = (num) => {
        const newQuantity = item?.quantity + num;
        if (newQuantity > 0) {
            dispatch(updateCartItem(item?._id, newQuantity));
        }
    };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item?._id));
    };

    return (
        <div className="p-5 shadow-lg border rounded-md mb-6">
            <div className="flex items-center">
                <div className="w-[80px] h-[80px] lg:w-[140px] lg:h-[140px]">
                    <img className="w-full h-full object-cover object-top" src={item.product?.imageUrl} alt="productImg" />
                </div>

                <div className="ml-5 space-y-1">
                    <p className="font-semibold">{item.product?.title}</p>
                    <p className="opacity-70 text-sm"> Size: {item?.size}, {item.product?.color} </p>
                    <p className="opacity-70 text-sm"> Seller: {item?.product?.brand}</p>
                    <div className="flex space-x-3 items-center text-gray-900 pt-2">
                        <p className="font-semibold"> ₹{item?.discountedPrice} </p>
                        <p className="opacity-50 line-through"> ₹{item?.price} </p>
                        <p className="text-green-600 font-semibold"> {item?.product?.discountPersent}% off </p>
                    </div>
                </div>
            </div>

            <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className="flex items-center lg:space-x-2">
                    <IconButton sx={{ color: "#8a2be2" }} onClick={() => handleupdateCartItem(-1)} disabled={item?.quantity <= 1}>
                        <RemoveCircleOutline />
                    </IconButton>
                    <span className="py-1 px-7 border rounded-md">
                        {item?.quantity}
                    </span>
                    <IconButton sx={{ color: "#8a2be2" }} onClick={() => handleupdateCartItem(1)}>
                        <AddCircleOutline />
                    </IconButton>
                </div>
                <div>
                    <Button sx={{ bgcolor: "red", color: "white", px: "16px", ":hover": { bgcolor: "#ed0000" } }} onClick={handleRemoveCartItem}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
