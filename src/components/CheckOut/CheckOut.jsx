import React, { useState, useContext, useEffect } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { CartContext } from '../CartContext/CartContext';
import './CheckOut.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const CheckOut = () => {
  const { clearCart, cart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para el loading

  const saveOrder = () => {
    setLoading(true); // Mostrar pantalla de carga
    const db = getFirestore();
    const ordersRef = collection(db, 'ordenes');

    const orderData = {
      buyer: {
        name: name,
        phone: phone,
        email: email,
        address: address,
        creditCard: creditCard,
        dni: dni,
      },
      items: cart.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      timestamp: new Date(),
    };

    addDoc(ordersRef, orderData).then((result) => {
      setOrder(result.id);
      setLoading(false); // Ocultar pantalla de carga
    }).catch(error => {
      console.error("Error adding document: ", error);
      setLoading(false); // Ocultar pantalla de carga en caso de error
    });
  };

  useEffect(() => {
    if (order) {
      alert('Pago finalizado exitosamente');
      clearCart(); // Limpiar el carrito después de guardar la orden
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <div className='checkout'>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div>
            <label htmlFor="email">Mail:</label>
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="text" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <br />
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <br />
          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <br />
          <div>
            <label htmlFor="creditCard">Credit Card:</label>
            <input type="text" name='creditCard' value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
          </div>
          <br />
          <div>
            <label htmlFor="dni">DNI:</label>
            <input type="text" name='dni' value={dni} onChange={(e) => setDni(e.target.value)} />
          </div>
          <br />
          <button onClick={saveOrder}>Guardar orden</button>
        </>
      )}
    </div>
  );
}

export default CheckOut;


// ACTUALIZAR ORDEej:
    /*const db = getFirestore();

    const orderRef = doc(db, "ordenes", 'id de la order');

    const previousOrder = getDoc(orderRef).then(result => result.data())

    updateDoc(orderRef, {
    buyer:{...prevoiousOrder.buyer, phone: '1123420902'}.
    })
}*/