// types
import { IS_REQUESTING } from '../types';
import { GET_CUSTOMER_SUCCESS, CUSTOMER_FAILURE, UPDATE_CUSTOMER_SUCCESS } from './types';

// helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';

/**
 * @description get a customet
 *
 * @returns {object} action type and payload
 */
export const getCustomer = () => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));
    const customer = await http.get('customer');

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_CUSTOMER_SUCCESS, customer.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(CUSTOMER_FAILURE, error.response.data.error.message));
  }
}

/**
 * @description Updates customers address
 *
 * @returns {object} action type and payload
 */
export const updateCustomer = (customerDetails, step, updateCurrentStep) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const customer = await http.put('customers/address', customerDetails);
    const updateStep = step + 1;

    updateCurrentStep(updateStep)
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(UPDATE_CUSTOMER_SUCCESS, customer.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(CUSTOMER_FAILURE, error.response.data.error.message));
  }
}

/**
 * @description Updates customers basic infor
 *
 * @returns {object} action type and payload
 */
export const updateCustomerDetails = (customerDetails) => async(dispatch, getState, http) => {
  try {
    console.log({customerDetails})
    dispatch(isRequesting(IS_REQUESTING, true));

    const customer = await http.put('customer', customerDetails);
    console.log({customer}, 'sucess===')
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(UPDATE_CUSTOMER_SUCCESS, customer.data));
  } catch (error) {
    console.log(error.message, 'error===')
    dispatch(isRequesting(IS_REQUESTING, false));
    // dispatch(actionResponseFailure(CUSTOMER_FAILURE, error.response.data.error.message));
  }
}

// customer initial state

const customerInitialState = {
  data: {},
  isLoading: false,
  error: ''
}

export const reducer = (state = customerInitialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case CUSTOMER_FAILURE:
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
