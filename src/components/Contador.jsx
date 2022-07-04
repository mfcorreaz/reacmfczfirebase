import React from "react";
import { useState } from "react";

const Contador = ({valor})=> {
    const [x, setX] = useState(valor);
    
    return (
        <>
        <p>Valor: {x}</p>
        <button onClick={()=> {setX(x + 1)}}>Sumar</button>
        <button onClick={()=> {setX(x - 1)}}>Restar</button>
        </>
    );    
}

export default Contador