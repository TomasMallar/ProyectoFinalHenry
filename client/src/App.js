import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './Pages/Home'
import Error from './Pages/Error'
import Login from './Pages/login/login'
import Footer from './Components/Footer/Footer';
import CreateProduct from './Pages/CreateProduct';
import User from './Pages/NewUser/NewUser';
import Detail from './Pages/detail/detail';

function App() {

  return (
    <div className="App">
    

      {/* Routing  */}
      <Switch>
      <Route exact path="/">
      <Redirect to="/home" />
      </Route>
        <Route path="/home" > <NavBar/> <HomePage/> <Footer/></Route>
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
