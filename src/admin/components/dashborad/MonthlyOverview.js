import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Grid from '@mui/material/Grid2';
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';


const MonthlyOverview = ({totalRevenue, orders, users}) => {
    const products = useSelector(state => state.product.products);
    
    // Define the sales data structure with stats, title, color and icons
    const salesData = [
        {
            stats: `${products?.data?.content.length}`, 
            title: "Sales",
            color: "#EEC213",
            icon: <TrendingUpIcon sx={{ fontSize: "30px" }} />
        },
        {
            stats: `${users?.user?.length}`, 
            title: "User",
            color: "#45CE30",
            icon: <AccountCircleIcon sx={{ fontSize: "30px" }} />
        },
        {
            stats: `${orders?.data?.orders.length}`, 
            title: "Product",
            color: "#E71C23",
            icon: <PhonelinkIcon sx={{ fontSize: "30px" }} />
        },
        {
            stats: `$${totalRevenue}`, 
            title: "Revenue",
            color: "#3498DB",
            icon: <AttachMoneyIcon sx={{ fontSize: "30px" }} />
        }
    ];

    const renderStats = () => {
        return salesData.map((item, index) => (
            <Grid size={{ xs: 12, sm: 3 }} key={index}>
                <Box sx={{ display: "flex", alignItems: "center", mr: 8 }}>
                    <Avatar variant="rounded" sx={{ mr: 3, width: 44, height: 44, boxShadow: 3, color: "white", bgcolor: `${item.color}` }}>
                        {item.icon}
                    </Avatar>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption">
                            {item.title}
                        </Typography>
                        <Typography variant="h6">
                            {item.stats}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        ));
    };

    return (
        <Card sx={{ width: '100%', bgcolor: "#192A56", color: "white" }}>
            <CardHeader
                title="Monthly Overview"
                action={
                    <IconButton size="small">
                        <MoreVertIcon />
                    </IconButton>
                }
                subheader={
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600, mr: 1 }}>
                            Total 48% growth
                        </Box>
                        this Month
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2,
                        lineHeight: "32px !important",
                        letterSpacing: ".15px !important"
                    }
                }}
            />
            <CardContent>
                <Grid container>
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MonthlyOverview;
