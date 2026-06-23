import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar";
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductModadl from "../../../Components/ProductModal";
import productsData from "../../../Data/ProductData";
import Rating from '@mui/material/Rating';
import { IoIosHeartEmpty } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import GroceryBanner from '../../../Assets/Images/Posters/Chili.jpg'; // ← apna grocery banner laga lena

const SUBCATEGORY_MAP = {
    "daal":                 (p) => /daal|dal|toor|moong|chana|masoor|urad|lentil/i.test(p.name + p.meta.tags),
    "anaj":                 (p) => /anaj|grain|rice|chawal|wheat grain|bajra|jowar/i.test(p.name + p.meta.tags),
    "atta-flour":           (p) => /aata|atta|flour|maida|besan/i.test(p.name + p.meta.tags),
    "oil-ghee":             (p) => /oil|ghee|til oil|mustard oil|sunflower oil/i.test(p.name + p.meta.tags),
    "condiments":           (p) => /sauce|ketchup|vinegar|condiment|chutney/i.test(p.name + p.meta.tags),
    "snacks-namkeen":       (p) => /snack|namkeen|chips|bhujia|sev/i.test(p.name + p.meta.tags),
    "dry-fruits-nuts":      (p) => /dry fruit|nuts|almond|cashew|pistachio|walnut|raisin|kishmish|anjeer|akhrot/i.test(p.name + p.meta.tags),
    "tea-coffee":           (p) => /tea|coffee|chai|kahwa/i.test(p.name + p.meta.tags),
    "household-essentials": (p) => /household|cleaning|detergent|soap|essential/i.test(p.name + p.meta.tags),
};

const SUBCATEGORY_LABELS = {
    "daal":                 "Daal",
    "anaj":                 "Anaj",
    "atta-flour":           "Atta & Flour",
    "oil-ghee":             "Oil & Ghee",
    "condiments":           "Condiments",
    "snacks-namkeen":       "Snacks & Namkeen",
    "dry-fruits-nuts":      "Dry Fruits & Nuts",
    "tea-coffee":           "Tea & Coffee",
    "household-essentials": "Household Essentials",
};

const allGrocery = productsData.filter(p => p.meta.category === "Grocery");

