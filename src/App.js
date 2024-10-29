import logo from './logo.svg';
import './App.css';
import DatosPersonales from './components/DatosPersonales';
import InformacionContacto from './components/InformacionContacto';
import Localizacion from './components/Localizacion';
import Preferencias from './components/Preferencias';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div class="main-container">
      <h1 className="titulo">Formulario de registro</h1>
      <Header></Header>
    <DatosPersonales></DatosPersonales>
    <InformacionContacto></InformacionContacto>
    <Localizacion></Localizacion>
    <Preferencias></Preferencias>
    </div>
  );
}

export default App;
