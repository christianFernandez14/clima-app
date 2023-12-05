import { useState, createContext } from "react";
import axios from "axios";

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {

  // Para saber si estoy viendo la API_KEY
  // console.log(import.meta.env.VITE_API_KEY)

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [resultado, setResultado] = useState({})

  const [cargando, setCargando] = useState(false)

  const [noResultado, setNoResultado] = useState(false)

  const datosBusquedas = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]:e.target.value
    })
  } 

  const consultarClima = async datos =>{

    setCargando(true)
    setNoResultado(false)
    try {

      const {ciudad, pais} = datos
      const appId = import.meta.env.VITE_API_KEY
      const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`

      const {data } = await axios(URL)
      const { lat, lon} = data[0]

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

      // Asi renombramos data, ya que esa variable ha si utlizada mas arriba
      const {data : clima} = await axios(urlClima)

     
        setResultado(clima)

       
    } catch (error) {
      setNoResultado('No hay resultados')
    } finally{

      setCargando(false)

    }

  }

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusquedas,
        consultarClima,
        resultado,
        cargando,
        noResultado
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