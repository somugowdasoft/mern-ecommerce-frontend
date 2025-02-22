import { Box, Button, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import Dashborad from './components/dashborad/Dashborad';
import CreateProduct from './components/product/CreateProduct';
import Products from './components/product/Products';
import Order from './components/order/Order';
import User from './components/user/User';
import { logout } from '../state/auth/Action';
import { useDispatch } from 'react-redux';

const menu = [
    { name: "Dashborad", path: "/admin", icon: <DashboardIcon /> },
    { name: "Product", path: "/admin/products", icon: <InventoryOutlinedIcon /> },
    { name: "User", path: "/admin/users", icon: <AccountCircleOutlinedIcon /> },
    { name: "Order", path: "/admin/orders", icon: <ShoppingCartIcon /> },
    { name: "AddProduct", path: "/admin/product/create", icon: <PostAddIcon /> },
]

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
    const [sidebarVisible, setSidebarVisibal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Function to toggle the visibility of the sidebar
    const toggleDrawer = (newsidebarVisible) => () => {
        setSidebarVisibal(newsidebarVisible);
    };

    // Function to handle logout
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const drawer = (
        <Box sx={{ overflow: "auto", display: "flex", flexDirection: "column", height: "100%" }}>
            {isLargeScreen && <Toolbar />}
            <List>
                {menu.map((item, index) => <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText>
                            {item.name}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>)}
            </List>
            <List sx={{ marginTop: 'auto' }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>
                            LOGOUT
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <div className="flex w-full">
            <Box sx={{ display: `${isLargeScreen}` ? "flex" : "block" }} >
                <CssBaseline />

                {isLargeScreen ? (
                    <Drawer
                        variant="permanent"
                        open={true}
                        sx={{
                            width: 240
                        }}
                    >
                        {drawer}
                    </Drawer>
                ) : (
                    <>
                        <Button onClick={toggleDrawer(true)} sx={{
                            position: "fixed",
                            top: 16,
                            left: 16,
                            zIndex: 1200,
                        }}><FormatAlignLeftIcon /></Button>
                        <Drawer
                            open={sidebarVisible}
                            onClose={toggleDrawer(false)}
                            sx={{
                                width: 240
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </>
                )}
            </Box>
            <Box sx={{
                marginLeft: isLargeScreen ? 0 : '140px',
                marginTop: isLargeScreen ? 0 : '56px',
                transition: 'margin-left 0.3s ease-in-out',
            }}>
                <Routes>
                    <Route path='/' element={<Dashborad />} />
                    <Route path='/product/create' element={<CreateProduct />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/orders' element={<Order />} />
                    <Route path='/users' element={<User />} />
                </Routes>
            </Box>
        </div>
    )
}

export default Admin
