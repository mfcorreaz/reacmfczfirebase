import React from 'react'

function ClaseEventos() {

    function handleClick(id, evt) {
        alert("handleClick " + id.toString() + "" + evt.toString())
    }

    function handleInputSinVocales(evt) {
        let vocales = ["a", "e", "i", "o", "u"]
        console.log(evt.key)
        
        for (let index = 0; index < vocales.length; index++) {
            if (vocales[index] == evt.key.toLowerCase()) {
                evt.preventDefault()
            }
        }
        
    }
  return (
    <div>
        <div>
            <input type="text" name="sin vocales" id="sinVocales" onKeyDown={(evt)=>handleInputSinVocales(evt)}/>
            <button onClick={(evt)=>handleClick(1, evt)}>Clickeo1</button>
            <button onClick={(evt)=>handleClick(2, evt)}>Clickeo2</button>
        </div>
    </div>
  )
}

export default ClaseEventos