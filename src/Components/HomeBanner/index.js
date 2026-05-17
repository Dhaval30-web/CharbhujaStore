import React from "react";
import Slider from "react-slick";
import Cardamom from '../../Assets/Images/Cardamom.jpg';
import Almonds from '../../Assets/Images/Almonds.jpg';
import Pistachio from '../../Assets/Images/Pistachio.jpg';
import Cashew from '../../Assets/Images/Cashew.jpg';

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
                </Slider>
            </div>
        </>
    );
}

export default HomeBanner