import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import './ItemDetailContainer.css';
import Loading from './Loading';

    
function ItemDetailContainer() {
    const [item, setItem] = useState({})
    const { idProducto } = useParams()

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        let producto = doc(getFirestore(), "items", idProducto)
        getDoc(producto)        
        .then(doc => {
            setItem({id: doc.id, ...doc.data()})
        })
        .finally(setLoading(false))
      }, [])
      

    if(loading) {
      return (
          <Loading />
      )
    } else {
        return (
          <div className='item-detail-container'>
              <ItemDetail item={item}/>
          </div>
        )
    }
}

export default ItemDetailContainer