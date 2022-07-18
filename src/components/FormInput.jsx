import React from 'react'


function FormInput({nombreCampo, tipoCampo, placeHolder, valor, setValor, leyendaError, expresionRegular}) {
  const onChange = (e)=> {
    setValor({...valor, valor: e.target.value})
  }
  const validacion = ()=>{
    if(expresionRegular.test(valor.valor)) {
      setValor({...valor, valido: true})
    } else {
      setValor({...valor, valido: false})
    }
  }

  return (
    <div className='input-container'>
        <label htmlFor={nombreCampo}>Ingrese su {nombreCampo}:</label>
        <input 
          className={valor.valido !== null && valor.valido ? "input-valido" : "input-no-valido"}
          name={nombreCampo}
          id={nombreCampo}
          type={tipoCampo}
          placeholder={placeHolder}
          value={valor.valor}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          required
        />
        
        <p className="input-feedback">
          {
            (!valor.valido && valor.valido != null) &&              
                (leyendaError)              
          }
        </p>
        
    </div>
  )
}

export default FormInput