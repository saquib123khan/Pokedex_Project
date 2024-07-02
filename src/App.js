
import { Link } from 'react-router-dom';
import './App.css';
import CustomRoutes from './Routes/CustomRoutes';


function App() {
  return (
    <div className="App">
      <div className='outer-pokedex'>
      <h1 id='pokedex-heading'>
      <Link to='/'>Pokedex</Link>  
        </h1> 
      <CustomRoutes/>
      </div>
    </div>
  );
}

export default App;
