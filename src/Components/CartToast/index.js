import { useEffect } from 'react';
import './style.css';

const CartToast = ({ item, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3500);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!item) return null;

    return (
        <div className="cartToast">
            <div className="cartToast-img">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="cartToast-body">
                <p className="cartToast-name">"{item.name}"</p>
                <p className="cartToast-sub">has been added to your cart.</p>
            </div>
            <button className="cartToast-close" onClick={onClose}>✕</button>
        </div>
    );
};

export default CartToast;