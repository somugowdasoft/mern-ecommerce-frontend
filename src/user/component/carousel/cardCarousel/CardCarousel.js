import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../../card/HomeSectionCard";
import { Button } from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useState } from "react";


const CardCarousel = ({ data, sectionName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    // Responsive settings for the carousel
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    };

    // Functions to navigate between slides (previous and next)
    const slidePrev = () => setActiveIndex(activeIndex - 1)
    const slideNext = () => setActiveIndex(activeIndex + 1)
    // Function to sync the slide change with the active index
    const synconSlideChange = ({ item }) => setActiveIndex(item);
    // Generate carousel items
    const items = data ? data.map((item) => <HomeSectionCard key={item._id} product={item} />) : [];

    return (
        <div className="px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 uppercase mb-2">{sectionName}</h2>
            <div className="relative p-5 border border-gray-400 rounded-md mb-6">
                <AliceCarousel
                    items={items}
                    disableButtonsControls
                    responsive={responsive}
                    disableDotsControls
                    onSlideChange={synconSlideChange}
                    activeIndex={activeIndex}
                />
                {activeIndex !== items.length - 5 && items.length > 0 && (
                    <Button
                        variant="contained"
                        className="z-50"
                        sx={{ position: "absolute", top: "120px", right: "0px", transform: "translateX(50%) rotate(90deg)", bgcolor: "white" }} aria-label="next"
                        onClick={slideNext}
                    >
                        <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)", color: "black" }} />
                    </Button>
                )}
                {activeIndex !== 0 && items.length > 0 && (
                    <Button
                        variant="contained"
                        className="z-50"
                        sx={{ position: "absolute", top: "120px", left: "0px", transform: "translateX(-50%) rotate(-90deg)", bgcolor: "white" }} aria-label="next"
                        onClick={slidePrev}
                    >
                        <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)", color: "black" }} />
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CardCarousel
