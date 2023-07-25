import { useState } from "react"
import useClima from "../hooks/useClima"

const Formulario = () => {

    const [alerta, setAlerta] = useState('')
    const {busqueda, datosBusqueda, consultarClima} = useClima()

    const {ciudad, pais} = busqueda

    const handleSubmit = e => {
        e.preventDefault()

        if(Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son obligatorios')
            return
        }
        setAlerta('')
        consultarClima(busqueda)
    }

  return (
   <div className='contendor'>
    {alerta && <p>{alerta}</p>}
    <form
        onSubmit={handleSubmit}
    
    >
        <div className='campo'>
            <label htmlFor='pais'>Pais</label>
                <select
                    id='pais'
                    name='pais'
                    onChange={datosBusqueda}
                    value={pais}
                >
                    <option value=''>Seleccione un pais</option>
                    <option value='US'>Estados Unidos</option>
                    <option value='MX'>Mexico</option>
                    <option value= 'ARG'>Argentina</option>
                    <option value= 'CO'>Colombia</option>
                    <option value= 'CR'>Costa Rica</option>
                    <option value= 'ES'>España</option>
                    <option value='PE'>Peru</option> 

                </select>
        </div>
        <div className='campo'>
            <label htmlFor='ciudad'>Ciudad</label>
                <input 
                type='text'
                id= 'ciudad'
                name='ciudad'
                onChange={datosBusqueda}
                value={ciudad}
                />
        </div>

        <input
            type='submit'
            value='Consultar Clima'        
        />
    </form>
   </div>
  )
}

export default Formulario