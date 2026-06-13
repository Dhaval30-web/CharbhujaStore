import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { IoClose } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOpenInNew } from "react-icons/md";
import { IoCheckmarkCircle } from 'react-icons/io5';
import ShareButton from '../ShareButton';
import { useState, useEffect } from 'react';
import QuantityBox from '../QuantityBox';
import ProductZoom from '../ProductZoom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../App';

const ProductModal = (props) => {
    const { product } = props;
    const navigate = useNavigate();
    const context = useContext(MyContext);

    const [selectedWeight, setSelectedWeight] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [avgRating, setAvgRating] = useState(0);

    useEffect(() => {
        if (product?.weightOptions) {
            const idx = product.weightOptions.findIndex(w => w.label === "1kg");
            setSelectedWeight(idx !== -1 ? idx : 0);
        }
    }, [product]);

    useEffect(() => {
        if (!product) return;
        fetch(`http://localhost:5000/api/reviews/${product.id}`)
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    setReviewCount(data.count);
                    setAvgRating(data.avgRating);
                }
            })
            .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.id]);

    if (!product) return null;

    const activeOption = product.weightOptions
        ? product.weightOptions[selectedWeight]
        : { oldPrice: product.oldPrice, newPrice: product.newPrice };

    const goToDetails = () => {
        props.closeProductModadl(); // tumhara original typo
        navigate(`/product/${product.id}`);
    };

    return (
        <Dialog
            open={true}
            className={`productModal ${props.itemView}`}
            onClose={() => props.closeProductModadl()}
        >
            <Button className="closeButton" onClick={() => props.closeProductModadl()}>
                <IoClose />
            </Button>

            {/* Title + More Info */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                paddingRight: '40px',
                marginBottom: '8px'
            }}>
                <h5 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: 'rgba(0,0,0,0.8)' }}>
                    {product.name}
                </h5>
                <Button className="moreInfoBtn" onClick={goToDetails}>
                    <MdOpenInNew style={{ marginRight: 5 }} /> More Info
                </Button>
            </div>

            {/* Brand + Rating */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span>Brand : &nbsp;<b>{product.brand}</b></span>
                <Rating
                    value={avgRating || product.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                    style={{ marginLeft: '15px' }}
                />
                {reviewCount > 0 && (
                    <span style={{ fontSize: '12px', color: '#888' }}>
                        ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
                    </span>
                )}
            </div>

            <hr />

            <div className='row mt-2 productDetailModal'>
                <div className='col-md-5'>
                    <ProductZoom product={product} />
                </div>

                <div className='col-md-7' style={{ paddingLeft: '30px' }}>
                    <div className='d-flex info align-items-center mb-2'>
                        <span className='oldPrice lg mr-2'>₹{activeOption.oldPrice}</span>
                        <span className='netPrice text-danger lg'>₹{activeOption.newPrice}</span>
                    </div>

                    <span className='badge bg-success'>
                        {product.stock ? "IN STOCK" : "OUT OF STOCK"}
                    </span>

                    <p className='mt-2'>{product.description}</p>

                    {product.weightOptions && (
                        <div className='weightSelector mb-3'>
                            <span className='weightSelector-label'>Available In :</span>
                            <div className='weightSelector-options'>
                                {product.weightOptions.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`weightBtn ${selectedWeight === i ? 'active' : ''}`}
                                        onClick={() => setSelectedWeight(i)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='d-flex align-items-center'>
                        <QuantityBox />
                        <Button
                            className='btn-purple btn-lg btn-big btn-round ml-3'
                            style={{ paddingLeft: '40px' }}
                            onClick={() => context.addToCart(product, selectedWeight)}
                        >
                            Add To Cart
                        </Button>
                    </div>

                    <div className='d-flex align-items-center mt-4 actions'>
                        <Button className='btn-round btn-sml' variant="outlined">
                            <IoIosHeartEmpty /> &nbsp; Add To Wishlist
                        </Button>
                        <ShareButton
                            productName={product.name}
                            productUrl={window.location.href}
                        />
                    </div>

                    <div className='productMeta mt-3'>
                        {[
                            ['Type', product.meta.type],
                            ['Weight', product.meta.weight],
                            ['MFG. Date', product.meta.mfgDate],
                            ['EXP. Date', product.meta.expDate],
                        ].map(([label, val]) => (
                            <div key={label} className='productMeta-item d-flex align-items-center'>
                                <IoCheckmarkCircle className='text-success mr-2' />
                                <span className='label text-muted mr-2'>{label} :</span>
                                <span className='value'><b>{val}</b></span>
                            </div>
                        ))}
                        <hr className='my-2' />
                        <p className='mb-0' style={{ fontSize: '13px', color: '#666' }}>
                            <b>Category:</b> {product.meta.category}
                        </p>
                        <p className='mb-0' style={{ fontSize: '13px', color: '#666' }}>
                            <b>Tags:</b> {product.meta.tags}
                        </p>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ProductModal;