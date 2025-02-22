import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteProduct, findProducts } from '../../../state/product/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Avatar, Button, Card, CardHeader } from '@mui/material';


const Products = () => {
	const dispatch = useDispatch()
	const products = useSelector(state => state.product.products);

	// Function to handle product deletion
	const handleProductDelete = (productId) => {
		dispatch(deleteProduct(productId))
	}

	// useEffect hook to fetch products
	useEffect(() => {
		const [minPrice, maxPrice] = [0, Infinity];
		const data = {
			category: "",
			color: [],
			sizes: [],
			minPrice,
			maxPrice,
			pageNumber: 1,
			pageSize: Infinity,
		}
		dispatch(findProducts(data))
	}, [dispatch, products.deleteProduct])

	return (
		<Card className="mt-4">
			<CardHeader title="All Product">
			</CardHeader>
			<TableContainer component={Paper} sx={{ bgcolor: "#192A56" }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ color: "white" }}>Image</TableCell>
							<TableCell sx={{ color: "white" }}>Title</TableCell>
							<TableCell align="left" sx={{ color: "white" }}>Brand</TableCell>
							<TableCell align="left" sx={{ color: "white" }}>Category</TableCell>
							<TableCell align="left" sx={{ color: "white" }}>Price</TableCell>
							<TableCell align="left" sx={{ color: "white" }}>Qunatity</TableCell>
							<TableCell align="left" sx={{ color: "white" }}>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.data?.content?.map((item) => (
							<TableRow
								key={item._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="left">
									<Avatar src={item.imageUrl} />
								</TableCell>
								<TableCell component="th" scope="row" sx={{ color: "white" }}>
									{item.title}
								</TableCell>
								<TableCell align="left" sx={{ color: "white" }}>{item.brand}</TableCell>
								<TableCell align="left" sx={{ color: "white" }}>{item.category?.name}</TableCell>
								<TableCell align="left" sx={{ color: "white" }}>{item.price}</TableCell>
								<TableCell align="left" sx={{ color: "white" }}>{item.quantity}</TableCell>
								<TableCell align="left" sx={{ color: "white" }}>
									<Button variant='outlined' sx={{ color: "white" }} onClick={() => handleProductDelete(item._id)}> Delete </Button>
								</TableCell>

							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
}

export default Products
