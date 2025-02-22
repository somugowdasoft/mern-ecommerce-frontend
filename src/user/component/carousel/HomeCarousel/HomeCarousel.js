import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { homeCarouselData } from './HomeCarouselData';

const HomeCarousel = () => {
    // create the carousel items (images)
    const items = homeCarouselData.map((item, index) => {
        return <img key={index} className="cursor-pointer" src={item.img} alt="" />;
    });
    
    return (
        <AliceCarousel
            items={items}
            disableButtonsControls
            autoPlay
            autoPlayInterval={1000}
            infinite
        />
    );
}

export default HomeCarousel;
