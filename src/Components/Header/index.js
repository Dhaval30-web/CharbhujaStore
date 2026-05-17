import Logo from '../../Assets/Images/Logo.png';
import { Link } from 'react-router-dom';
import CityDropdown from '../CityDropdown/Index';
import Button from '@mui/material/Button';
import { FaRegUser } from "react-icons/fa6";
import { BsBagHeart } from "react-icons/bs";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext } from 'react';
import { MyContext } from '../../App';


const Header = () => {

    const context = useContext(MyContext);

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
                                    <Button className='circle mr-3'><FaRegUser /></Button>

                                    <div className='ml-auto cartTab d-flex align-items-center'>
                                        <span className='price' style={{ marginLeft: '10px' }}>$62.82</span>

                                        <div className='position-relative ml-2'>
                                            <Button className='circle'><BsBagHeart /></Button>
                                            <span className='count d-flex align-items-center 
                                            justify-content-center'>1</span>
                                        </div>
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