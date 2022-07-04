import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useState } from 'react'
import { CartContext } from '../context/CartContext'

function Checkout() {
    const {cart, obtenerPrecioTotal, vaciarCarrito} = useContext(CartContext)

    const [nombreUsuario, setNombreUsuario] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')
    const [celularUsuario, setCelularUsuario] = useState('')

    const [idCompra, setIdCompra] = useState('')

    const [mostrarForm, setMostrarForm] = useState(true)

    const colleccionOrdenes = collection(getFirestore(), "ordenes")

    function handleClickTerminarComrpa() {
        const datosDeLaOrden = {
            comprador: {nombre: nombreUsuario, email: emailUsuario, cel: celularUsuario},
            productos: cart,
            precioTotal: obtenerPrecioTotal()
        }

        vaciarCarrito()

        setMostrarForm(false)

        addDoc(colleccionOrdenes, datosDeLaOrden)
        .then(({id})=> {
            setIdCompra(id)
        })
    }
    if(mostrarForm){
        return (
          <div className='form-container'>
            <h1>Complete el formulario</h1>            
            <input type="text" placeholder='Ingrese su nombre' onChange={(e)=> setNombreUsuario(e.target.value)}/><br></br>
            <input type="mail" placeholder='Ingrese su email' onChange={(e)=> setEmailUsuario(e.target.value)}/><br></br>
            <input type="text" placeholder='Ingrese su número de celular' onChange={(e)=> setCelularUsuario(e.target.value)}/><br></br>
            <button onClick={handleClickTerminarComrpa}>Terminar compra</button>
          </div>
        )
    } else {
        return (
            <div className="feedback-container">
                <h2>Su compra fue realizada exitosamente</h2>
                <p>Id de su compra: {idCompra}</p>
            </div>
        )
    }
}

export default Checkout