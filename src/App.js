import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Index';
import { createContext } from "react";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

const MyContext = createContext();

function App() {

  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(()=> {
    getArea("http://localhost:5000/api/cities/Ahmedabad/areas");
    // getArea("http://localhost:5000/api/cities/Gandhinagar/areas");
  },[]);

  const getArea = async(url)=>{
    const resposnsive = await axios.get(url).then((res)=> {
      setAreaList(res.data.areas)
      console.log(res.data.areas);
    })
  }

  const values = {
    areaList,
    setSelectedArea,
    selectedArea
  }

  return (
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path='/' exact = {true} element={<Home />} />
          </Routes>
        </MyContext.Provider>
      </BrowserRouter>
  );
}

export default App;

export {MyContext}
