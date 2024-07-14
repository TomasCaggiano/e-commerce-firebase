import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const ItemListContainer = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para el loading

    useEffect(() => {
        const db = getFirestore();  

        const fetchProducts = async () => {
            let productRef;

            if (categoryId) {
                productRef = query(collection(db, 'Productos'), where('category', '==', categoryId));
            } else {
                productRef = collection(db, 'Productos');
            }

            const productSnapshot = await getDocs(productRef);            
            const products = productSnapshot.docs.map((doc) => doc.data());
            setProducts(products);
            setLoading(false); // Detener la carga una vez que los datos se hayan obtenido
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <div className='container'>
            {loading ? (
                <LoadingScreen />
            ) : (
                <ItemList key={categoryId} products={products} />
            )}
        </div>
    );
};

export default ItemListContainer;


    /*      IMPORTAR UN SOLO ELEMENTO
    useEffect(()=>{
        const db = getFirestore();
        
        const productRef = doc(db, "Productos", "9tLHmZEF7m0aXAwpfWBA"); //lo que voy a buscar

        getDoc(productRef).then(documento => {
            if(documento.exists()){                     
                console.log(documento.data())
            }
        })*/

//------------------------------------------------------------------

        //  IMPORTAR UNA COLECCION
        /*useEffect(()=>{
            const db = getFirestore();
        const productRef = collection(db, "Productos"); //lo que voy a buscar

        getDocs(productRef).then((collection) =>{               //dividir la coleccion  
            const products = collection.docs.map((doc) => {     // en cada producto
                return doc.data()
            })
            console.log(products)
            setProducts(products); 
        })
    },[])*/
