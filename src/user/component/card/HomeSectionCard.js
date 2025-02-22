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
            <div className="h-[205px] w-[160px] ">
                <img className="object-cover object-top w-full h-full" src={product.imageUrl} alt="" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
                <p className="mt-2 text-sm text-gray-600">{product.title}</p>
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
