import HomeBanner from "../../Components/HomeBanner";
import Store from '../../Assets/Images/Store.png';
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import Slider from "react-slick";

const Home = () => {

    var productSliderOptions = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

    return (
        <>
            <HomeBanner/>

            <section className="homeProducts">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-md-3">
                            <div className="banner">
                                <img src={Store} alt="Store" className='cursor' />
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="d-flex align-items-center">
                                <div className="info w-75">
                                    <h3 className="mb-0">BEST SALLERS</h3>
                                    <p className="text-light">Do not miss the "Jyada ka Fyada" Offer.</p>
                                </div>

                                <Button className="viewAllBtn ml-auto">View All <IoIosArrowRoundForward /></Button>
                            </div>

                            <div className="product_row">
                                <Slider {...productSliderOptions}>

                                </Slider>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;