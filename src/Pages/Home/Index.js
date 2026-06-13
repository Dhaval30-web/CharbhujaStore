import { useState } from "react";
import HomeBanner from "../../Components/HomeBanner";
import Store from '../../Assets/Images/Store.png';
import New from '../../Assets/Images/New.png';
import Coupon from '../../Assets/Images/Coupon.png';
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import React from "react";
import Slider from "react-slick";
import Rating from '@mui/material/Rating';
import Chilli from '../../Assets/Images/Posters/Red-Chilli.png';
import Coriander from '../../Assets/Images/Posters/Coriander.png';
import HomeCat from "../../Components/HomeCat";
import { MdOutlineMailOutline } from "react-icons/md";
import ProductModadl from "../../Components/ProductModal";
import productsData from '../../Data/ProductData';

// ✅ Reusable Product Card
const ProductCard = ({ product, onView }) => {
    return (
        <div className="item productItem">
            <div className="imgWrapper">
                <img src={product.images[0]} alt={product.name} className='w-100' />
                <span className="badge badge-primary">{product.discount}%</span>
                <div className="actions">
                    <Button onClick={() => onView(product.id)}> <AiOutlineFullscreen /> </Button>
                    <Button> <FaRegHeart /> </Button>
                </div>
            </div>
            <div className="info">
                <h4>{product.name}</h4>
                <span className={`d-block ${product.stock ? 'text-success' : 'text-danger'}`}>
                    {product.stock ? 'In Stock' : 'Out of Stock'}
                </span>
                <Rating className="mt-2 mb-2" name="read-only" value={product.rating} readOnly
                    size="small" precision={0.5}
                />
                <div className="d-flex">
                    <span className="oldPrice">₹{product.oldPrice}</span>
                    <span className="netPrice text-danger ml-2">₹{product.newPrice}</span>
                </div>
            </div>
        </div>
    );
};

const Home = () => {

    var productSliderOptions = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailInput = e.target.email;
        const email = emailInput.value;
        if (!email) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
        emailInput.value = "";
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const viewProductdetails = (id) => {
        const product = productsData.find(p => p.id === id);
        setSelectedProduct(product);
    };

    const closeProductModadl = () => {
        setSelectedProduct(null);
    };

    const bestSellers = productsData.filter(p => p.isBestSeller);
    const newProducts = productsData.filter(p => p.isNew);

    return (
        <>
            <HomeBanner />
            <HomeCat />

            <section className="homeProducts">
                <div className="container">
                    <div className="row align-items-start">

                        <div className="col-md-3">
                            <div className="sticky">
                                <div className="banner">
                                    <img src={Store} alt="Store" className='cursor' />
                                </div>
                                <div className="banner mt-3">
                                    <img src={New} alt="New" className='cursor' />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">

                            {/* BEST SELLERS */}
                            <div className="d-flex align-items-center">
                                <div className="info w-75">
                                    <h3 className="mb-0">BEST SALLERS</h3>
                                    <p className="text-light">Do not miss the "Jyada ka Fyada" Offer.</p>
                                </div>
                                <Button className="viewAllBtn ml-auto">View All <IoIosArrowRoundForward /></Button>
                            </div>

                            <div className="product_row w-100 mt-4">
                                <Slider {...productSliderOptions}>
                                    {bestSellers.map(product => (
                                        <ProductCard key={product.id} product={product} onView={viewProductdetails} />
                                    ))}
                                </Slider>
                            </div>

                            {/* NEW PRODUCTS */}
                            <div className="d-flex align-items-center mt-4">
                                <div className="info w-75">
                                    <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                                    <p className="text-light">With Heavy Discount.</p>
                                </div>
                                <Button className="viewAllBtn ml-auto">View All <IoIosArrowRoundForward /></Button>
                            </div>

                            <div className="product_row w-100 mt-4">
                                <Slider {...productSliderOptions}>
                                    {newProducts.map(product => (
                                        <ProductCard key={product.id} product={product} onView={viewProductdetails} />
                                    ))}
                                </Slider>
                            </div>

                            {/* Poster Banners */}
                            <div className="d-flex mt-5 mb-1 bannerSec">
                                <div className="banner">
                                    <img src={Chilli} alt="Banner" className='cursor' onClick={() => viewProductdetails(5)} />
                                </div>
                                <div className="banner">
                                    <img src={Coriander} alt="Banner" className='cursor' onClick={() => viewProductdetails(7)} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {selectedProduct && (
                <ProductModadl product={selectedProduct} closeProductModadl={closeProductModadl} />
            )}

            <section className="newsLatterSection mt-3 mb-3">
                <div className="container">
                    <div className="row align-items-center h-100">
                        <div className="col-md-5">
                            <div className="newsletterContent">
                                <p className="text-white mb-1">Get 20% Discount for your first order.</p>
                                <h3 className="text-white">Join our Newsletter and get....</h3>
                                <p className="text-light">
                                    Join our E-mail subcription and social media and get updates on promotions and coupons.
                                </p>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <MdOutlineMailOutline />
                                    <input type="email" name="email" placeholder="Enter Your E-Mail" />
                                    <Button type="submit"> Send </Button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-7 position-relative">
                            <div className="couponWrapper">
                                <img src={Coupon} alt="Coupon" className='couponImg' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showSuccess && (
                <div className="modalOverlay">
                    <div className="modalBox successBox">
                        <div className="sparkle s1">✨</div>
                        <div className="sparkle s2">⭐</div>
                        <div className="sparkle s3">✨</div>
                        <div className="sparkle s4">💫</div>
                        <div className="sparkle s5">⭐</div>
                        <div className="sparkle s6">✨</div>
                        <div className="modalEmoji">😊</div>
                        <h3>Your Email Sent Successfully!</h3>
                        <p>Thank you for subscribing 🎉</p>
                        <button className="closeBtn" onClick={() => setShowSuccess(false)}>✕</button>
                    </div>
                </div>
            )}

            {showError && (
                <div className="modalOverlay">
                    <div className="modalBox errorBox">
                        <div className="sparkle s1">❌</div>
                        <div className="sparkle s2">⚠️</div>
                        <div className="sparkle s3">❌</div>
                        <div className="sparkle s4">⚠️</div>
                        <div className="sparkle s5">❌</div>
                        <div className="sparkle s6">⚠️</div>
                        <div className="modalEmoji">😅</div>
                        <h3 className="errorText">Please! Enter Email First</h3>
                        <p>Email address likhne ke baad send karein.</p>
                        <button className="closeBtn" onClick={() => setShowError(false)}>✕</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;