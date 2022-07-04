import React from 'react'
import Item from './Item'
import './ItemList.css'

function ItemList({arrayProductos}) {
  return (
    <div className='lista-nfts'>
        {arrayProductos?.map(nft => <Item key={nft.id} nft={nft}/>)}
    </div>
  )
}

export default ItemList