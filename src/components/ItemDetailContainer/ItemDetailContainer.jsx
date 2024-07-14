import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getFirestore, getDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { CartContext } from '../CartContext/CartContext';
import './ItemDetailContainer.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad
  const { addToCart, increment, decrement, cart } = useContext(CartContext);

  useEffect(() => {
    const db = getFirestore();

    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productRef;

        if (productId) {
          productRef = query(collection(db, 'Productos'), where('title', '==', productId));
        } else {
          productRef = collection(db, 'Productos');
        }

        const productSnapshot = await getDocs(productRef);
        const productData = productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        if (productData.length > 0) {
          setProduct(productData[0]);
        } else {
          setProduct(null);
          console.log('Producto no encontrado en la base de datos');
        }
      } catch (error) {
        console.error('Error fetching product: ', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className='detail'>
      {loading ? (
        <LoadingScreen />
      ) : product ? (
        <div>
          <img src={product.image} alt={product.title} />
          <div className='detalles'>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </div>
          <br />
          <div className='botonesDetalles'>
            <br />
            <div>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                min="1"
                max={product.stock}
              />
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
