import { MdOutlineWorkspacePremium } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { TbRosetteDiscount } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { IoIosCall } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import Logo from '../../Assets/Images/Logo.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return(
        <>
            <footer>
                <div className="container">
                    <div className="topInfo row">
                        <div className="col d-flex align-items-center">
                            <span><MdOutlineWorkspacePremium /></span>
                            <span className="ml-2">Best Quality Product</span>
                        </div>
                        <div className="col d-flex align-items-center">
                            <span><TbTruckDelivery /></span>
                            <span className="ml-2">Free delivery for order over ₹4000.</span>
                        </div>
                        <div className="col d-flex align-items-center">
                            <span><TbRosetteDiscount /></span>
                            <span className="ml-2">Daily Maha Discounts</span>
                        </div>
                        <div className="col d-flex align-items-center">
                            <span><FaIndianRupeeSign /></span>
                            <span className="ml-2">Best price on the market</span>
                        </div>
                    </div>


                    <div className="row mt-4 linksWrap">
                        <div className="col">
                            <h5>Spices</h5>
                            <ul>
                                <li><Link to="/spices">All Spices</Link></li>
                                <li><Link to="/spices?sub=whole-spices">Whole Spices</Link></li>
                                <li><Link to="/spices?sub=powdered-spices">Powdered Spices</Link></li>
                                <li><Link to="/spices?sub=spice-mixes">Spice Mixes</Link></li>
                                <li><Link to="/spices?sub=dry-aromatics">Dry Aromatics</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>Grocery</h5>
                            <ul>
                                <li><Link to = "grocery?sub=daal">Daal</Link></li>
                                <li><Link to = "grocery?sub=anaj">Anaj</Link></li>
                                <li><Link to = "grocery?sub=atta-flour">Aata & Flour</Link></li>
                                <li><Link to = "grocery?sub=oil-ghee">Oil & Ghee</Link></li>
                                <li><Link to = "grocery?sub=condiments">Condiments</Link></li>
                                <li><Link to = "rocery?sub=snacks-namkeen">Snacks & Namkeen</Link></li>
                                <li><Link to = "grocery?sub=dry-fruits-nuts">Dry Fruits & Nuts</Link></li>
                                <li><Link to = "grocery?sub=tea-coffee">Tea & Coffee</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>Food</h5>
                            <ul>
                                <li><Link to = "#">Instant & Ready Meals</Link></li>
                                <li><Link to = "#">Breakfast Cereals</Link></li>
                                <li><Link to = "#">Chocolate</Link></li>
                                <li><Link to = "#">Pickles</Link></li>
                                <li><Link to = "#">Biscuits</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>Perfumes</h5>
                            <ul>
                                <li><Link to = "#">Foog</Link></li>
                                <li><Link to = "#">Patels</Link></li>
                                <li><Link to = "#">Denver</Link></li>
                                <li><Link to = "#">Wild Stone</Link></li>
                                <li><Link to = "#">Belavita</Link></li>
                                <li><Link to = "#">Calvin Klein</Link></li>
                            </ul>
                        </div>

                        <div className="col">
                            <h5>Contact Us</h5>
                            <ul>
                               <li>
                                    <a href="https://wa.me/917435990900?text=Hello%20Charbhuja%20Store%2C%20I%20need%20help!" 
                                        target="_blank" 
                                        rel="noreferrer">
                                        <IoIosCall/> +91 74359 90900
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:dhavalpra96@gmail.com">
                                        <MdOutlineMailOutline/> dhavalpra96@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="footerBottom">
                    <div className="container">
                        <div className="footerBottomInner">

                            {/* LEFT - LOGO */}
                            <div className="footerLogo">
                                <img src={Logo} alt="Charbhuja Store" />
                                {/* Agar logo image nahi hai toh yeh use karein: */}
                                {/* <span className="footerBrandName">Charbhuja Store</span> */}
                            </div>

                            {/* CENTER - COPYRIGHT */}
                            <div className="footerCopyright">
                                <p>Copyright 2026 © Charbhuja Store. All Rights Reserved.</p>
                            </div>

                            {/* RIGHT - SOCIAL ICONS + SCROLL TO TOP */}
                            <div className="footerRight">
                                <span className="followText">Follow us on</span>

                                <div className="socialIcons">
                                    {/* Facebook */}
                                    <a 
                                        href="https://www.facebook.com/share/1BLopGSJM3/" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="socialIcon facebook"
                                        title="Facebook">
                                        {/* Facebook icon ki jagah */}
                                        <FaFacebookF />
                                    </a>

                                    {/* Instagram */}
                                    <a 
                                        href="https://www.instagram.com/prajapatidhaval96/" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="socialIcon instagram"
                                        title="Instagram">
                                        {/* Instagram icon ki jagah */}
                                        <FaInstagram />
                                    </a>

                                    {/* LinkedIn */}
                                    <a 
                                        href="https://www.linkedin.com/in/dhaval-prajapati-6949532b5/" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="socialIcon linkedin"
                                        title="LinkedIn">
                                        {/* LinkedIn icon ki jagah */}
                                        <FaLinkedinIn />
                                    </a>
                                </div>

                                {/* SCROLL TO TOP */}
                                <button className="scrollTopBtn" onClick={scrollToTop} title="Back to Top">
                                    <FaArrowUp />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer