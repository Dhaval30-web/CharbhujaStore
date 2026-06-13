import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Profile from './Pages/Home/Profile';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Index';
import { createContext } from "react";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import Footer from "./Components/Footer";
import Listing from "./Pages/Home/Listing";
import ProductDetails from "./Pages/ProductDetails";
import ContactPage from "./Pages/ContactUs";
import Cart from "./Pages/Cart";
import SpicesPage from "./Pages/Home/Spices/index";
import CartToast from './Components/CartToast';
import PageLoader from './Components/Loader'; 
// import CharbhujaAdmin from "./Pages/Admin/CharbhujaAdmin";

const MyContext = createContext();

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut]     = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

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

  useEffect(()=> {
    getArea("http://localhost:5000/api/cities/Ahmedabad/areas");
    // getArea("http://localhost:5000/api/cities/Gandhinagar/areas");
  },[]);

  // const getArea = async(url)=>{
  //   const resposnsive = await axios.get(url).then((res)=> {
  //     setAreaList(res.data.areas)
  //     console.log(res.data.areas);
  //   })
  // }

  const getArea = async (url) => {
    await axios.get(url).then((res) => {
      setAreaList(res.data.areas);
    });
  };

  // Add item in cart
  const addToCart = (product, selectedWeightIndex) => {
    const weightOption = product.weightOptions
      ? product.weightOptions[selectedWeightIndex]
      : { label: 'default', oldPrice: product.oldPrice, newPrice: product.newPrice };

    const cartKey = `${product.id}-${weightOption.label}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartKey === cartKey);
      if (existing) {
        // Already hai toh quantity badhao
        return prev.map(item =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // New item add
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

  // Quantity update karo
  const updateQuantity = (cartKey, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.cartKey === cartKey
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Item remove karo
  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey));
  };

  // Cart totals
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.newPrice * item.quantity, 0
  );
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
    cartCount
  };

  return (
      <BrowserRouter>
        <MyContext.Provider value={values}>
          {isLoading && <PageLoader fadeOut={fadeOut} />}

          <Header />
          <Routes>
            <Route path='/' exact = {true} element={<Home />} />
            <Route path="/cat/:id" element={<Listing />} />
            <Route path="/profile" element={<Profile />} />
            <Route exact={true} path="/product/:id" element = {<ProductDetails/>} />
            <Route path="/spices" element={<SpicesPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/admin" element={<CharbhujaAdmin />} /> */}
          </Routes>
          <Footer/>

          <CartToast
                item={toastItem}
                onClose={() => setToastItem(null)}
          />
          
        </MyContext.Provider>
      </BrowserRouter>
  );
}

export default App;

export {MyContext}