const GroceryPage = () => {
    const location  = useLocation();
    const navigate  = useNavigate();
    const params    = new URLSearchParams(location.search);
    const activeSub = params.get("sub") || null;

    const [anchorEl, setAnchorEl]               = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productView, setProductView]         = useState('four');
    const [showPerPage, setShowPerPage]         = useState(6);
    const [page, setPage]                       = useState(1);

    const filteredProducts = useMemo(() => {
        if (!activeSub || !SUBCATEGORY_MAP[activeSub]) return allGrocery;
        return allGrocery.filter(SUBCATEGORY_MAP[activeSub]);
    }, [activeSub]);

    const totalPages        = Math.ceil(filteredProducts.length / showPerPage);
    const paginatedProducts = filteredProducts.slice((page - 1) * showPerPage, page * showPerPage);

    const handleSubChange = (subKey) => {
        setPage(1);
        activeSub === subKey ? navigate('/grocery') : navigate(`/grocery?sub=${subKey}`);
    };

    return (
        <section className="product_Listing_Page">
            <div className="container">
                <div className="productListing d-flex">

                    <Sidebar
                        activePage="grocery"
                        activeSub={activeSub}
                        onSubChange={handleSubChange}
                    />

                    <div className="content_right">
                        <img src={GroceryBanner} className='w-100 cursor' alt="Grocery Banner"
                            style={{ borderRadius: '8px' }} />

                        {/* Active filter chip */}
                        {activeSub && (
                            <div className="mt-3 d-flex align-items-center" style={{ gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '13px', color: '#888' }}>Showing:</span>
                                <span style={{
                                    background: '#6f5a8e', color: '#fff',
                                    padding: '4px 14px', borderRadius: '20px',
                                    fontSize: '13px', fontWeight: '600',
                                    display: 'flex', alignItems: 'center', gap: '6px'
                                }}>
                                    {SUBCATEGORY_LABELS[activeSub]}
                                    <span
                                        onClick={() => { setPage(1); navigate('/grocery'); }}
                                        style={{ cursor: 'pointer', fontWeight: '700', fontSize: '15px', lineHeight: 1 }}
                                    >×</span>
                                </span>
                                <span style={{ fontSize: '13px', color: '#888' }}>
                                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                                </span>
                            </div>
                        )}

                        {/* Show by bar */}
                        <div className="showBy mt-3 mb-3 d-flex align-items-center">
                            <div className="d-flex align-items-center btnWrapper">
                                <Button className={productView === 'one'   ? 'act' : ''} onClick={() => setProductView('one')}>   <IoIosMenu />        </Button>
                                <Button className={productView === 'two'   ? 'act' : ''} onClick={() => setProductView('two')}>   <HiViewGrid />       </Button>
                                <Button className={productView === 'three' ? 'act' : ''} onClick={() => setProductView('three')}> <CgMenuGridO />      </Button>
                                <Button className={productView === 'four'  ? 'act' : ''} onClick={() => setProductView('four')}>  <TfiLayoutGrid4Alt /></Button>
                            </div>
                            <div className="ml-auto showByFilter" style={{ marginLeft: 'auto' }}>
                                <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                                    Show {showPerPage} <FaAngleDown />
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    className="w-100 showPerPageDropdown"
                                >
                                    {[3, 6, 9, 12].map(n => (
                                        <MenuItem key={n} onClick={() => { setShowPerPage(n); setPage(1); setAnchorEl(null); }}>
                                            Show {n}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </div>

                        {/* Product grid */}
                        {paginatedProducts.length === 0 ? (
                            <div className="text-center py-5">
                                <p style={{ color: '#888', fontSize: '16px' }}>
                                    No products found in <b>{SUBCATEGORY_LABELS[activeSub]}</b>.
                                </p>
                                <Button
                                    onClick={() => { setPage(1); navigate('/grocery'); }}
                                    style={{ background: '#6f5a8e', color: '#fff', borderRadius: '20px', marginTop: '10px' }}
                                >
                                    Show All Grocery
                                </Button>
                            </div>
                        ) : (
                            <div className={`productListing productView-${productView}`}>
                                {paginatedProducts.map((product) => (
                                    <div key={product.id} className={`productItem ${productView}`}
                                        onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>

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
                                            <div className="actions">
                                                <Button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}>
                                                    <MdZoomOutMap />
                                                </Button>
                                                <Button onClick={(e) => e.stopPropagation()}>
                                                    <IoIosHeartEmpty />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="info" style={{ padding: '10px' }}>
                                            <h6 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', lineHeight: '1.3' }}>
                                                {product.name}
                                            </h6>
                                            <p style={{ fontSize: '13px', fontWeight: '600', margin: '4px 0',
                                                color: product.stock ? '#16b858' : '#dc3545' }}>
                                                {product.stock ? 'In Stock' : 'Out of Stock'}
                                            </p>
                                            <Rating name={`rating-${product.id}`} value={product.rating}
                                                readOnly size="small" precision={0.5} />
                                            <p style={{ margin: '6px 0 0' }}>
                                                <s style={{ color: 'rgba(0,0,0,0.4)', fontSize: '13px' }}>₹{product.oldPrice}</s>
                                                <span style={{ color: '#dc3545', fontWeight: '700', fontSize: '18px', marginLeft: '8px' }}>
                                                    ₹{product.newPrice}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedProduct && (
                            <ProductModadl product={selectedProduct}
                                closeProductModadl={() => setSelectedProduct(null)}
                                itemView={productView} />
                        )}
                    </div>
                </div>

                {totalPages > 1 && (
                    <div className="d-flex align-items-center justify-content-center mt-4">
                        <Pagination count={totalPages} page={page}
                            onChange={(_, val) => { setPage(val); window.scrollTo(0, 0); }}
                            color="secondary" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default GroceryPage;