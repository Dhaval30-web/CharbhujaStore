import { useEffect } from "react";
import { FaHeart } from 'react-icons/fa';
import './style.css';

const WishlistToast = ({ item, onClose }) => {
    useEffect(() => {
        if (!item) return;
        const timer = setTimeout(onClose, 3500);
        return () => clearTimeout(timer);
    }, [item, onClose]);

    if (!item) return null;

    return (
        <div className="wishlistToast">
            <div className="wishlistToast-icon">
                <FaHeart />
            </div>

            <div className="wishlistToast-img">
                <img src={item.image} alt={item.name} />
            </div>

            <div className="wishlistToast-body">
                <p className="wishlistToast-name">"{item.name}"</p>
                <p className="wishlistToast-sub">
                    {item.alreadyAdded
                        ? 'It is already on the wishlist!'
                        : 'Added to the wishlist! ❤️'}
                </p>
            </div>
            <button className="wishlistToast-close" onClick={onClose}>✕</button>
        </div>
    );
};

export default WishlistToast;