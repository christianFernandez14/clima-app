import { useState, createContext } from "react";

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {

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

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusquedas
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