import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { primeraLetraAMayusc } from '../utilidades/utilidades';
import ItemList from './ItemList';
import Loading from './Loading';

function Category({greeting}) {
    const { categoryName } = useParams()
    
    const [arrayNftsFiltrados, setArrayNftsFiltrados] = useState()
    
    const [loading, setLoading] = useState(false)

    let categoryNameDisplayable = primeraLetraAMayusc(categoryName)
    
    
    useEffect(() => {
      setLoading(true)
      const arrayProductos = collection(getFirestore(), "items")
      const q = query(arrayProductos, where("category", "==", categoryName))

      getDocs(q)
      .then((res)=>{
        setArrayNftsFiltrados(
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
    }, [categoryName, arrayNftsFiltrados])

    if(loading) {
      return (
        <Loading />
      )
    } else {      
      return (
      <>
        <div className='contenedor-encabezado'>
            <p>{greeting}</p>
           <h1>Martín NFT</h1>
           {/*La función primeraLetraAMatusc es propia de mi proyecto. Se encuentra en la carpeta utilidades.*/}
           <h2 className="categoryName">{categoryNameDisplayable}</h2>
        </div>
        {/* Hago el siguiente if puesto que hasta que se hace el fetch arrayProductos es un array vacío lo que genera un error en el mapeo que sucede dentro de ItemList*/}
        {arrayNftsFiltrados != [] ? <ItemList arrayProductos={arrayNftsFiltrados} /> : <div className="noDisplay"></div>}
        
      </>
      )
    }
  }

export default Category