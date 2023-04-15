import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { Switch, Route } from 'react-router-dom'
import HomePage from './Pages/Home/Home'
import Error from './Pages/Error'
import Login from './Pages/Login/Login'
import Footer from './Components/Footer/Footer';
import CreateProduct from './Pages/CreateProduct';
import User from './Pages/NewUser/NewUser';
import Detail from './Pages/detail/detail';

function App() {

  return (
    <div className="App">
    

      {/* Routing  */}
      <Switch>
        <Route path="/home" > <NavBar/> <HomePage/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/createProduct"><CreateProduct/> <NavBar/></Route>
        <Route path="/newUser"> <User/> </Route>
        <Route path='/products/:id'> <Detail/> </Route>
        <Route path="/*"><Error/><NavBar/></Route>

      </Switch>
    </div>
  );
}

export default App;
