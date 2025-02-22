import { Fragment, useState } from "react"
import { useDispatch } from "react-redux";
import { createProduct } from "../../../state/product/Action";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

let initialSize = [
    { name: "S", quantity: 0 },
    { name: "M", quantity: 0 },
    { name: "L", quantity: 0 }
]

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        imageUrl: "",
        brand: "",
        title: "",
        color: "",
        discountedPrice: "",
        price: "",
        discountPersent: "",
        sizes: initialSize,
        quantity: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        description: "",
    });
    const dispatch = useDispatch();

    // Handles changes in the input fields of the form 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // Handles changes for size specific data in the product form
    const handleSizeChange = (e, index) => {
        let { name, value } = e.target;
        if (name === "size_quantity") {
            name = "quantity";
        } else {
            name = e.target.name;
        }
        const sizes = [...productData.sizes];
        sizes[index][name] = value
        setProductData((prevState) => ({
            ...prevState,
            sizes: sizes
        }))
    }

    // Handle form submission, dispatch the action to create a product
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(productData));
        // Reset productData to its initial state after API call
        setProductData({
            imageUrl: "",
            brand: "",
            title: "",
            color: "",
            discountedPrice: "",
            price: "",
            discountPersent: "",
            sizes: [...initialSize],
            quantity: "",
            topLevelCategory: "",
            secondLevelCategory: "",
            thirdLevelCategory: "",
            description: "",
        });
    }

    return (
        <div className="mr-4">
            <Fragment>
                <Typography variant="h4" sx={{ textAlign: "center", py: 4, fontWeight: 500 }} >
                    Add New Product
                </Typography>
                <form onSubmit={handleSubmit} className="min-h-screen">
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Image URL"
                                name="imageUrl"
                                value={productData.imageUrl}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Brand"
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={productData.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Color"
                                name="color"
                                value={productData.color}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantity"
                                name="quantity"
                                value={productData.quantity}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Discounted Price"
                                name="discountedPrice"
                                value={productData.discountedPrice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Discounted Percentage"
                                name="discountPersent"
                                value={productData.discountPersent}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, sm: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Top Level Category</InputLabel>
                                <Select
                                    name="topLevelCategory"
                                    value={productData.topLevelCategory}
                                    onChange={handleChange}
                                    label="Top Level Category"
                                >
                                    <MenuItem value="men"> Men </MenuItem>
                                    <MenuItem value="women"> Women </MenuItem>
                                    <MenuItem value="kids"> Kids </MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Second Level Category</InputLabel>
                                <Select
                                    name="secondLevelCategory"
                                    value={productData.secondLevelCategory}
                                    onChange={handleChange}
                                    label="Second Level Category"
                                >
                                    <MenuItem value="clothing"> Clothing </MenuItem>
                                    <MenuItem value="accesories"> Accesories </MenuItem>
                                    <MenuItem value="brands"> Brands </MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Third Level Category</InputLabel>
                                <Select
                                    name="thirdLevelCategory"
                                    value={productData.thirdLevelCategory}
                                    onChange={handleChange}
                                    label="Third Level Category"
                                >
                                    <MenuItem value="top"> Top </MenuItem>
                                    <MenuItem value="women_dress"> Dress </MenuItem>
                                    <MenuItem value="women_jeans"> Women Jeans </MenuItem>
                                    <MenuItem value="men_jeans"> Men Jeans </MenuItem>
                                    <MenuItem value="shirt"> Shirt </MenuItem>
                                    <MenuItem value="mens_kurta"> Mens Kurta </MenuItem>
                                    <MenuItem value="mens_watches"> Men Watches </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                variant="outlined"
                                placeholder="Enter a detailed product description..."
                                inputProps={{ maxLength: 500 }}
                            />
                        </Grid>
                        {productData.sizes.map((size, index) => (
                            <Grid container size={12} spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Size Name"
                                        name="name"
                                        value={size.name}
                                        onChange={(event) => handleSizeChange(event, index)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        type="number"
                                        label="Quantity"
                                        name="size_quantity"
                                        value={size.quantity}
                                        onChange={(event) => handleSizeChange(event, index)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid size={{ xs: 12 }} sx={{ p: 1., py: 2 }}>
                            <Button variant="contained" type="submit" sx={{ bgcolor: "blueviolet", p: 1., py: 1.5 }} size="small" >
                                Add New Product
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Fragment>
        </div>
    )
}

export default CreateProduct