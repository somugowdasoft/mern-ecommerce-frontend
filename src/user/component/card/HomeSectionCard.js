import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
    const navigate = useNavigate()
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
    // function that handles closing the snackbar
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div onClick={handleClick} className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[240px] mx-3 border border-gray-400">
            <div className="w-[180px] h-[270px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
                {/* Product Image */}
                <div className="h-[210px] w-full">
                    <img className="object-cover object-top w-full h-full" src={product.imageUrl} alt={product.title} />
                </div>

                {/* Product Details */}
                <div className="p-3">
                    <h3 className="text-md font-semibold text-gray-900 truncate">{product.brand}</h3>
                    <p className="text-sm text-gray-600 truncate">{product.title}</p>
                </div>
            </div>


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
    )
}

export default HomeSectionCard
