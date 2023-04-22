import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom'
import Products from './Pages/home/Home'
import Error from './Pages/Error'
import Login from './Pages/Login/Login'
import Footer from './Components/Footer/Footer';
import CreateProduct from './Pages/createProduct/CreateProduct';
import User from './Pages/NewUser/NewUser';
import Detail from './Pages/detail/detail';
import CrudProducts from './Pages/crud_products/CrudProducts';
import EditProduct from './Pages/editProduct/editProduct';
import Carousel from './Components/Carousel/carousel';
import Carrito from './Pages/carrito/carrito';
import Crypto from './Components/Cryptos/Cryptos'
//import Crypto from './Components/Cryptos/Cryptos'
import EditCategoryTypeIngredient from './Pages/editCategoryTypeIngredient/editCategoryTypeIngredient';

function App() {

  return (
    <div className="App">


      {/* Routing  */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route exact path="/Home" > <NavBar /> <Carousel /> <Footer /></Route>
        <Route exact path="/products" > <NavBar /> <Products /> <Footer /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/createProduct"><NavBar /><CreateProduct /></Route>
        <Route path="/newUser"> <User /> </Route>
        <Route path='/products/:id'> <NavBar /><Detail /> </Route>
        <Route path="/crudProducts"> <NavBar /><CrudProducts /></Route>
        <Route path="/editProduct"> <NavBar /><EditProduct /></Route>
       <Route path="/editcategoryTypeIngredient"> <NavBar/><EditCategoryTypeIngredient/></Route>
        <Route path="/carrito"> <NavBar /><Carrito/></Route>
        <Route path="/criptos"><Crypto/></Route>
        <Route path="/*"><Error/><NavBar/></Route>
      </Switch>
    </div>
  );
}

export default App;
