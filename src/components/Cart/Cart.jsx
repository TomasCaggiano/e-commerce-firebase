import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { Link } from 'react-router-dom';
import CheckOut from '../CheckOut/CheckOut';
import './Cart.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function CartItem({ image, price, title, quantity, stock, id, removeFromCart }) {
  const { increment, decrement } = useContext(CartContext);

  const product = { image, price, title, quantity, stock, id };
  return (
    <li className='card'>
      <img src={image} alt={title} />
      <div>
        <strong>{title}</strong> price: ${price}
      </div>
      <footer>
        <button onClick={() => decrement(product)}> - </button>
        <small>quantity: {quantity}</small>
        <button onClick={() => increment(product)}> + </button>
        <button onClick={() => removeFromCart(product)}> remove from cart</button>
      </footer>
    </li>
  );
}

const Cart = () => {
  const { cart, clearCart, removeFromCart, getTotalPrice } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular una carga de datos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Puedes ajustar el tiempo de carga simulada

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='carrito'>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <ul className='card-container'>
            {cart.map(product => (
              <CartItem key={product.id} {...product} removeFromCart={removeFromCart} />
            ))}
          </ul>
          <div className='botonesCarrito'>
            <strong>Total Price: ${getTotalPrice()}</strong>
            <br />
          <button onClick={clearCart}> clear </button>
          <br /> <br />
          <Link to="/CheckOut"><button >ir a pagar</button></Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
