import { Alert, AlertTitle } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
    const navigate = useNavigate()

    // useEffect hook to navigate the user after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/user/order")
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [navigate])

    return (
        <div className="px-2 lg:px-36 my-10">
            <div className="flex flex-col justify-center items-center">
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{ mb: 6, width: "fit-content" }}
                >
                    <AlertTitle> Payment Success</AlertTitle>
                    Your Order Get Placed
                </Alert>
            </div>
        </div>
    )
}

export default PaymentSuccess
