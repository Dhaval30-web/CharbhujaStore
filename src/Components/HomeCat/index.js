import React from "react";
import Slider from "react-slick";
import Meggi from '../../Assets/Images/Products/Meggi.png';
import Oats from '../../Assets/Images/Products/Oats.png';
import Toor from '../../Assets/Images/Products/Toor.png';
import Aata from '../../Assets/Images/Products/22.png';
import Yippee from '../../Assets/Images/Products/Yippee.png';
import Harpic from '../../Assets/Images/Products/Harpic.png';
import Basmati from '../../Assets/Images/Products/Basmati.png';
import Amul from '../../Assets/Images/Products/Amul_Ghee.png';
import Sugar from '../../Assets/Images/Products/Sugar.png';
import Tea from '../../Assets/Images/Products/Tea.png';
import Papad from '../../Assets/Images/Products/Papad.png';
import Paneer from '../../Assets/Images/Products/Paneer.png';

const HomeCat = ()=> {

    var HomeCat = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1
  };

    return(
        <section className="homeCat">
            <div className="container">
                <h3 className="mb-2 hd">Our Categories</h3>
                <Slider {...HomeCat}>
                    <div className="item text-center">
                        <img src={Meggi} alt="HomeCat" />
                        <h5>Meggi</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Oats} alt="HomeCat"/>
                        <h5>Oats</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Toor} alt="HomeCat"/>
                        <h5>Toor Daal</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Aata} alt="HomeCat"/>
                        <h5>Aata</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Yippee} alt="HomeCat"/>
                        <h5>Yippee</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Harpic} alt="HomeCat"/>
                        <h5>Harpic</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Basmati} alt="HomeCat"/>
                        <h5>Basmati</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Amul} alt="HomeCat"/>
                        <h5>Amul Ghee</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Sugar} alt="HomeCat"/>
                        <h5>Sugar</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Tea} alt="HomeCat"/>
                        <h5>Tea</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Papad} alt="HomeCat"/>
                        <h5>Papad</h5>
                    </div>

                    <div className="item text-center">
                        <img src={Paneer} alt="HomeCat"/>
                        <h5>Paneer</h5>
                    </div>
                </Slider>
            </div>
        </section>
    );
}

export default HomeCat