import React from 'react'
import Item from './Item'
import './ItemList.css'

function ItemList({arrayProductos}) {
  return (
    <div className='ListaStroke'>
        {arrayProductos?.map(stroke => <Item key={stroke.id} stroke={stroke}/>)}
    </div>
  )
}

export default ItemList