import Cart from './components/Cart/Cart'
import CartProvider from './components/CartContext/CartContext'
import './App.css'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'
import CheckOut from './components/CheckOut/CheckOut'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Footer from './components/Footer/Footer'
import React, { useState, useEffect } from 'react';

function App() {
 
  return (
    <CartProvider>
    <BrowserRouter>
    <div className='app'>
      <NavBar/>
      <br />
      <Routes>
        <Route path='/' element={<ItemListContainer/>} />
        <Route path='/category/:categoryId' element={<ItemListContainer/>} />
        <Route path='/product/:productId' element={<ItemDetailContainer/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<CheckOut/>}/>
      </Routes>
      <br />
    <Footer/>
    </div>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
