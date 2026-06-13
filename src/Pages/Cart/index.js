import { useContext } from 'react';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
// import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(MyContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <section className="section cartPage">
        <div className="container text-center py-5">
          <div className="emptyCart">
            <div className="emptyCart-icon">🛍️</div>
            <h3 className="emptyCart-title">YOUR CART IS CURRENTLY EMPTY.</h3>
            <button className="emptyCart-btn" onClick={() => navigate('/')}>
              Return to shop
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section cartPage">
      <div className="container">
        <div className="row">

          {/* Left: Product Table */}
          <div className="col-md-8">
            <h2 className="hd mb-1">Your Cart</h2>
            <p className="mb-3">
              There are <b>{cartItems.length}</b> product{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>

            <div className="table-responsive">
              <table className="table cartTable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Sub-Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.cartKey}>
                      {/* Product */}
                      <td>
                        <div className="cartProduct d-flex align-items-center gap-3">
                          <img src={item.image} alt={item.name} className="cartProduct-img" />
                          <div>
                            <p className="cartProduct-name mb-0">{item.name}</p>
                            <span className="cartProduct-weight">{item.weightLabel}</span>
                          </div>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td>
                        <span className="cartPrice">₹{item.newPrice}</span>
                      </td>

                      {/* Quantity */}
                      <td>
                        <div className="cartQty d-flex align-items-center gap-2">
                          <button
                            className="cartQtyBtn"
                            onClick={() => updateQuantity(item.cartKey, -1)}
                          >−</button>
                          <span className="cartQtyNum">{item.quantity}</span>
                          <button
                            className="cartQtyBtn"
                            onClick={() => updateQuantity(item.cartKey, 1)}
                          >+</button>
                        </div>
                      </td>

                      {/* Sub-Total */}
                      <td>
                        <span className="cartSubtotal">
                          ₹{(item.newPrice * item.quantity).toFixed(2)}
                        </span>
                      </td>

                      {/* Remove */}
                      <td>
                        <button
                          className="cartRemoveBtn"
                          onClick={() => removeFromCart(item.cartKey)}
                          title="Remove"
                        >✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="cartContinueBtn" onClick={() => navigate('/')}>
              ← Continue Shopping
            </button>
          </div>

          {/* Right: Cart Totals */}
          <div className="col-md-4">
            <div className="cartTotals">
              <h4 className="cartTotals-title">CART TOTALS</h4>

              <div className="cartTotals-row">
                <span>Subtotal</span>
                <span className="cartTotals-val">₹{cartTotal.toFixed(2)}</span>
              </div>

              <div className="cartTotals-row">
                <span>Shipping</span>
                <span className="cartTotals-free">Free Shipping</span>
              </div>

              <div className="cartTotals-row total">
                <span>Total</span>
                <span className="cartTotals-total">₹{cartTotal.toFixed(2)}</span>
              </div>

              <button className="cartCheckoutBtn" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;