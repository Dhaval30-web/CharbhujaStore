import Logo from '../../Assets/Images/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import CityDropdown from '../CityDropdown/Index';
import Button from '@mui/material/Button';
import { FaRegUser } from "react-icons/fa6";
import { BsBagHeart } from "react-icons/bs";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';
import MiniCart from '../MiniCart';

const Header = () => {

    const context = useContext(MyContext);
    const navigate = useNavigate();  // ← ADD
    const [showMiniCart, setShowMiniCart] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));  // ← ADD

    const handleProfileClick = () => {
        if (user) {
            navigate('/profile');  // login hai toh profile page
        } else {
            navigate('/login');    // login nahi hai toh login page
        }
    };

    return (
        <>
            <div className="headerWrapper">
                <div className="top-strip purple">
                    <div className="container">
                        <p className="mb-0 mb-0 text-center"><b>Charbhuja Store</b></p>
                    </div>
                </div>

                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="logoWrapper d-flex align-items-center col-auto">
                                <Link to={'/'}><img src={Logo} alt='Logo' /></Link>
                            </div>

                            <div className='col-sm-10 d-flex align-items-center part2'>

                                {
                                    context?.areaList?.length !==0 && <CityDropdown />
                                }
                                

                                <SearchBox />

                                <div className='part3 d-flex align-items-center ml-auto'>
                                    <Button className='circle mr-3' onClick={handleProfileClick}>
                                        {user?.profilePic ? (
                                            <img 
                                                src={user.profilePic} 
                                                alt="profile"
                                                style={{ 
                                                    width: '30px', 
                                                    height: '30px', 
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }} 
                                            />
                                        ) : (
                                            <FaRegUser />
                                        )}
                                    </Button>

                                    <div className='ml-auto cartTab d-flex align-items-center position-relative'
                                        onMouseEnter={() => setShowMiniCart(true)}
                                        onMouseLeave={() => setShowMiniCart(false)}
                                    >
                                        <span className='price' style={{ marginLeft: '10px' }}>
                                            ₹{context.cartTotal.toFixed(2)}
                                        </span>

                                        <div className='position-relative ml-2'>
                                            <Button className='circle' onClick={() => navigate('/cart')}>
                                                <BsBagHeart />
                                            </Button>

                                            {context.cartCount > 0 && (
                                                <span className='count d-flex align-items-center justify-content-center'>
                                                {context.cartCount}
                                                </span>
                                            )}
                                        </div>

                                        {showMiniCart && context.cartCount > 0 && (
                                            <MiniCart />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Navigation/>
                
            </div>
        </>
    );
}

export default Header;