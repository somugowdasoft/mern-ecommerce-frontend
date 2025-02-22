import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Register from './Register';
import Login from './Login';
import { useLocation, useNavigate } from 'react-router-dom';


const AuthModal = ({ handleClose, open }) => {
    const location = useLocation()
    const navigate = useNavigate()

    // Handle the success case when user logs in successfully
    const handleLoginSuccess = () => {
        navigate('/')
        handleClose()
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4, outline: 'none', borderRadius: 2 }}>
                    {location.pathname === "/login" ? <Login onLoginSuccess={handleLoginSuccess} /> : location.pathname === "/register" ? <Register /> : null}
                </Box>
            </Modal>
        </div>
    );
}

export default AuthModal

