import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Profile from './Pages/Home/Profile';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Index';
import { createContext } from "react";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Footer from "./Components/Footer";
import Listing from "./Pages/Home/Listing";
import ProductDetails from "./Pages/ProductDetails";
import ContactPage from "./Pages/ContactUs";
import Cart from "./Pages/Cart";
import SpicesPage from "./Pages/Home/Spices/index";
import GroceryPage from "./Pages/Home/Grocery/index";
import CartToast from './Components/CartToast';
import WishlistToast from './Components/WishlistToast';
import WishlistPage from './Pages/Wishlist';
import PageLoader from './Components/Loader';

const MyContext = createContext();

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  // Cart
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const [toastItem, setToastItem] = useState(null);

  // Wishlist
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistToastItem, setWishlistToastItem] = useState(null);

  const fetchWishlistCount = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) { setWishlistCount(0); return; }
    try {
      const res = await fetch('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setWishlistCount(data.count);
    } catch { }
  }, []);

  useEffect(() => { fetchWishlistCount(); }, [fetchWishlistCount]);

  const addToWishlist = useCallback(async (product, selectedWeightIndex = 0) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login First!');
      return;
    }

    const weightOption = product.weightOptions
      ? product.weightOptions[selectedWeightIndex]
      : { label: 'default', oldPrice: product.oldPrice, newPrice: product.newPrice };

    try {
      const res = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId:   product.id,
          name:        product.name,
          brand:       product.brand,
          image:       product.images[0],   // fix: images
          oldPrice:    weightOption.oldPrice,
          newPrice:    weightOption.newPrice,
          weightLabel: weightOption.label,
        }),
      });

      const data = await res.json();
      if (data.success) setWishlistCount(data.count);

      setWishlistToastItem({
        name:        product.name,
        image:       product.images[0],    // fix: images
        alreadyAdded: data.alreadyAdded || false,
      });
    } catch {
      alert('Something went wrong, Try Again!');
    }
  }, []);

  useEffect(() => {
    getArea("http://localhost:5000/api/cities/Ahmedabad/areas");
  }, []);

  const getArea = async (url) => {
    await axios.get(url).then((res) => {
      setAreaList(res.data.areas);
    });
  };

  // Cart functions
  const addToCart = (product, selectedWeightIndex) => {
    const weightOption = product.weightOptions
      ? product.weightOptions[selectedWeightIndex]
      : { label: 'default', oldPrice: product.oldPrice, newPrice: product.newPrice };

    const cartKey = `${product.id}-${weightOption.label}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartKey === cartKey);
      if (existing) {
        return prev.map(item =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        cartKey,
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        weightLabel: weightOption.label,
        oldPrice: weightOption.oldPrice,
        newPrice: weightOption.newPrice,
        quantity: 1,
      }];
    });

    setToastItem({
      name: product.name,
      image: product.images[0],
      weightLabel: weightOption.label,
    });
  };

  const updateQuantity = (cartKey, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.cartKey === cartKey
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.newPrice * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const values = {
    areaList,
    setSelectedArea,
    selectedArea,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    // Wishlist — ye teeno pehle missing the
    wishlistCount,
    setWishlistCount,
    addToWishlist,
    fetchWishlistCount,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isLoading && <PageLoader fadeOut={fadeOut} />}

        <Header />
        <Routes>
          <Route path='/' exact={true} element={<Home />} />
          <Route path="/cat/:id" element={<Listing />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact={true} path="/product/:id" element={<ProductDetails />} />
          <Route path="/spices" element={<SpicesPage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
        <Footer />

        <CartToast
          item={toastItem}
          onClose={() => setToastItem(null)}
        />
        <WishlistToast
          item={wishlistToastItem}
          onClose={() => setWishlistToastItem(null)}
        />

      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };