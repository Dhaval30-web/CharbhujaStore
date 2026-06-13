import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import productsData from '../../Data/ProductData';
import ProductModadl from "../../Components/ProductModal";
import Pista from '../../Assets/Images/Posters/Pista.png';

const SPICE_SUBCATEGORIES = [
    { key: 'whole-spices',    label: 'Whole Spices'    },
    { key: 'powdered-spices', label: 'Powdered Spices' },
    { key: 'spice-mixes',     label: 'Spice Mixes'     },
    { key: 'dry-aromatics',   label: 'Dry Aromatics'   },
];

const checkboxSx = {
    color: '#6f5a8e',
    '&.Mui-checked': { color: '#6f5a8e' },
    padding: '3px 9px',
};

const Sidebar = ({ activePage, activeSub, onSubChange }) => {
    const [value, setValue]               = useState([100, 10000]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className='sticky'>

                {/* PRODUCT CATEGORIES */}
                <div className="filterBox">
                    <h6>PRODUCT CATEGORIES</h6>
                    <div className='scroll'>
                        <ul>
                            {/* Spices */}
                            <li>
                                <div onClick={() => navigate('/spices')}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        style={{ margin: 0 }}
                                        control={
                                            <Checkbox
                                                sx={checkboxSx}
                                                checked={activePage === 'spices'}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        }
                                        label={
                                            <span style={{
                                                fontWeight: activePage === 'spices' ? '700' : '400',
                                                color:      activePage === 'spices' ? '#6f5a8e' : 'inherit'
                                            }}>Spices</span>
                                        }
                                    />
                                </div>

                                {/* Subcategories — sirf spices page pe dikhao */}
                                {activePage === 'spices' && (
                                    <ul style={{
                                        listStyle: 'none', paddingLeft: '32px',
                                        margin: '4px 0 6px', borderLeft: '2px solid #e0d6f0'
                                    }}>
                                        {SPICE_SUBCATEGORIES.map(sub => (
                                            <li key={sub.key}
                                                onClick={() => onSubChange(sub.key)}
                                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '4px 0' }}>
                                                <span style={{
                                                    width: '8px', height: '8px', borderRadius: '50%',
                                                    background: activeSub === sub.key ? '#6f5a8e' : '#ccc',
                                                    marginRight: '8px', flexShrink: 0, transition: 'background 0.2s'
                                                }} />
                                                <span style={{
                                                    fontSize: '13px',
                                                    color:      activeSub === sub.key ? '#6f5a8e' : '#555',
                                                    fontWeight: activeSub === sub.key ? '600' : '400',
                                                    transition: 'color 0.2s'
                                                }}>
                                                    {sub.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>

                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Grocery"  /></li>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Food"     /></li>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Perfumes" /></li>
                        </ul>
                    </div>
                </div>

                {/* FILTER BY PRICE */}
                <div className="filterBox">
                    <h6>FILTER BY PRICE</h6>
                    <RangeSlider value={value} onInput={setValue} min={100} max={10000} step={5} />
                    <div className='d-flex pt-2 pb-2 priceRange' style={{ justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px' }}>From : <strong className='text-dark' style={{ fontSize: '12px' }}>₹{value[0]}</strong></span>
                        <span className='ml-auto' style={{ fontSize: '12px' }}>To : <strong className='text-dark' style={{ fontSize: '12px' }}>₹{value[1]}</strong></span>
                    </div>
                </div>

                {/* PRODUCT STATUS */}
                <div className="filterBox">
                    <h6>PRODUCT STATUS</h6>
                    <div className='scroll'>
                        <ul>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="In Stock" /></li>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="On Sale"  /></li>
                        </ul>
                    </div>
                </div>

                {/* BRANDS */}
                <div className="filterBox">
                    <h6>BRANDS</h6>
                    <div className='scroll'>
                        <ul>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Charbhuja"  /></li>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Amul"       /></li>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Aashirvaad" /></li>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Meggi"      /></li>
                            <li><FormControlLabel control={<Checkbox sx={checkboxSx} />} label="Haldiram"   /></li>
                        </ul>
                    </div>
                </div>

                <br />
                <Link to='#'>
                    <img src={Pista} className='w-100 cursor' alt="promo"
                        onClick={() => {
                            const product = productsData.find(p => p.id === 3);
                            setSelectedProduct(product);
                        }}
                    />
                </Link>

                {selectedProduct && (
                    <ProductModadl product={selectedProduct}
                        closeProductModadl={() => setSelectedProduct(null)} />
                )}
            </div>
        </div>
    );
};

export default Sidebar;