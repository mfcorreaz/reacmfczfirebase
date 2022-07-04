import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { primeraLetraAMayusc } from '../utilidades/utilidades';
import ItemList from './ItemList';
import './ItemListContainer.css';
import Loading from './Loading';

function ItemListContainer({greeting}) {
  const categoryName = "todos los NFTs"

  const [loading, setLoading] = useState(false)
  const [arrayProductos, setArrayProductos] = useState([])

  let categoryDisplayeable = primeraLetraAMayusc(categoryName)

  
  useEffect(() => {
    const coleccionProductos = collection(getFirestore(), "items")

    setLoading(true)
    getDocs(coleccionProductos)
    .then((res)=> {
      setArrayProductos(res.docs.map((doc)=> ({id: doc.id, ...doc.data()})))
    })
    .finally(setLoading(false))
  }, [])


  if(loading){
    return (
      <Loading />
    )
  } else {
    return (
      <>
        <div className='contenedor-encabezado'>
            
           <h1>The Stroke</h1>
           {/*La función primeraLetraAMatusc es propia de mi proyecto. Se encuentra en la carpeta utilidades.*/}
           <h2 className="categoryName"></h2>
        </div>
        <ItemList arrayProductos={arrayProductos} />
      </>
    )
  }
}

export default ItemListContainer