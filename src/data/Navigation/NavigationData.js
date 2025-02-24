export const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '/',
                    imageSrc: 'https://www.shutterstock.com/image-photo/beautiful-woman-fashion-model-makeup-600nw-1918687337.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '/',
                    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSbY-44rMES5MpKnIop0nL6MOUy-ikWKIcQ&s',
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
                    imageSrc: 'https://static.nextdirect.com/resource/blob/715638/ae58eb425dc13350a06316e6a609036e/denim-data.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    id: '#',
                    imageSrc: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/2/i/x/m-ar-fsh-2-light-blue-aary-fashion-original-imagry4pegejqbbt.jpeg?q=90&crop=false',
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