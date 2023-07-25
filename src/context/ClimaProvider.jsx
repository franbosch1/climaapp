import { useState, createContext} from 'react'
import axios from 'axios'

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {

    const [busqueda, setBusqueda ] = useState({
        ciudad: '',
        pais: ''
    })

    const [resultado, setResultado] = useState({})
    const [cargando, setCargando] = useState(false)
    const [noResultado, setNoResultado] = useState(false)

    const datosBusqueda = e => {
        setBusqueda ({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }
//Consulta de clima mediante API
    const consultarClima = async datos => {

        setCargando(true)
        setNoResultado(false)
        try {
            const {ciudad, pais} = datos//Aplicamos destruccion para extraer ciudad y pais para poder inyectarlos en la API

            const appId = import.meta.env.VITE_API_KEY

            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`//Peticion para traer la ciudad y el pais
            
            const {data} = await axios(url)//Esperamos la respuesta mediante axios
            
            const {lat, lon} = data[0]//Aplicamos destruccion en la posicion 0 del arreglo que nos devuelve la API

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`//Peticion para traer la longitud y latitud del pais y ciudad seleccionados

            const {data: clima} = await axios(urlClima)//Esperamos la segunda respuesta mediante axios y renombramos la varialbe data mediante destruccion para que no se pisen los nombres
            setResultado(clima)
            
        } catch (error){ 
            setNoResultado('No hay resultados')
        } finally{
            setCargando(false)
        }
    }
    return(
        //Pasamos todos los componentes por el context para que esten disponibles en todos lados
        <ClimaContext.Provider
            value={{busqueda,
            datosBusqueda,
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

export {
    ClimaProvider	//Exportamos el provider para que este disponible en app.jsx
}
export default ClimaContext