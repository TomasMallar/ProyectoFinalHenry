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
import EditCategoryTypeIngredient from './Pages/editCategoryTypeIngredient/editCategoryTypeIngredient';
import SuccessPurchase from './Components/Purchase/SuccessPurchase';
import PendingPurchase from './Components/Purchase/PendingPurchase';
import RejectedPurchase from './Components/Purchase/RejectedPurchase';
import PaymentSelector from './Components/Purchase/PaymentSelector';
import PaymentCrypto from './Components/Purchase/PaymentCrypto';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import PublicRoute from './Components/PublicRoute/PublicRoute';
import PaymentApprovedRoute from './Components/PaymentRoute/PaymentApprovedRoute/PaymentApprovedRoute';
import PaymentRejectedRoute from './Components/PaymentRoute/PaymentRejectedRoute/PaymentRejectedRoute';
import PaymentPendingRoute from './Components/PaymentRoute/PaymentPendingRoute/PaymentPendingRoute';
import MyShopping from './Components/MyShopping/MyShopping';
import PrivateRouteUser from './Components/PrivateRouteUser/PrivateRouterUser';
import About from './Pages/about/about';
import MyProfile from './Components/MyProfile/MyProfile';

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
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/createProduct" component={() => <> <NavBar /><CreateProduct /></>} />
        <PublicRoute exact path="/newUser" component={User} />
        <Route path='/products/:id'> <NavBar /><Detail /> <Footer /></Route>
        <PrivateRoute exact path="/crudProducts" component={() => <> <NavBar /><CrudProducts /></>} />
        <PrivateRoute exact path="/editProduct" component={() => <> <NavBar /><EditProduct /></>} />
        <PrivateRoute exact path="/editcategoryTypeIngredient" component={() => <> <NavBar /><EditCategoryTypeIngredient /></>} />
        <Route path="/carrito"> <NavBar /><Carrito /><Footer /></Route>
        <Route path="/criptos"><Crypto /></Route>
        <PaymentApprovedRoute path="/purchase/approved"><NavBar /><SuccessPurchase /></PaymentApprovedRoute>
        <PaymentPendingRoute path="/purchase/pending"><NavBar /><PendingPurchase /></PaymentPendingRoute>
        <PaymentRejectedRoute path="/purchase/rejected"> <NavBar /> <RejectedPurchase /> </PaymentRejectedRoute>
        <Route path="/purchase/payment-selector"><NavBar/><PaymentSelector/></Route>
        <Route path="/purchase/crypto"><NavBar/><PaymentCrypto/></Route>
        <PrivateRouteUser exact path="/myshopping" component={() => <><NavBar /><MyShopping /><Footer /></>}/>
        <PrivateRouteUser exact path="/myprofile" component={() => <><NavBar /><MyProfile/><Footer /></>}/>
        <Route path="/*"><Error/><NavBar/></Route>
      </Switch>
    </div>
  );
}

export default App;
