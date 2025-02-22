import { Routes, Route } from "react-router-dom";
import HomePage from '../user/pages/home/HomePage'
import Navbar from '../user/component/navbar/Navbar'
import Footer from '../user/component/footer/Footer'
import Product from '../user/component/product/Product'
import ProductDetails from '../user/component/productDetails/ProductDetails'
import Cart from '../user/component/cart/Cart'
import Checkout from '../user/component/checkout/Checkout'
import Order from '../user/component/order/Order'
import OrderDetails from '../user/component/order/OrderDetails'
import PaymentSuccess from '../user/pages/paymentSuccess/PaymentSuccess'
import NotFound from "../user/pages/notfoundPage/NotFound";


const UserRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<HomePage />} />
                <Route path="/login" element={<HomePage />} />
                <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/user/order" element={<Order />} />
                <Route path="/user/order/:orderId" element={<OrderDetails />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default UserRoutes
