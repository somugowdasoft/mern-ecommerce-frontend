import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, deleteOrder, deliveredOrder, getOrder, shipOrder } from '../../../state/order/Action'
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Order = () => {
    const dispatch = useDispatch()
    const order = useSelector(state => state.order.orders)
    const [anchorEl, setAnchorEl] = useState([]);

    // Create a new array of anchor elements and update the specific index with the event current target
    const handleClick = (event, index) => {
        const newAnchorEl = [...anchorEl]
        newAnchorEl[index] = event.currentTarget
        setAnchorEl(newAnchorEl)
    };

    // Closes the menu and the anchor element at the given index to null
    const handleClose = (index) => {
        const newAnchorEl = [...anchorEl]
        newAnchorEl[index] = null
        setAnchorEl(newAnchorEl)
    };

    // useEffect hook to dispatch the getOrder
    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])

    // handler for marking the order as shipped
    const handleShippedOrder = (orderId) => {
        dispatch(shipOrder(orderId))
        handleClose()
    }
    // handler for marking the order as confirmed
    const handleConfirmedOrder = (orderId) => {
        dispatch(confirmOrder(orderId))
        handleClose()
    }
    // handler for marking the order as delivered
    const handleDeliveredOrder = (orderId) => {
        dispatch(deliveredOrder(orderId))
        handleClose()
    }
    // handler for deleting the order
    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId))
    }

    return (
        <Card className="mt-4">
            <CardHeader title="All Order">
            </CardHeader>
            <TableContainer component={Paper} sx={{ bgcolor: "#192A56" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Image</TableCell>
                            <TableCell sx={{ color: "white" }}>Title</TableCell>
                            <TableCell align="left" sx={{ color: "white" }}>Brand</TableCell>
                            <TableCell align="left" sx={{ color: "white" }}>Price</TableCell>
                            <TableCell align="left" sx={{ color: "white" }}>Total Item</TableCell>
                            <TableCell align="left" sx={{ color: "white" }}>Status</TableCell>
                            <TableCell align="left" sx={{ color: "white" }}>Update</TableCell>
                            <TableCell align="left" sx={{ color: "white" }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order?.data?.orders?.map((item, index) => (
                            <TableRow
                                key={item._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <AvatarGroup sx={{ justifyContent: "start" }}>
                                        {item?.orderItems?.map((orderItem) => <Avatar src={orderItem.product?.imageUrl} />)}
                                    </AvatarGroup>
                                </TableCell>
                                <TableCell component="th" scope="row" sx={{ color: "white" }}>
                                    {item?.orderItems?.map((orderItem) => <p>{orderItem?.product?.title}</p>)}
                                </TableCell>
                                <TableCell align="left" sx={{ color: "white" }}>
                                    {item?.orderItems?.map((orderItem) => <p>{orderItem?.product?.brand}</p>)}
                                </TableCell>
                                <TableCell align="left" sx={{ color: "white" }}>{item.totalDiscountPrice}</TableCell>
                                <TableCell align="left" sx={{ color: "white" }}>{item.totalItem}</TableCell>
                                <TableCell align="left" sx={{ color: "#45CE30" }}>
                                    <span className={
                                        `${item.orderStatus === "CONFIRMED"?"text-[#45CE30]" : item.orderStatus==="SHIPPED"?"text-[#0ABDE3]": item.orderStatus === "DELIVERED"?"text-[#FF3031]": "text-white"}`
                                    }>
                                        {item.orderStatus}
                                    </span>
                                </TableCell>
                                <TableCell align="left" sx={{ color: "white" }}>
                                    <Button
                                        id="basic-button"
                                        aria-controls={item._id}
                                        aria-haspopup="true"
                                        aria-expanded={Boolean(anchorEl[index])}
                                        onClick={(event) => handleClick(event, index)}
                                        variant='outlined'
                                        sx={{ color: "white" }}
                                    >
                                        Status
                                    </Button>
                                    <Menu
                                        id={item._id}
                                        anchorEl={anchorEl[index]}
                                        open={Boolean(anchorEl[index])}
                                        onClose={() => handleClose(index)}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => handleConfirmedOrder(item._id)}>confirmed Order</MenuItem>
                                        <MenuItem onClick={() => handleShippedOrder(item._id)}>shipped Order</MenuItem>
                                        <MenuItem onClick={() => handleDeliveredOrder(item._id)}>delivered Order</MenuItem>
                                    </Menu>
                                </TableCell>
                                <TableCell align="left" sx={{ color: "white" }}>
                                    <Button variant='outlined' sx={{ color: "white" }} onClick={() => handleDeleteOrder(item._id)}> Delete </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default Order
