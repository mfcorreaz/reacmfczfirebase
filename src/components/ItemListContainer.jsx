import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import './ItemListContainer.css';
import Loading from './Loading';

function ItemListContainer({greeting}) {
  const categoryName = "todo The Stroke"

  const [loading, setLoading] = useState(false)
  const [arrayProductos, setArrayProductos] = useState([])

  let categoryDisplayeable = (categoryName)

  
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
           <h2 className="categoryName"></h2>
        </div>
        <ItemList arrayProductos={arrayProductos} />
      </>
    )
  }
}

export default ItemListContainer