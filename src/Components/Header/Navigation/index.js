import Button from '@mui/material/Button';
import { MdOutlineMenu } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Auth from '../../Auth';

const Navigation = ()=> {

    const [isOpenSidebarVal, setIsOpenSidebarVal] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    return(
        <>
            <nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-3 navPart1'>
                            <div className='catWrapper'>
                                <Button className='allCatTab align-items-center' 
                                    onClick={() => {
                                    console.log(isOpenSidebarVal);
                                    setIsOpenSidebarVal(!isOpenSidebarVal);
                                    }}>
                                    <span className='icon1 mr-2'><MdOutlineMenu/></span>
                                    <span className="text">All Categories</span>
                                    <span className='icon2 ml-2'><FaAngleDown/></span>
                                </Button>

                                <div className={`sidebarNav ${isOpenSidebarVal === true ? 'open' : ''} shadow`}>
                                <ul>
                                        <li><Link to="/spices"><Button>Spices <FaAngleRight className='ml-auto'/>
                                            </Button></Link>
                                            <div className='submenu'>
                                                <Link to="/spices?sub=whole-spices"><Button>Whole Spices</Button></Link>
                                                <Link to="/spices?sub=powdered-spices"><Button>Powdered Spices</Button></Link>
                                                <Link to="/spices?sub=spice-mixes"><Button>Spice Mixes</Button></Link>
                                                <Link to="/spices?sub=dry-aromatics"><Button>Dry Aromatics</Button></Link>
                                            </div>
                                        </li>

                                        <li><Link to="/"><Button>Grocery <FaAngleRight className='ml-auto'/>
                                            </Button></Link>
                                            <div className='submenu'>
                                                <Link to="/"><Button>Daal</Button></Link>
                                                <Link to="/"><Button>Anaj</Button></Link>
                                                <Link to="/"><Button>Atta & Flour</Button></Link>
                                                <Link to="/"><Button>Oil & Ghee</Button></Link>
                                                <Link to="/"><Button>Condiments</Button></Link>
                                                <Link to="/"><Button>Snacks & Namkeen</Button></Link>
                                                <Link to="/"><Button>Dry Fruits & Nuts</Button></Link>
                                                <Link to="/"><Button>Tea & Coffee</Button></Link>
                                                <Link to="/"><Button>Household Essentials</Button></Link>
                                            </div>
                                        </li>

                                        <li><Link to="/"><Button>Food <FaAngleRight className='ml-auto'/>
                                            </Button></Link>
                                            <div className='submenu'>
                                                <Link to="/"><Button>Instant & Ready Meals</Button></Link>
                                                <Link to="/"><Button>Breakfast Cereals</Button></Link>
                                                <Link to="/"><Button>Chocolate</Button></Link>
                                                <Link to="/"><Button>Pickles</Button></Link>
                                                <Link to="/"><Button>Biscuits</Button></Link>
                                            </div>
                                        </li>

                                        <li><Link to="/"><Button>Perfumes <FaAngleRight className='ml-auto'/> 
                                            </Button></Link>
                                            <div className='submenu'>
                                                <Link to="/"><Button>Fogg</Button></Link>
                                                <Link to="/"><Button>Patels</Button></Link>
                                                <Link to="/"><Button>Denver</Button></Link>
                                                <Link to="/"><Button>Wild Stone</Button></Link>
                                                <Link to="/"><Button>Belavita</Button></Link>
                                                <Link to="/"><Button>Calvin Klein</Button></Link>
                                            </div>
                                        </li>

                                </ul>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-9 navPart2 d-flex align-items-center'>
                            <ul className='list list-inline w-100'>
                                <li className='list-inline-item'>
                                    <Link to="/"><Button>Home</Button></Link>
                                </li>
                                <li className='list-inline-item'>
                                    <Link to="/spices"><Button>Spices</Button></Link>
                                    <div className='submenu shadow'>
                                        <Link to="/spices?sub=whole-spices"><Button>Whole Spices</Button></Link>
                                        <Link to="/spices?sub=powdered-spices"><Button>Powdered Spices</Button></Link>
                                        <Link to="/spices?sub=spice-mixes"><Button>Spice Mixes</Button></Link>
                                        <Link to="/spices?sub=dry-aromatics"><Button>Dry Aromatics</Button></Link>
                                    </div>
                                </li>

                                <li className='list-inline-item'>
                                    <Link to="/"><Button>Grocery</Button></Link>
                                    <div className='submenu shadow'>
                                        <Link to="/"><Button>Daal</Button></Link>
                                        <Link to="/"><Button>Anaj</Button></Link>
                                        <Link to="/"><Button>Atta & Flour</Button></Link>
                                        <Link to="/"><Button>Oil & Ghee</Button></Link>
                                        <Link to="/"><Button>Condiments</Button></Link>
                                        <Link to="/"><Button>Snacks & Namkeen</Button></Link>
                                        <Link to="/"><Button>Dry Fruits & Nuts</Button></Link>
                                        <Link to="/"><Button>Tea & Coffee</Button></Link>
                                        <Link to="/"><Button>Household Essentials</Button></Link>
                                    </div>
                                </li>

                                <li className='list-inline-item'>
                                    <Link to="/"><Button>Food</Button></Link>
                                    <div className='submenu shadow'>
                                        <Link to="/"><Button>Instant & Ready Meals</Button></Link>
                                        <Link to="/"><Button>Breakfast Cereals</Button></Link>
                                        <Link to="/"><Button>Chocolate</Button></Link>
                                        <Link to="/"><Button>Pickles</Button></Link>
                                        <Link to="/"><Button>Biscuits</Button></Link>
                                    </div>
                                </li>

                                <li className='list-inline-item'>
                                    <Link to="/"><Button>Perfumes</Button></Link>
                                    <div className='submenu shadow'>
                                        <Link to="/"><Button>Fogg</Button></Link>
                                        <Link to="/"><Button>Patels</Button></Link>
                                        <Link to="/"><Button>Denver</Button></Link>
                                        <Link to="/"><Button>Wild Stone</Button></Link>
                                        <Link to="/"><Button>Belavita</Button></Link>
                                        <Link to="/"><Button>Calvin Klein</Button></Link>
                                    </div>                            
                                </li>
                                <li className='list-inline-item'>
                                    <Link to="/contact"><Button>Contact Us</Button></Link>
                                </li>

                                {/* ===== LOGIN / USER BUTTON ===== */}
                                    <li className='list-inline-item'>
                                        {user ? (
                                            <div className='userMenuWrapper'>
                                                <Button
                                                    className='userBtn'
                                                    onClick={() => setShowUserMenu(!showUserMenu)}>
                                                    <FaUserCircle className='mr-2' />
                                                    {user.name}
                                                    <FaAngleDown className='ml-2' />
                                                </Button>

                                                {showUserMenu && (
                                                    <div className='userDropdown shadow'>
                                                        <p className='userEmail'>
                                                            {user.email || user.phone}
                                                        </p>
                                                        <button
                                                            className='logoutBtn'
                                                            onClick={handleLogout}>
                                                            <MdLogout className='mr-2' />
                                                            Logout
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Button
                                                className='loginBtn'
                                                onClick={() => setShowAuth(true)}>
                                                <FaUserCircle className='mr-2' />
                                                Login
                                            </Button>
                                        )}
                                    </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>

            {/* AUTH MODAL */}
            {showAuth && (
                <div onClick={() => setShowAuth(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Auth onClose={() => setShowAuth(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Navigation;