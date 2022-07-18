
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Category from './components/Category';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import MiCarrito from './components/MiCarrito';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MyProvider from './context/CartContext';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Checkout from './components/Checkout';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



export default function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBBddJ9LmgnAq6xv1yQKZdQDhjcQ2AfGlI",
    authDomain: "thestroke-58919.firebaseapp.com",
    projectId: "thestroke-58919",
    storageBucket: "thestroke-58919.appspot.com",
    messagingSenderId: "544020434613",
    appId: "1:544020434613:web:a52223adf6922ea82ff8fc"
  };

  initializeApp(firebaseConfig);

  return (
    <>     
    <MyProvider>
      <BrowserRouter>
        <NavBar />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/home' element={<ItemListContainer />} />
        <Route path='/producto/:idProducto' element={<ItemDetailContainer/>} />
        <Route path='/categoria/:categoryName' element={<Category />} />
        <Route path='/miCarrito' element={<MiCarrito />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </MyProvider>      
    </>
  );
}
