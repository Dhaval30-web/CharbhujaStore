import { useContext } from 'react';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './style.css';

const MiniCart = () => {
  const { cartItems, cartTotal, removeFromCart } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <div className="miniCart">
      <div className="miniCart-list">
        {cartItems.map(item => (
          <div key={item.cartKey} className="miniCart-item">
            <button
              className="miniCart-remove"
              onClick={() => removeFromCart(item.cartKey)}
            >×</button>
            <img src={item.image} alt={item.name} className="miniCart-img" />
            <div className="miniCart-info">
              <p className="miniCart-name">{item.name}</p>
              <p className="miniCart-meta">
                {item.weightLabel} — {item.quantity} × <span className="miniCart-price">₹{item.newPrice}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="miniCart-footer">
        <div className="miniCart-subtotal">
          <span>Subtotal:</span>
          <span className="miniCart-total">₹{cartTotal.toFixed(2)}</span>
        </div>
        <button
          className="miniCart-viewBtn"
          onClick={() => navigate('/cart')}
        >
          View Cart
        </button>
        <button
          className="miniCart-checkoutBtn"
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default MiniCart;