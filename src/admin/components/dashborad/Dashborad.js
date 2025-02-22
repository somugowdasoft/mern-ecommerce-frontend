import { useEffect } from 'react';
import Achievement from "./Achivement";
import Grid from '@mui/material/Grid2';
import MonthlyOverview from "./MonthlyOverview";
import Products from '../product/Products';
import Order from '../order/Order';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../../state/user/Action';

const Dashboard = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.order.orders);
    const users = useSelector(state => state.users.users);

    // function to format numbers as readable format
    const formatNumber = (num) => {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + 'M'; 
        }
        if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + 'k'; 
        }
        return num;
    };

    // Calculate the total revenue from orders
    const totalRevenue = orders?.data?.orders?.reduce((total, order) => {
        const orderTotal = order.totalDiscountPrice && !isNaN(order.totalDiscountPrice) ? order.totalDiscountPrice : 0;
        return total + orderTotal;
    }, 0);

    // Fetch all users
    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch])

    return (
        <Grid container spacing={2} sx={{ my: 4, width: "100%", px:4}}>
            <Grid size={{ xs: 12, md: 4}}>
                <Achievement totalRevenue={formatNumber(totalRevenue)} />
            </Grid>
            <Grid size={{ xs: 12, md: 8}}>
                <MonthlyOverview totalRevenue={formatNumber(totalRevenue)} orders={orders} users={users} />
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <Products />
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <Order />
            </Grid>
        </Grid>
    );
};

export default Dashboard;