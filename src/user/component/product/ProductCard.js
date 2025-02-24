import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Function showing a Snackbar or navigating to a product page
    const handleClick = () => {
        if (!auth.user) {
            setOpenSnackbar(true);
        } else {
            navigate(`/product/${product._id}`);
        }
    };

    // Function to close the Snackbar
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div onClick={handleClick}>
            <Card sx={{
                maxWidth: 300,
                borderRadius: 2,
                boxShadow: 3,
                margin: '10px',
                cursor: 'pointer',
                transition: 'box-shadow .3s ease-in-out',  // Smooth transition for hover effect
                '&:hover': {
                    boxShadow: 8,
                    transform: 'scale(1.05)',  // Slight zoom effect on hover
                },
            }}>
                <Link>
                    <CardMedia
                        component="img"
                        sx={{
                            width: '100%',
                            height: 320,
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                        image={product.imageUrl}
                        alt="product image"
                    />
                </Link>

                <CardContent sx={{
                    bgcolor: 'white',
                    transition: 'transform .3s ease-out',
                    '&:hover': {
                        transform: 'translateY(-1rem)',  // Smooth lift effect on hover
                    },
                }}>
                    <Link>
                        <Typography variant="h6" sx={{
                            fontWeight: 'bold',
                            opacity: '0.8',
                            fontSize: '1rem',
                            color: '#333',
                        }}>
                            {product.brand}
                        </Typography>

                        <Typography variant="body2" sx={{
                            fontWeight: '600',
                            color: 'gray',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            width: '100%',
                            fontSize: '0.9rem',
                        }}>
                            {product.title}
                        </Typography>
                    </Link>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 2,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body2" sx={{
                                fontWeight: 'bold',
                                marginRight: '10px',
                                textDecoration: 'line-through',
                                opacity: 0.5,
                                fontSize: '0.9rem',
                            }}>
                                ₹{product.price}
                            </Typography>

                            <Typography variant="h6" sx={{
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                            }}>
                                ₹{product.discountedPrice}
                            </Typography>

                            <Typography variant="body2" sx={{
                                color: 'green',
                                fontWeight: 'bold',
                                marginLeft: '10px',
                                fontSize: '0.9rem',
                            }}>
                                {product.discountPersent}% off
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>


            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    Please Login First
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ProductCard;
