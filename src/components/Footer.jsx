import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import './Footer.css'

function RetribucionesImg() {
  const [arrayProductos, setArrayProductos] = useState([])
    useEffect(() => {
      const coleccionProductos = collection(getFirestore(), "items")
  
      getDocs(coleccionProductos)
      .then((res)=> {
        setArrayProductos(res.docs.map((doc)=> ({id: doc.id, ...doc.data()})))
      })      
    }, [])

    
  if(arrayProductos==[]){
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  } else {
    return (
      <>
        <div className="text-center bg-dark p-4 text-white mt-3" > 
          © 2022 Copyright:
          <a className="copy  pl-1 " href="/">TheStrookeNoOficial</a>
        </div>
      </>
    )
  }
}

export default RetribucionesImg