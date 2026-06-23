import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
// import { IoIosHeartEmpty } from 'react-icons/io';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ProductZoom from '../../Components/ProductZoom';
import QuantityBox from '../../Components/QuantityBox';
import ShareButton from '../../Components/ShareButton';
import productsData from '../../Data/ProductData';
import { useContext } from 'react';
import { MyContext } from '../../App';

const StarPicker = ({ value, onChange }) => (
    <div className="starPicker">
        {[1, 2, 3, 4, 5].map(s => (
            <span
                key={s}
                className={`starPickerStar ${s <= value ? 'filled' : ''}`}
                onClick={() => onChange(s)}
            >
                <FaStar />
            </span>
        ))}
    </div>
);

const ReviewCard = ({ review }) => {
    const initials = review.name.trim().slice(0, 2).toUpperCase();
    const date = new Date(review.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
    return (
        <div className="reviewCard">
            <div className="reviewCard-header">
                <div className="reviewAvatar">{initials}</div>
                <div>
                    <div className="reviewName">
                        {review.name}
                        <MdVerified className="verifiedIcon" />
                    </div>
                    <div className="reviewDate">{date}</div>
                </div>
                <div className="reviewStars ml-auto">
                    {[1,2,3,4,5].map(s => (
                        <FaStar key={s} className={s <= review.rating ? 'starFilled' : 'starEmpty'} />
                    ))}
                </div>
            </div>
            <p className="reviewComment">{review.comment}</p>
        </div>
    );
};

const RatingBar = ({ star, count, total }) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="ratingBar">
            <span className="ratingBarLabel">{star} <FaStar className="starFilled tiny" /></span>
            <div className="ratingBarTrack">
                <div className="ratingBarFill" style={{ width: `${pct}%` }} />
            </div>
            <span className="ratingBarCount">{count}</span>
        </div>
    );
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const product = productsData.find(p => p.id === parseInt(id));

    const [selectedWeight, setSelectedWeight] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [reviews, setReviews] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [ratingDist, setRatingDist] = useState({1:0,2:0,3:0,4:0,5:0});
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState(null);
    const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        if (product?.weightOptions) {
            const idx = product.weightOptions.findIndex(w => w.label === '1kg');
            setSelectedWeight(idx !== -1 ? idx : 0);
        }
    }, [product]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token || !product) return;

        fetch(`http://localhost:5000/api/wishlist/check/${product.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        .then(r => r.json())
        .then(data => { if (data.success) setInWishlist(data.inWishlist); })
        .catch(() => {});
    }, [product?.id]);

    const fetchReviews = async () => {
        if (!product) return;
        setLoadingReviews(true);
        try {
            const res = await fetch(`http://localhost:5000/api/reviews/${product.id}`);
            const data = await res.json();
            if (data.success) {
                setReviews(data.reviews);
                setReviewCount(data.count);
                setAvgRating(data.avgRating);
                const dist = {1:0,2:0,3:0,4:0,5:0};
                data.reviews.forEach(r => { dist[r.rating] = (dist[r.rating] || 0) + 1; });
                setRatingDist(dist);
            }
        } catch {
            // silently fail
        } finally {
            setLoadingReviews(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchReviews(); }, [product?.id]);

    if (!product) {
        return (
            <section className="section">
                <div className="container text-center py-5">
                    <h3>Product not found!</h3>
                    <Button className="btn-purple btn-round mt-3" onClick={() => navigate('/')}>
                        Back to Home
                    </Button>
                </div>
            </section>
        );
    }

    const activeOption = product.weightOptions
        ? product.weightOptions[selectedWeight]
        : { oldPrice: product.oldPrice, newPrice: product.newPrice };

    const handleWishlist = async () => {
        const token = localStorage.getItem('token');
        if(!token) { alert('Log in first!'); return; }

        if(inWishlist) {
            await fetch(`http://localhost:5000/api/wishlist/${product.id}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${token}`}
            });

            setInWishlist(false);
            context.setWishlistCount(prev => Math.max(0, prev - 1));
        }

        else {
            await context.addToWishlist(product, selectedWeight);
            setInWishlist(true);
        }
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.comment.trim() || form.rating === 0) {
            setSubmitMsg({ type: 'error', text: 'Please fill all fields and select a rating.' });
            return;
        }
        setSubmitting(true);
        setSubmitMsg(null);
        try {
            const res = await fetch(`http://localhost:5000/api/reviews/${product.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                const updatedReviews = [data.review, ...reviews];
                setReviews(updatedReviews);
                setReviewCount(data.count);
                setAvgRating(data.avgRating);
                const dist = {1:0,2:0,3:0,4:0,5:0};
                updatedReviews.forEach(r => { dist[r.rating] = (dist[r.rating] || 0) + 1; });
                setRatingDist(dist);
                setForm({ name: '', rating: 0, comment: '' });
                setSubmitMsg({ type: 'success', text: '✅ Review submitted! Thank you.' });
                setActiveTab('reviews');
            } else {
                setSubmitMsg({ type: 'error', text: data.message || 'Something went wrong.' });
            }
        } catch {
            setSubmitMsg({ type: 'error', text: 'Server error. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="productDetailsPage section">
            <div className="container">

                {/* Breadcrumb */}
                <div className="pdBreadcrumb mb-3">
                    <span className="pdBreadcrumb-link" onClick={() => navigate('/')}>Home</span>
                    <FaChevronRight className="pdBreadcrumb-sep" />
                    <span className="pdBreadcrumb-link">{product.meta.category}</span>
                    <FaChevronRight className="pdBreadcrumb-sep" />
                    <span className="pdBreadcrumb-current">{product.name}</span>
                </div>

                {/* Top Section */}
                <div className="pdTop row">
                    <div className="col-md-5">
                        <ProductZoom product={product} />
                    </div>

                    <div className="col-md-7 pdInfo">
                        {/* Badges */}
                        <div className="pdBadges mb-2">
                            {product.isBestSeller && <span className="pdTag bestSeller">🔥 Best Seller</span>}
                            {product.isNew && <span className="pdTag newTag">✨ New Arrival</span>}
                            <span className="pdTag discTag">{product.discount}% OFF</span>
                        </div>

                        <h2 className="pdTitle">{product.name}</h2>

                        {/* Brand + Rating */}
                        <div className="pdBrandRow d-flex align-items-center gap-3 mb-2 flex-wrap">
                            <span className="pdBrand">Brand: <b>{product.brand}</b></span>
                            <div className="d-flex align-items-center gap-1">
                                <Rating value={avgRating || product.rating} precision={0.5} readOnly size="small" />
                                <span className="pdRatingText">
                                    ({reviewCount > 0 ? `${reviewCount} review${reviewCount > 1 ? 's' : ''}` : 'No reviews yet'})
                                </span>
                            </div>
                        </div>

                        <hr />

                        {/* Price */}
                        <div className="pdPriceRow d-flex align-items-center mb-3 flex-wrap">
                            <span className="pdOldPrice">₹{activeOption.oldPrice}</span>
                            <span className="pdNewPrice">₹{activeOption.newPrice}</span>
                            <span className="pdSave">Save ₹{activeOption.oldPrice - activeOption.newPrice}</span>
                        </div>

                        <span className={`badge ${product.stock ? 'bg-success' : 'bg-danger'} mb-2`}>
                            {product.stock ? 'IN STOCK' : 'OUT OF STOCK'}
                        </span>

                        <p className="pdDesc mt-2 mb-3">{product.description}</p>

                        {/* Weight Selector */}
                        {product.weightOptions && (
                            <div className="weightSelector mb-3">
                                <span className="weightSelector-label">Available In:</span>
                                <div className="weightSelector-options">
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

                        {/* Cart Actions */}
                        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                            <QuantityBox />
                            <Button className="btn-purple btn-lg btn-big btn-round"
                                onClick={() => context.addToCart(product, selectedWeight)}
                            >
                                Add To Cart
                            </Button>
                        </div>

                        {/* Wishlist + Share */}
                        <div className="d-flex align-items-center gap-2 mb-3 flex-wrap actions">
                            <Button className="btn-round btn-sml" 
                                variant="outlined"
                                onClick={handleWishlist}
                                style={{ color: inWishlist ? '#e91e8c' : '', borderColor: inWishlist ? '#e91e8c' : '' }}    
                            >
                                {inWishlist ? <FaHeart style={{ color: '#e91e8c' }} /> : <FaRegHeart />}
                                &nbsp; {inWishlist ? 'It is in the Wishlist. ❤️' : 'Add To Wishlist'}
                            </Button>
                            <ShareButton productName={product.name} productUrl={window.location.href} />
                        </div>

                        {/* Meta */}
                        <div className="productMeta mt-2">
                            {[
                                ['Type', product.meta.type],
                                ['Weight', product.meta.weight],
                                ['MFG. Date', product.meta.mfgDate],
                                ['EXP. Date', product.meta.expDate],
                            ].map(([label, val]) => (
                                <div key={label} className="productMeta-item d-flex align-items-center">
                                    <IoCheckmarkCircle className="text-success mr-2" />
                                    <span className="label text-muted mr-2">{label} :</span>
                                    <span className="value"><b>{val}</b></span>
                                </div>
                            ))}
                            <hr className="my-2" />
                            <p className="mb-1" style={{ fontSize: '13px', color: '#666' }}>
                                <b>Category:</b> {product.meta.category}
                            </p>
                            <p className="mb-0" style={{ fontSize: '13px', color: '#666' }}>
                                <b>Tags:</b> {product.meta.tags}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Follow Us Section */}
                <div className="pdFollowUs mt-3">
                    <span className="pdFollowLabel">Follow Us :</span>
                    <div className="pdSocialIcons">
                        <a
                            href="https://www.instagram.com/prajapatidhaval96/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdSocialBtn instagram"
                            title="Follow on Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>

                        <a
                            href="https://www.facebook.com/share/1BLopGSJM3/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdSocialBtn facebook"
                            title="Follow on Facebook"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>

                        <a
                            href="https://wa.me/917435990900"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdSocialBtn whatsapp"
                            title="Chat on WhatsApp"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Tabs */}
                <div className="pdTabs mt-5">
                    <div className="pdTabNav">
                        {[
                            { key: 'description', label: 'Description' },
                            { key: 'additional',  label: 'Additional Info' },
                            { key: 'reviews',     label: `Reviews (${reviewCount})` },
                        ].map(tab => (
                            <button
                                key={tab.key}
                                className={`pdTabBtn ${activeTab === tab.key ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="pdTabContent">

                        {/* Description */}
                        {activeTab === 'description' && (
                            <div className="pdTabPane">
                                <p>{product.description}</p>
                                <p className="mt-3">
                                    At Charbhuja Store, we source only the finest quality products directly from
                                    trusted farms and suppliers. Every batch of <b>{product.name}</b> goes through
                                    strict quality checks to ensure you get the freshest, most authentic product
                                    delivered right to your door.
                                </p>
                                <ul className="pdDescList mt-3">
                                    <li><IoCheckmarkCircle /> 100% Natural &amp; Pure, no artificial additives</li>
                                    <li><IoCheckmarkCircle /> Hygienically packed in food-grade packaging</li>
                                    <li><IoCheckmarkCircle /> Sourced from premium farms</li>
                                    <li><IoCheckmarkCircle /> Best before date printed on every pack</li>
                                </ul>
                            </div>
                        )}

                        {/* Additional Info */}
                        {activeTab === 'additional' && (
                            <div className="pdTabPane">
                                <table className="pdInfoTable">
                                    <tbody>
                                        {[
                                            ['Brand',     product.brand],
                                            ['Type',      product.meta.type],
                                            ['Category',  product.meta.category],
                                            ['Weight',    product.meta.weight],
                                            ['MFG. Date', product.meta.mfgDate],
                                            ['EXP. Date', product.meta.expDate],
                                            ['In Stock',  product.stock ? 'Yes' : 'No'],
                                            ['Tags',      product.meta.tags],
                                        ].map(([k, v]) => (
                                            <tr key={k}>
                                                <td className="pdInfoKey">{k}</td>
                                                <td className="pdInfoVal">{v}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Reviews */}
                        {activeTab === 'reviews' && (
                            <div className="pdTabPane">

                                {/* Rating Summary */}
                                {reviewCount > 0 && (
                                    <div className="ratingOverview mb-4">
                                        <div className="ratingBig">
                                            <span className="ratingBigNum">{avgRating}</span>
                                            <Rating value={avgRating} precision={0.5} readOnly />
                                            <span className="ratingBigSub">{reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="ratingBars">
                                            {[5,4,3,2,1].map(s => (
                                                <RatingBar key={s} star={s} count={ratingDist[s] || 0} total={reviewCount} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Review List */}
                                {loadingReviews ? (
                                    <p className="text-muted">Loading reviews…</p>
                                ) : reviews.length === 0 ? (
                                    <p className="text-muted">No reviews yet. Be the first to review!</p>
                                ) : (
                                    <div className="reviewList mb-4">
                                        {reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
                                    </div>
                                )}

                                {/* Review Form */}
                                <div className="reviewForm">
                                    <h5 className="reviewFormTitle">Write a Review</h5>
                                    <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                                        Your email address will not be published.
                                    </p>

                                    <div className="rfField">
                                        <label className="rfLabel">Your Rating *</label>
                                        <StarPicker
                                            value={form.rating}
                                            onChange={v => setForm(f => ({ ...f, rating: v }))}
                                        />
                                    </div>

                                    <div className="rfField">
                                        <label className="rfLabel">Your Name *</label>
                                        <input
                                            className="rfInput"
                                            type="text"
                                            placeholder="Enter your name"
                                            value={form.name}
                                            maxLength={60}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        />
                                    </div>

                                    <div className="rfField">
                                        <label className="rfLabel">Your Review *</label>
                                        <textarea
                                            className="rfInput rfTextarea"
                                            placeholder="Share your experience with this product…"
                                            value={form.comment}
                                            maxLength={1000}
                                            rows={5}
                                            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                                        />
                                        <span className="rfCharCount">{form.comment.length}/1000</span>
                                    </div>

                                    {submitMsg && (
                                        <div className={`rfAlert ${submitMsg.type}`}>
                                            {submitMsg.text}
                                        </div>
                                    )}

                                    <button
                                        className="rfSubmitBtn"
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Submitting…' : 'Submit Review'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProductDetails;