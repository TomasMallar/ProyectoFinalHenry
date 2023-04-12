import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { Switch, Route } from 'react-router-dom'
import HomePage from './Pages/Home'
import Error from './Pages/Error'
import Login from './Pages/Login'
import CreateProduct from './Pages/CreateProduct';
function App() {


  return (
    <div className="App">

      <NavBar />

      {/* Routing  */}
      <Switch>
        <Route path="/home" > <HomePage/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/createProduct"><CreateProduct/></Route>
        <Route path="/*"><Error/></Route>
      </Switch>
    </div>
  );
}

export default App;
