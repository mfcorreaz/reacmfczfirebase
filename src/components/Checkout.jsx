import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import './Checkout.css'
import FormInput from './FormInput'
import Loading from './Loading'

function Checkout() {
    const {cart, obtenerPrecioTotal, vaciarCarrito} = useContext(CartContext)

    
    
    const [nombreUsuario, setNombreUsuario] = useState({valor:'', valido: null})
    const [apellidoUsuario, setApellidoUsuario] = useState({valor:'', valido: null})
    const [emailUsuario, setEmailUsuario] = useState({valor:'', valido: null})
    const [celularUsuario, setCelularUsuario] = useState({valor:'', valido: null})

    const [formularioValido, setFormularioValido] = useState(null)
    const [idCompra, setIdCompra] = useState('')
    
    const [mostrarForm, setMostrarForm] = useState(true)
    
    const colleccionOrdenes = collection(getFirestore(), "ordenes")

    useEffect(() => {
        validarFormulario()
        }, [
            nombreUsuario,
            apellidoUsuario,
            emailUsuario,
            celularUsuario
        ]
    )
    

    const validarFormulario = ()=> {
        (nombreUsuario.valido && apellidoUsuario.valido && emailUsuario.valido && celularUsuario.valido) ? setFormularioValido(true) : setFormularioValido(false)
    }
    
    const enviar = ()=> {
        if(formularioValido) {
            setNombreUsuario({valor:'', valido: null})
            setApellidoUsuario({valor:'', valido: null})
            setEmailUsuario({valor:'', valido: null})
            setCelularUsuario({valor:'', valido: null})

            const datosDeLaOrden = {
                comprador: {nombre: nombreUsuario.valor, apellido: apellidoUsuario.valor, email: emailUsuario.valor, cel: celularUsuario.valor},
                productos: cart,
                precioTotal: obtenerPrecioTotal(),
                fechaDeCompra: (new Date())
            }
    
            vaciarCarrito()    
            
            addDoc(colleccionOrdenes, datosDeLaOrden)
            .then(({id})=> {
                setIdCompra(id)
            })
            setMostrarForm(false)
        }     
    }

    if(mostrarForm) {
        return (
            <div className='contenedor-principal'>
                <div className='form-container '>
                  <h5>
                    <Link to={"/cart"} className="text-body d-flex justify-content-start flex-row align-items-center aling-content-center">
                        <svg className="bi bi-arrow-left-circle icono-volver" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                        </svg>
                        Volver a mi carrito
                    </Link>
                  </h5>
                  <hr />
                  <h2>Completar el formulario para terminar la compra</h2>
                  <div className='aca'>
                   
                    <form className='' action="">
                        <FormInput
                            nombreCampo={"nombre"}
                            tipoCampo={"text"}
                            placeHolder={"Ingrese su nombre"}
                            valor={nombreUsuario}
                            setValor={setNombreUsuario}
                            leyendaError={"El nombre sólo puede tener letras y espacios, pueden llevar acentos"}
                            expresionRegular={/^[a-zA-ZÀ-ÿ\s]{1,40}$/}
                        />
                        <FormInput
                            nombreCampo={"apellido"}
                            tipoCampo={"text"}
                            placeHolder={"Ingrese su apellido"}
                            valor={apellidoUsuario}
                            setValor={setApellidoUsuario}
                            leyendaError={"El apellido sólo puede tener letras y espacios, pueden llevar acentos"}
                            expresionRegular={/^[a-zA-ZÀ-ÿ\s]{1,40}$/}
                        />
                        <FormInput
                            nombreCampo={"mail"}
                            tipoCampo={"email"}
                            placeHolder={"Ingrese su email"}
                            valor={emailUsuario}
                            setValor={setEmailUsuario}
                            leyendaError={"Formato de mail incorrecto"}
                            expresionRegular={/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
                        />
                        <FormInput
                            nombreCampo={"número de celular"}
                            tipoCampo={"tel"}
                            placeHolder={"Ingrese su nro de celular"}
                            valor={celularUsuario}
                            setValor={setCelularUsuario}
                            leyendaError={"Debe tener entre 8 y 14 carácteres numéricos"}
                            expresionRegular={/^\d{8,14}$/}
                        />

                        <div>
                            <p className="mensaje-error">
                                {
                                    (formularioValido === false) && "Por favor rellena el formulario correctamente"
                                }
                            </p>
                        </div>
                                        
                        <div>
                            <button 
                                className={formularioValido === null ? "btn btn-info" : formularioValido === true ? "btn btn-primary" : "btn btn-danger"}
                                onClick={enviar}
                            >Enviar pedido</button>
                        </div>
                    </form>
                  </div>
                </div>
            </div>
        )
    } else {
        return (            
            <div className="contenedor-principal">
                <div className='form-container sombra-contenedor'>
                    <h5>
                        <Link to={"/"} className="text-body d-flex justify-content-start flex-row align-items-center aling-content-center">
                            <svg className="bi bi-arrow-left-circle icono-volver" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                            </svg>
                            Volver al inicio
                        </Link>
                    </h5>
                    <hr />
                    <h2>Operación exitosa</h2>
                    <div className='id-compra-container'>
                        <p className='id-info'>Nos comunicaremos para confirmar su pedido, en la brevedad. <br/>Gracias por elegirnos.</p>
                        {idCompra.length > 0 ? <p className='id-info'>Código de compra: <span className='id-display'>{idCompra}</span></p> : <Loading />}
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout


/*import { addDoc, collection, getFirestore } from 'firebase/firestore'
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

export default Checkout*/