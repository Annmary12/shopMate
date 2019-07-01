// types
import { IS_REQUESTING } from '../types';
import { ORDER_SUCCESS, ORDER_FAILURE, CUSTOMER_ORDERS } from './types';

// helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';

import { emptyCart } from 'store/modules/cart';

/**
 * @description creates order
 *
 * @param {object} - order details
 * @param {string} - stripe token
 * @param {string} - order amount
 * @param {function} - update current checkout step
 *
 * @returns {object} action type and payload
 */
export const createOrder = (orderDetails, stripeToken, amount, updateCurrentStep) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    // const order = await http.post('/orders', orderDetails);

    const paymentDetails = {
      stripeToken,
      order_id: 1,
      description: 'quality shirt',
      amount: parseInt(amount),
      currency: 'USD'
    }
    const payment = await http.post('stripe/charge', paymentDetails);
    await dispatch(emptyCart());

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(ORDER_SUCCESS, 'Successfully Created An Order'));
    updateCurrentStep(4);
  } catch (error) {
    
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(ORDER_FAILURE, error.response.data.error.message));
  }
}

/**
 * @description Get customer's orders
 *
 * @returns {object} action type and payload
 */
export const customerOrders = () => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));
    const orders = await http.get(`/orders/inCustomer`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(CUSTOMER_ORDERS, orders.data));

  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(ORDER_FAILURE, error.response.data.error.message));
  }
}

// order initial state
const orderInitialState = {
  message: '',
  data: [],
  isLoading: false,
  error: ''
}

export const reducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case ORDER_SUCCESS:
      return {
        ...state,
        message: action.payload
      }
    case CUSTOMER_ORDERS:
      return {
        ...state,
        data: action.payload
      }
    case ORDER_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case IS_REQUESTING:
      return {
        ...state,
        isLoading: action.bool
      }
    default:
      return state
  }
}

export default reducer;