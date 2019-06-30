import { combineReducers } from 'redux';

// reducers
import products from './modules/products';
import cart from './modules/cart';
import auth from './modules/auth';
import customer from './modules/customer';
import regions from './modules/shippingOptions';
import orders from './modules/order';
import categories from './modules/categories';

const appReducer = combineReducers({
  categories,
  products,
  cart,
  auth,
  customer,
  regions,
  orders
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;