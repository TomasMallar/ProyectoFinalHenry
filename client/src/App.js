import './App.css';
import axios from "axios"
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
import PrivateRouteUser from './Components/PrivateRouteUser/PrivateRouterUser';
import About from './Pages/about/about';
import Metric from './Components/Metrics/Metrics';
import MyShopping from './Components/MyShopping/MyShopping';
import MyProfile from './Components/MyProfile/MyProfile';
import PieChartSalesByPayment from './Components/Charts/PieChartSalesByPayment';
import PieChartOrderByPaid from './Components/Charts/PieChartOrderByPaid';
import BarCharSales from './Components/Charts/BarCharSales';
import LineChartSalesByMonth from './Components/Charts/LineChartSalesByMonth';
import PieChartSalesByPaymentAmount from './Components/Charts/PieChartSalesByPaymentAmount';
import BarCharProductSold from './Components/Charts/BarCharProductSold';

import Landing from './Pages/Landing/Landing';
import Dashboard from './Pages/Dashboard/Dashborad';
import Statistics from './Pages/Statistics/Statistics';
import Users from './Pages/UsersList/List';


import EditProfileName from './Components/EditProfileName/EditProfileName';
import EditProfileSurname from './Components/EditProfileSurname/EditProfileSurname';
import EditProfilePhone from './Components/EditProfilePhone/EditProfilePhone';
import EditProfileMail from './Components/EditProfileMail/EditProfileMail';
import EditProfileDate from './Components/EditProfileDate/EditProfileDate';
import EditProfilePassword from './Components/EditProfilePassword/EditProfilePassword';
import EditProfileImage from './Components/EditProfileImage/EditProfileImage'
import Orders from './Pages/Orders/OrdersList';
import Sales from './Pages/Sales/Sales'
axios.defaults.baseURL = 'https://backpf-production-18e8.up.railway.app/'
function App() {

  return (
    <div className="App">


      {/* Routing  */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/Home" > <NavBar /> <Landing /> <Footer /></Route>
        <Route exact path="/products" > <NavBar /> <Products /> <Footer /></Route>
        <PublicRoute exact path="/login" component={() => (<><Login /><Footer /></>)} />
        <PrivateRoute exact path="/createProduct" component={() => <> <NavBar /><CreateProduct /><Footer /></>} />
        <PrivateRoute exact path="/metric" component={() => <> <NavBar /><Metric /><Footer /></>} />

        <PublicRoute exact path="/newUser" component={() => (<><User /><Footer /></>)} />
        <Route path='/products/:id'> <NavBar /><Detail /> <Footer /></Route>
        <PrivateRoute exact path="/crudProducts" component={() => <> <CrudProducts /><Footer /></>} />
        <PrivateRoute exact path="/editProduct" component={() => <> <NavBar /><EditProduct /><Footer /></>} />
        <PrivateRoute exact path="/editcategoryTypeIngredient" component={() => <> <NavBar /><EditCategoryTypeIngredient /><Footer /></>} />
        <Route path="/carrito"> <NavBar /><Carrito /><Footer /></Route>
        <Route path="/criptos"><Crypto /><Footer /></Route>
        <PaymentApprovedRoute path="/purchase/approved"><NavBar /><SuccessPurchase /><Footer /></PaymentApprovedRoute>
        <PaymentPendingRoute path="/purchase/pending"><NavBar /><PendingPurchase /><Footer /></PaymentPendingRoute>
        <PaymentRejectedRoute path="/purchase/rejected"> <NavBar /> <RejectedPurchase />  <Footer /></PaymentRejectedRoute>
        <Route path="/purchase/payment-selector"><NavBar /><PaymentSelector /><Footer /></Route>
        <Route path="/purchase/crypto"><NavBar /><PaymentCrypto /> <Footer /> </Route>
        <Route path="/about"><NavBar /><About /> <Footer /></Route>
        <PrivateRouteUser exact path="/myshopping" component={() => <><NavBar /><MyShopping /><Footer /></>} />
        <PrivateRouteUser exact path="/myprofile" component={() => <><NavBar /><MyProfile /><Footer /></>} />
        <PrivateRoute exact path="/dashboard" component={() => <> <Dashboard /> <Footer /></>} />
        <PrivateRoute exact path="/statistics" component={() => <> <Statistics/> <Footer /></>} />
        <PrivateRoute exact path="/users" component={() => <> <Users/> <Footer /></>} />
        <PrivateRoute exact path="/orders" component={() => <> <Orders/> <Footer /></>} />
        <PrivateRoute exact path="/sales" component={() => <> <Sales/> <Footer /></>} />

      
        <PrivateRouteUser exact path="/editname" component={() => <><NavBar /><EditProfileName /><Footer /></>}/>
        <PrivateRouteUser exact path="/editsurname" component={() => <><NavBar /><EditProfileSurname /><Footer /></>}/>
        <PrivateRouteUser exact path="/editmail" component={() => <><NavBar /><EditProfileMail /><Footer /></>}/>
        <PrivateRouteUser exact path="/editphone" component={() => <><NavBar /><EditProfilePhone /><Footer /></>}/>
        <PrivateRouteUser exact path="/editdate" component={() => <><NavBar /><EditProfileDate /><Footer /></>}/>
        <PrivateRouteUser exact path="/editpassword" component={() => <><NavBar /><EditProfilePassword /><Footer /></>}/>
        <PrivateRouteUser exact path="/editimage" component={()=> <><NavBar/><EditProfileImage/><Footer/></>}/>

        <PrivateRouteUser exact path="/editname" component={() => <><NavBar /><EditProfileName /><Footer /></>} />
        <PrivateRouteUser exact path="/editsurname" component={() => <><NavBar /><EditProfileSurname /><Footer /></>} />
        <PrivateRouteUser exact path="/editmail" component={() => <><NavBar /><EditProfileMail /><Footer /></>} />
        <PrivateRouteUser exact path="/editphone" component={() => <><NavBar /><EditProfilePhone /><Footer /></>} />
        <PrivateRouteUser exact path="/editdate" component={() => <><NavBar /><EditProfileDate /><Footer /></>} />
        <PrivateRouteUser exact path="/editpassword" component={() => <><NavBar /><EditProfilePassword /><Footer /></>} />

        <Route path="/*"><Error /><NavBar /></Route>
      </Switch>
    </div>
  );
}

export default App;
