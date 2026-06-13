import React from "react";
import Slider from "react-slick";
import Cardamom from '../../Assets/Images/Posters/Cardamom.jpg';
import Almonds from '../../Assets/Images/Posters/Almonds.jpg';
import Pistachio from '../../Assets/Images/Posters/Pistachio.jpg';
import Cashew from '../../Assets/Images/Posters/Cashew.jpg';
import Chili from '../../Assets/Images/Posters/Chili.jpg';
import Turmeric from '../../Assets/Images/Posters/Turmeric.jpg';

const HomeBanner = ()=> {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : true,
        autoplay :  true
    };

    return (
        <>
            <div className="homeBannerSection">
                <Slider {...settings}>
                    <div className="item">
                        <img src={Cardamom} alt="Cardamom" className='w-100' />
                    </div>

                    <div className="item">
                        <img src={Almonds} alt="Almonds" className='w-100' />
                    </div>

                    <div className="item">
                        <img src={Pistachio} alt="Pistachio" className='w-100' />
                    </div>

                    <div className="item">
                        <img src={Cashew} alt="Cashew" className='w-100' />
                    </div>

                    <div className="item">
                        <img src={Chili} alt="Chili" className='w-100' />
                    </div>

                    <div className="item">
                        <img src={Turmeric} alt="Turmeric" className='w-100' />
                    </div>
                </Slider>
            </div>
        </>
    );
}

export default HomeBanner