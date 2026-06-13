import React from "react";
import Sidebar from "../../../Components/Sidebar";
import Chili from '../../../Assets/Images/Posters/Chili.jpg';
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import ProductModadl from "../../../Components/ProductModal";
import productsData from "../../../Data/ProductData";
import Rating from '@mui/material/Rating';
import { IoIosHeartEmpty } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import Pagination from '@mui/material/Pagination';

const Listing = () => {

    const id = React.useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const products = productsData;

    const [productView,setProductView] = useState('four');
    const [showPerPage, setShowPerPage] = useState(3);

    return(
        <>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing d-flex">
                        <Sidebar/>

                        <div className="content_right">
                            <img 
                                src={Chili} 
                                className='w-100 cursor' 
                                alt="Chili"
                                style={{borderRadius : '8px'}}
                            />

                            {/* ===== SHOW BY BAR ===== */}

                            <div className="showBy mt-3 mb-3 d-flex align-items-center">

                                {/* View Icons */}
                                <div className="d-flex align-items-center btnWrapper">
                                    <Button className={productView ===  'one' && 'act'} 
                                        onClick={()=> setProductView('one')}> <IoIosMenu/> 
                                    </Button>
                                    <Button className={productView ===  'two' && 'act'}
                                        onClick={()=> setProductView('two')}> <HiViewGrid/> 
                                    </Button>
                                    <Button className={productView ===  'three' && 'act'}
                                        onClick={()=> setProductView('three')}> <CgMenuGridO/> 
                                    </Button>
                                    <Button className={productView ===  'four' && 'act'}
                                        onClick={()=> setProductView('four')}> <TfiLayoutGrid4Alt/> 
                                    </Button>
                                </div>
                                
                                {/* Show Per Page Dropdown */}
                                <div className="ml-auto showByFilter" style={{marginLeft: "auto"}}>
                                    <Button onClick={handleClick}>
                                        Show {showPerPage} <FaAngleDown />
                                    </Button>

                                    <Menu
                                        className="w-100 showPerPageDropdown"
                                        id={menuId}
                                        anchorEl={anchorEl}
                                        open={openDropdown}
                                        onClose={handleClose}
                                        slotProps={{
                                        list: {
                                            'aria-labelledby': buttonId,
                                        },
                                        }}
                                    >
                                        <MenuItem onClick={() => { setShowPerPage(3); handleClose(); }}>Show 3</MenuItem>
                                        <MenuItem onClick={() => { setShowPerPage(6); handleClose(); }}>Show 6</MenuItem>
                                        <MenuItem onClick={() => { setShowPerPage(9); handleClose(); }}>Show 9</MenuItem>
                                        <MenuItem onClick={() => { setShowPerPage(12); handleClose(); }}>Show 12</MenuItem>
                                    </Menu>
                                </div>
                            </div>

                            {/* ===== PRODUCT GRID ===== */}

                            <div className={`productListing productView-${productView}`}>
                                 {products.slice(0, showPerPage).map((product) => (
                                    <div
                                        key={product.id}
                                        className={`productItem ${productView}`}
                                        onClick={() => handleProductClick(product)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {/* Image + Badge */}
                                        <div className="imgWrapper" style={{ position: 'relative' }}>
                                            {product.discount > 0 && (
                                                <span style={{
                                                    position: 'absolute', top: '10px', left: '10px',
                                                    background: '#695588', color: '#fff',
                                                    padding: '4px 8px', borderRadius: '5px',
                                                    fontSize: '12px', fontWeight: '600', zIndex: 1
                                                }}>
                                                    {product.discount}%
                                                </span>
                                            )}
                                            <img src={product.images[0]} alt={product.name} />

                                            {/* ===== ACTION BUTTONS ===== */}
                                            <div className="actions">
                                                <Button
                                                    onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}
                                                >
                                                    <MdZoomOutMap />
                                                </Button>
                                                <Button onClick={(e) => e.stopPropagation()}>
                                                    <IoIosHeartEmpty />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="info" style={{ padding: '10px' }}>

                                            {/* Name */}
                                            <h6 style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                marginBottom: '5px',
                                                lineHeight: '1.3'
                                            }}>
                                                {product.name}
                                            </h6>

                                            {/* In Stock */}
                                            <p style={{
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                margin: '4px 0',
                                                color: product.stock ? '#16b858' : '#dc3545'
                                            }}>
                                                {product.stock ? 'In Stock' : 'Out of Stock'}
                                            </p>

                                            {/* MUI Rating - directly from productData */}
                                            <Rating
                                                name={`rating-${product.id}`}
                                                value={product.rating}
                                                readOnly
                                                size="small"
                                                precision={0.5}
                                            />

                                            {/* Price */}
                                            <p style={{ margin: '6px 0 0' }}>
                                                <s style={{
                                                    color: 'rgba(0,0,0,0.4)',
                                                    fontSize: '13px'
                                                }}>
                                                    ₹{product.oldPrice}
                                                </s>
                                                <span style={{
                                                    color: '#dc3545',
                                                    fontWeight: '700',
                                                    fontSize: '18px',
                                                    marginLeft: '8px'
                                                }}>
                                                    ₹{product.newPrice}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* Modal */}
                            {selectedProduct && (
                                <ProductModadl
                                    product={selectedProduct}
                                    closeProductModadl={closeModal}
                                    itemView={productView}
                                />
                            )}

                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center mt-4">
                            <Pagination count={10} color="secondary" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Listing