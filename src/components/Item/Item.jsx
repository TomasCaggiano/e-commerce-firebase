import React from 'react'
import { Link } from 'react-router-dom';
import './Item.css'

const Item = ({ product }) => {
  if (!product.image) {
    console.error('La propiedad image no está definida en product:', product);
    return <div>Error: Imagen no disponible</div>;
  }
  return (
      <Link className='card' to={`/product/${product.title}`}>
    <div >
      <img src= {product.image} alt={product.title}/>
      <br />
      <h3>{product.title}</h3>
      <br />
      <p>{product.description}</p>
      <br />
      <div>
      <p>${product.price}</p>
      <p>disponible: {product.stock}</p></div>
    </div>
      </Link>
  )
}

export default Item
