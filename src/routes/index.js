// react libraries
import * as React from 'react';

// third party packages
import { Route, Switch } from 'react-router-dom';

// components
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import SingleProduct from '../pages/SingleProduct';
import CheckoutPage from '../pages/Checkout';
import Account from 'pages/Account';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/product-page" component={ProductPage} />
    <Route path="/products/:productId" component={SingleProduct} />
    <Route path="/checkout" component={CheckoutPage} />
    <Route path="/account" component={Account} />
  </Switch>
)

export default Routes;