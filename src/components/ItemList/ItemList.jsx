import React from 'react';
import Item from '../Item/Item';
import './ItemList.css'

const ItemList = ({ products }) => {
  console.log('Productos en ItemList:', products);

  return (
    <div className='card-container'>
      {
        products.map((product, index) => (
          <Item key={index} product={product} />
        ))
}
    </div>
  );
};

export default ItemList;
