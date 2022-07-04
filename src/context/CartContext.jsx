import { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext()

const { Provider } = CartContext;

const MyProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const isInCart = (id)=> {
        //Método Some es un método de array que devuelve un boolean
        return cart.some(productoEnCarrito => productoEnCarrito.id == id)
    }

    const agregarItem = (item, cantidadEnElCarrito)=> {
        //Le agrego una nueva propiedad al item
        const newItem = {
            ...item,
            cantidadEnElCarrito
        }

        if(isInCart(newItem.id)){
            //Busco el producto en el estado por su id
            const productoAgregadoEnItemArray = cart.find(producto => producto.id == newItem.id)
            //Obtengo el índice del producto en el array
            const indexProducto = cart.indexOf(productoAgregadoEnItemArray)
            //Copio el estado cart para poder modificarlo
            const arrayProductosAux = [...cart]

            //Modifico la cantidad de ESE item
            arrayProductosAux[indexProducto].cantidadEnElCarrito += cantidadEnElCarrito
            
            //Actualizo el estado cart con la cantidad actualizada del producto
            setCart(arrayProductosAux)
        } else {
            //Si no estaba en el carrito agrego el nuevo item al cart reteniendo la info previa
            setCart([...cart, newItem])
        }
    }

    const vaciarCarrito = ()=> {
        return setCart([])
    }

    const borrarItem = (id)=> {
        return setCart(cart.filter(producto => producto.id != id))
    }

    const cantidadProductosEnCarrito = ()=> {
        return cart != [] ? cart.reduce((acc, producto)=> acc += producto.cantidadEnElCarrito, 0) : 0
    }

    const cantidadEsteProductoEnCarrito = (nombreProducto)=> {
        let esteProducto = cart.find(nft => {return nft.nombre === nombreProducto})
        return esteProducto ? esteProducto.cantidadEnElCarrito : 0
    }
    
    const obtenerPrecioTotal = ()=> {
        return cart.reduce((acc, producto)=> acc += producto.cantidadEnElCarrito * producto.precio, 0)
    }

    const obtenerPrecioPorEsteProducto = (nombreProducto)=> {
        let esteProducto = cart.find(nft => {return nft.nombre === nombreProducto})
        return esteProducto.precio * esteProducto.cantidadEnElCarrito
    }


    return <Provider value={{ cart, isInCart, agregarItem, vaciarCarrito, borrarItem, cantidadProductosEnCarrito, cantidadEsteProductoEnCarrito, obtenerPrecioTotal, obtenerPrecioPorEsteProducto }}>{ children }</Provider>
}

export default MyProvider