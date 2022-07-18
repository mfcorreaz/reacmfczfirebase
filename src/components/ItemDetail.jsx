import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ItemDetail.css';
import ItemCount from './ItemCount';

function ItemDetail({item}) {
    const {id, imgURL, nombre, descripcion, stock, category, precio} = item
    const [mostrarItemCount, setMostrarItemCount] = useState(true)
    const {agregarItem} = useContext(CartContext)

    const onAdd = (cantidad)=> {
      agregarItem(item, cantidad)
      setMostrarItemCount(false)
    }

    
    return (
      <>
        <div className="container ContenedorPadre ">
            <div className="encabezadoDetail">
              <p className="card"> <span className="">Cod Producto: {id}</span></p>
            </div>
        
            <div className='contenedorDetail row ml-1 '>
              <div className=" contenedorImg col-lg-4 col-md-8 col-sm-12">
                <img src={(imgURL)} className = 'imagenDetail' alt={"imágen " + nombre}/>
              </div>
              <div className='contenidoDetail'>
                  <Link to={`/categoria/${category}`}>
                    <h5>Producto: {nombre}</h5>
                  </Link> 
                  <h5 className="card-title">Categoría: {category}</h5>
                 
                  <div className="">
                      <h5>Descripción:</h5>
                      <p  className="card-text mb-3">{descripcion} </p>
                      <h5 className='mb-3'>Stock: {stock} </h5>
                      <h5>Precio: $ {precio} </h5>
                  </div>
                  <div >
                      {mostrarItemCount ? 
                        <ItemCount key={id} inicial={stock > 0 ? 1 : 0} item={item} setMostrarItemCount={setMostrarItemCount} onAdd={onAdd}/>
                        : 
                        <Link to="/miCarrito" className='btn btn-primary mt-2 '>Ir al carrito</Link>
                      }   
                  </div>
              </div>
            </div>
        </div>
      </>
    )
}

export default ItemDetail