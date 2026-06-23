import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { MyContext } from '../../App';
import './style.css';
import Button from '@mui/material/Button';

const WishlistPage = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        const tok = localStorage.getItem('token');
        if (!tok) { setLoading(false); return; }
        setLoading(true);
        fetch('http://localhost:5000/api/wishlist', {
            headers: { Authorization: `Bearer ${tok}` }
        })
        .then(r => r.json())
        .then(data => { if (data.success) setItems(data.items); })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, []);

    const handleRemove = async (productId) => {
        try {
            await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(prev => prev.filter(i => i.productId !== productId));
            context.setWishlistCount(prev => Math.max(0, prev - 1));
        } catch { }
    };

    const handleAddToCart = (item) => {
        const fakeProduct = {
            id: item.productId,
            name: item.name,
            brand: item.brand,
            images: [item.image],
            oldPrice: item.oldPrice,
            newPrice: item.newPrice,
            weightOptions: null,
        };
        context.addToCart(fakeProduct, 0);
    };

    if (!user || !token) {
        return (
            <section className="section">
                <div className="container text-center py-5">
                    <FaHeart style={{ fontSize: 60, color: '#e91e8c', marginBottom: 16 }} />
                    <h3>Please, Login First!</h3>
                    <p className="text-muted">You need to log in to view the wishlist.</p>
                    <Button className="wishlist-shopBtn mt-3" onClick={() => navigate('/login')}>
                        Login First
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="section wishlistPage">
            <div className="container">
                <div className="wishlistPage-header">
                    <h2 className="wishlistPage-title">
                        <FaHeart className="wishlistPage-heartIcon" /> My Wishlist
                    </h2>
                    {items.length > 0 && (
                        <span className="wishlistPage-count">
                            {items.length} item{items.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="wishlistPage-loading">
                        <div className="wishlistSpinner" />
                        <p>Loading Wishlist...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="wishlistPage-empty">
                        <FaHeart className="emptyHeartIcon" />
                        <h4>The wishlist is empty!</h4>
                        <p>If you like any product, add it to your wishlist.</p>
                        <Button className="wishlist-shopBtn" onClick={() => navigate('/')}>
                            Start shopping
                        </Button>
                    </div>
                ) : (
                    <div className="wishlistGrid">
                        {items.map(item => (
                            <div key={item._id} className="wishlistCard">
                                <Button
                                    className="wishlistCard-remove"
                                    onClick={() => handleRemove(item.productId)}
                                >
                                    <FaTrash />
                                </Button>

                                <div
                                    className="wishlistCard-img"
                                    onClick={() => navigate(`/product/${item.productId}`)}
                                >
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <div className="wishlistCard-info">
                                    <h5
                                        className="wishlistCard-name"
                                        onClick={() => navigate(`/product/${item.productId}`)}
                                    >
                                        {item.name}
                                    </h5>
                                    {item.brand && (
                                        <p className="wishlistCard-brand">Brand: <b>{item.brand}</b></p>
                                    )}
                                    <div className="wishlistCard-prices">
                                        <span className="wishlistCard-old">₹{item.oldPrice}</span>
                                        <span className="wishlistCard-new">₹{item.newPrice}</span>
                                    </div>
                                </div>

                                <Button
                                    className="wishlistCard-cartBtn"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <FaShoppingCart /> Add to cart
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default WishlistPage;