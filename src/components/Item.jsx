import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import { useState } from 'react';
import Loading from './Loading';

function Item({stroke}) {
  const {id} = stroke

  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
        let producto = doc(getFirestore(), "items", id)
        getDoc(producto)        
        .then(doc => {
          setItem({id: doc.id, ...doc.data()})
        })
        .finally(setLoading(false))
      }, [])      
      
    if(loading) {
      return (<Loading />
      )
    } else {
    return (
      <>
      <Link to={`/producto/${id}`}>
        <div className="card ">
          <img src={(item.imgURL)} className="card-img-top" alt={(item.nombre)}/>
          <div className="card-body">
            <h5 className="card-title">{(item.nombre)}</h5>
            <h5 className="card-title">{(item.category)}</h5>
            <p className='card-text'>En stock: {item.stock}/{item.existentes}</p>
            <p className='card-text'>Precio $: {item.precio}</p>
            <p className="btn btn-primary">Detalles</p>
          </div>
        </div>
      </Link>
      </>
    )
  }
}

export default Item