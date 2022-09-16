import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import AllOrder from "../../frontend/src/component/Admin/AllOrder";
import AllProducts from "../../frontend/src/component/Admin/AllProducts";
import AllReviews from "../../frontend/src/component/Admin/AllReviews";
import AllUsers from "../../frontend/src/component/Admin/AllUsers";
import EditProduct from "../../frontend/src/component/Admin/EditProduct";
import UpdateOrder from "../../frontend/src/component/Admin/UpdateOrder";
import UpdateUser from "../../frontend/src/component/Admin/UpdateUser";
import ForgotPassword from "../../frontend/src/component/user/ForgotPassword";
import ResetPassword from "../../frontend/src/component/user/ResetPassword";
import Notfound from "../../frontend/src/more/Notfound";
import { loadUser } from './actions/userAction';
import './App.css';
import About from './component/about/About';
import CreateProduct from './component/Admin/CreateProduct';
import Dashboard from './component/Admin/Dashboard';
import LoginSignup from "./component/Authentication/LoginSignup";
import Cart from './component/cart/Cart';
import ConfirmOrder from './component/cart/ConfirmOrder';
import Favourites from './component/cart/Favourites';
import Payment from './component/cart/Payment';
import Shipping from './component/cart/Shipping';
import Success from './component/cart/Success';
import Home from "./component/Home/Home";
import ProductDetails from './component/Products/ProductDetails';
import Products from "./component/Products/Products";
import Search from "./component/Products/Search";
import EditProfile from './component/user/EditProfile';
import MoreOption from "./component/user/MoreOption";
import MyOrder from "./component/user/MyOrder";
import MyOrderDetails from "./component/user/MyOrderDetails";
import Profile from "./component/user/Profile";
import UpdatePassword from './component/user/UpdatePassword';
import CommingSoon from "./more/CommingSoon";
import Contact from "./more/Contact";
import Rules from "./more/Rules";
import Support from "./more/Support";
import UserData from './more/UserData';
import ProtectedRoute from './route/ProtectedRoute';
import Store from "./store";

function App() {

  const {isAuthenticated,user} = useSelector((state) =>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    Store.dispatch(loadUser());
    
    getStripeApiKey();

  }, []);
  return (
     
     <Router>
      {isAuthenticated && <UserData user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
       <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/product/:id" component={ProductDetails} />
         <Route exact path="/login" component={LoginSignup} />
         <Route exact path="/about" component={About} />
         <Route exact path="/products" component={Products} />
         <Route exact path="/search" component={Search} />
         <Route exact path="/products/:keyword" component={Products} />
         <Route exact path="/support" component={Support} />
         <Route exact path="/cart" component={Cart} />
         <Route exact path="/favourites" component={Favourites} />
         <Route exact path="/creator" component={CommingSoon} />
         <Route exact path="/faq" component={Rules} />
         <Route exact path="/contact" component={Contact} />
         <Route exact path="/more" component={MoreOption} />
         <Route exact path="/password/forgot" component={ForgotPassword} />
         <Route exact path="/password/reset/:token" component={ResetPassword} />
         <ProtectedRoute exact path="/shipping" component={Shipping} />
         <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
         <ProtectedRoute exact path="/me" component={Profile} />
         <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
         <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
         <ProtectedRoute exact path="/success" component={Success} />
         <ProtectedRoute exact path="/orders" component={MyOrder} />
         <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
         <ProtectedRoute isAdmin={true} exact path="/dashboard" component={Dashboard} />
         <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />
         <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AllProducts} />
         <ProtectedRoute isAdmin={true} exact path="/edit/product/:id" component={EditProduct} />
         <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={AllOrder} />
         <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={UpdateOrder} />
         <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AllUsers} />
         <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
         <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={AllReviews} />

         <Route component={
           window.location.pathname === "/process/payment" ? null : Notfound
           } />
       </Switch>
     </Router>

  );
}

export default App;
