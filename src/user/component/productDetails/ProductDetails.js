import { useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { Button, Snackbar, Alert } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../state/product/Action'
import { addItemToCart } from '../../../state/cart/Action'

const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.product.product)

    // Handler for the form submission (adding product to cart)
    const handleSubmit = () => {
        if (!selectedSize) {
            setOpenSnackbar(true)
        } else {
            const data = { productId: params.productId, size: selectedSize.name }
            dispatch(addItemToCart(data))
            navigate("/cart")

        }
    }

    // Handler to close the Snackbar
    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

    // useEffrect hook to product details from the API when product ID changes
    useEffect(() => {
        dispatch(findProductsById(params.productId))
    }, [dispatch, params.productId])

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4">
                    {/* Image gallery */}
                    <div className="flex flex-col items-center my-4">
                        <div className="overflow-hidden rounded-lg max-w-[480px] max-h-[560px]">
                            <img
                                alt={product?.data.product?.imageUrl}
                                src={product?.data.product?.imageUrl}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 max-h-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 mt-4">
                        <div className="lg:col-span-2">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Brand:  {product?.data.product?.brand} </h1>
                            <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 py-1">{product?.data.product?.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product Information</h2>
                            <hr />
                            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6 py-2">
                                <p className="font-semibold">₹{product?.data.product?.discountedPrice}</p>
                                <p className="opacity-50 line-through">₹{product?.data.product?.price}</p>
                                <p className="text-green-600 font-semibold">{product?.data.product?.discountPersent}% off</p>
                            </div>
                            <hr />
                            <form className="mt-10">
                                {/* Sizes Selection */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                        >
                                            {product?.data.product?.sizes.map((size) => (
                                                <Radio
                                                    key={size._id}
                                                    value={size}
                                                    disabled={size.quantity <= 0}
                                                    className={`
                                ${size.quantity > 0
                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200'
                                                        } 
                                group relative flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6
                            `}
                                                >
                                                    <span>{size.name}</span>
                                                    {size.quantity > 0 ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                                                            >
                                                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    sx={{ bgcolor: "blueviolet", py: "8px", px: "16px", mt: "10px", width: "50%" }}
                                >
                                    Add to Cart
                                </Button>
                            </form>
                        </div>


                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-gray-800">Product Description</h3>
                                <div className="space-y-4 mt-2">
                                    <p className="text-base text-gray-700 leading-relaxed">
                                        {product?.data?.product?.description || "No description available for this product."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    Please select a size before adding to the cart.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ProductDetails
