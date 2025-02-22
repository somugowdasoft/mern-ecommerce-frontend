import React, { Suspense, useEffect } from 'react'
import { findProducts } from '../../../state/product/Action';
import { useDispatch, useSelector } from 'react-redux';
const HomeCarousel = React.lazy(() => import('../../component/carousel/HomeCarousel/HomeCarousel'));
const CardCarousel = React.lazy(() => import('../../component/carousel/cardCarousel/CardCarousel'));

const HomePage = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products);

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
    }, [dispatch])

    // Define a list of categories to filter products
    const categories = ["shirt", "mens_kurta", "men_jeans", "women_dress", "women_jeans", "top"]
    // Function to filter products based on category name
    const filterCategory = (categoryName) => {
        return products?.data?.content?.filter((product) => product?.category?.name === categoryName);
    }

    return (
        <div>
            <HomeCarousel />
            {categories.map((category) => (
                <Suspense fallback={<div className="text-black">Loading Products...</div>}>
                    <CardCarousel data={filterCategory(category)} sectionName={category} />
                </Suspense>
            ))}
        </div>
    )
}

export default HomePage
