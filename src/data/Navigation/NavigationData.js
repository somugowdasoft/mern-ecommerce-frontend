export const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '/',
                    imageSrc: 'https://urbantheka.in/cdn/shop/products/PunjabMapPinkGirls.jpg?v=1704190968&width=533',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '/',
                    imageSrc: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/h/p/p/l-1c23shirr004-mustard-jaipur-kurti-original-imagtg8ktgf4hnjy.jpeg?q=90&crop=false',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', id: "top", href: `{women/clothing/tops}` },
                        { name: 'Dresses', id: "women_dress", href: '#' },
                        { name: 'Women Jeans', id: 'women_jeans' }
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', id: 'watch' },
                        { name: 'Wallets', id: 'wallet' },
                        { name: 'Bags', id: 'bag' }
                    ],
                }
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    id: '#',
                    imageSrc: 'https://assets.panashindia.com/media/catalog/product/cache/1/image/479x671/9df78eab33525d08d6e5fb8d27136e95/8/5/856mw16-7099e-mks-bk.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    id: '#',
                    imageSrc: 'https://thefoomer.in/cdn/shop/products/jpeg-optimizer_PATP5156.jpg?v=1680162712',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Mens Kurtas', id: 'mens_kurta' },
                        { name: 'Shirt', id: 'shirt' },
                        { name: 'Men Jeans', id: 'men_jeans' }
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', id: 'mens_watchs' },
                        { name: 'Wallets', id: 'mens_wallets' },
                        { name: 'Bags', id: 'mens_bags' }
                    ],
                }
            ],
        },
    ],
    pages: [
        { name: 'Company', id: '/' },
        { name: 'Stores', id: '/' },
    ],
}