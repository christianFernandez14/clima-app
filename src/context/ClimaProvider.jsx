import { useState, createContext } from "react";

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {

  // Para saber si estoy viendo la API_KEY
  // console.log(import.meta.env.VITE_API_KEY)

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const datosBusquedas = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]:e.target.value
    })
  } 

  const consultarClima = datos =>{
    console.log(datos)
  }

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusquedas,
        consultarClima
      }}
    >
      {children}
    </ClimaContext.Provider>
  )

}

export{
  ClimaProvider
}

export default ClimaContext