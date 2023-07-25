import AppClima from "./components/AppClima"
import { ClimaProvider } from "./context/ClimaProvider"

function App() {


  return (
    //Encerramos toda la app con el provider para poder usar todos los componentes.
    <ClimaProvider>
      <header>
        <h1>Buscador de Clima</h1>
      </header>
    <AppClima/>
    </ClimaProvider>
  )
}

export default App
