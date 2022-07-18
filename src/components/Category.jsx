import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import Loading from './Loading';

function Category({greeting}) {
    const { categoryName } = useParams()
    
    const [arrayStrkFiltrados, setArrayStrkFiltrados] = useState()
    
    const [loading, setLoading] = useState(false)

    let categoryNameDisplayable = (categoryName)
    
    
    useEffect(() => {
      setLoading(true)
      const arrayProductos = collection(getFirestore(), "items")
      const q = query(arrayProductos, where("category", "==", categoryName))

      getDocs(q)
      .then((res)=>{
        setArrayStrkFiltrados(
          [...new Set(res.docs.map((producto) => (
            //Por cada producto creo un objeto dentro del array que contenga las propiedades de los productos agregando el id que viene por separado
              {
                id: producto.id,
                ...producto.data()
              }
            ))
          )]
        )
      })
      .finally(setLoading(false))
    }, [categoryName, arrayStrkFiltrados])

    if(loading) {
      return (
        <Loading />
      )
    } else {      
      return (
      <>
        <div className='contenedor-encabezado'>
            <p>{greeting}</p>
           <h1>The Stroke</h1>
         
           <h2 className="categoryName">{categoryNameDisplayable}</h2>
        </div>
        {/* Hago el siguiente if puesto que hasta que se hace el fetch arrayProductos es un array vacío lo que genera un error en el mapeo que sucede dentro de ItemList*/}
        {arrayStrkFiltrados != [] ? <ItemList arrayProductos={arrayStrkFiltrados} /> : <div className="noDisplay"></div>}
        
      </>
      )
    }
  }

export default Category