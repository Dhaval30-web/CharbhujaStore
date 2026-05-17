import Button from '@mui/material/Button';
import { MdOutlineMenu } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";

const Navigation = ()=> {

    const [isOpenSidebarVal, setIsOpenSidebarVal] = useState(false);

    return(
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
                                    <li><Link to="/"><Button>Spices <FaAngleRight className='ml-auto'/>
                                        </Button></Link>
                                        <div className='submenu'>
                                            <Link to="/"><Button>Whole Spices</Button></Link>
                                            <Link to="/"><Button>Powdered Spices</Button></Link>
                                            <Link to="/"><Button>Spice Mixes</Button></Link>
                                            <Link to="/"><Button>Dry Aromatics</Button></Link>
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
                                            <Link to="/"><Button>KS</Button></Link>
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
                                <Link to="/"><Button>Spices</Button></Link>
                                <div className='submenu shadow'>
                                    <Link to="/"><Button>Whole Spices</Button></Link>
                                    <Link to="/"><Button>Powdered Spices</Button></Link>
                                    <Link to="/"><Button>Spice Mixes</Button></Link>
                                    <Link to="/"><Button>Dry Aromatics</Button></Link>
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
                                    <Link to="/"><Button>KS</Button></Link>
                                </div>                            
                            </li>
                            <li className='list-inline-item'>
                                <Link to="/"><Button>Contact Us</Button></Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navigation;