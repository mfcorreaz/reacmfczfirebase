import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import {primeraLetraAMayusc} from '../utilidades/utilidades';
import './MiCarrito.css'

export default function MiCarrito({}) {
  const {cart, vaciarCarrito, borrarItem, cantidadProductosEnCarrito, obtenerPrecioTotal, obtenerPrecioPorEsteProducto} = useContext(CartContext)

  return (
    <div className='contenedor-mi-carrito'>
      <section className="h-100 h-custom section-mi-carrito">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                      {cart.length == 0 && "El carrito está vacío"}
                        <Link to={"/"} className="text-body d-flex justify-content-start flex-row align-items-center aling-content-center">
                          <svg className="bi bi-arrow-left-circle icono-volver" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                          </svg>
                          {cart.length > 0 ? "Continuar comprando" : "Ir a comprar"}
                          
                        </Link>
                      </h5>
                      <hr/>
                      {cart.length > 0 && (
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-0">La cantidad de producto/s seleccionados es {cantidadProductosEnCarrito()} producto/s </p>
                          </div>
                        </div>
                      )}

                      {
                        cart.map((producto, index)=> {
                          const { nombre, category, cantidadEnElCarrito, id, imgURL } = producto

                          let nombreDisplayeable = primeraLetraAMayusc(nombre)
                          let categoriaDisplayeable = primeraLetraAMayusc(category)
                            return (
                              <div key={index} className="card mb-3">
                                <div className="card-body ">
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                      <div>
                                        <img
                                          src={imgURL}
                                          className="img-fluid rounded-3 imágen-nft" alt="Shopping item"/>
                                      </div>
                                      <div className="ms-3">
                                        <Link to={`/producto/${id}`}>
                                          <h5>{nombreDisplayeable}</h5>
                                        </Link>
                                        <Link to={`/categoria/${category}`}>
                                          <p className="small mb-0">{categoriaDisplayeable}</p>
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div className='contenedor-cantidad-este-producto'>
                                        <h5 className="fw-normal mb-0">x{cantidadEnElCarrito}</h5>
                                      </div>
                                      <div className='contenedor-precio-este-producto'>
                                        <h5 className="mb-0">${obtenerPrecioPorEsteProducto(nombre)}</h5>
                                      </div>
                                      <button type="button" className="btn btn-secondary" onClick={()=>{ borrarItem(id) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                        })
                      }

                      {cart.length > 0 && (
                        <button type="button" className="btn btn-outline-danger" onClick={()=>{ vaciarCarrito() }}>Vaciar carrito</button>
                      )}
                    </div>
                    {cart.length > 0 && (
                      <div className="col-lg-5">
                        <div className="card bg-secondary text-white rounded-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h5 className="mb-0">Detalle de compra</h5>
                            </div>
                      
                            <hr className="my-4"/>
                      
                            {
                              cart.map((producto, index)=> {
                                const {nombre, cantidadEnElCarrito} = producto
                                let nombreDisplayeable = primeraLetraAMayusc(nombre)
                                return (
                                  <div key={index} className="d-flex justify-content-between mb-4">
                                    <p className="mb-2">Precio {nombreDisplayeable} x{cantidadEnElCarrito}</p>
                                    <p className="mb-2">${obtenerPrecioPorEsteProducto(nombre)}</p>
                                  </div>
                                  )
                              })
                            }
  
                          
                            <hr/>
                          
                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Total</p>
                              <p className="mb-2">${obtenerPrecioTotal()}</p>
                            </div>
                          
                            <Link to={"/checkout"}>
                              <button type="button" className="btn btn-danger btn-block btn-lg">
                                <div className="d-flex justify-content-between">
                                  <span>${obtenerPrecioTotal()}</span>
                                  <span>Finalizar compra</span>
                                </div>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}