// types
import { IS_REQUESTING } from '../types';
import { SHIPPING_OPTION_SUCCESS, SHIPPING_OPTION_FAILURE, GET_ONE_SHIPPING_SUCCESS } from './types';

// helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';

/**
 * @description gets all shipping regions
 *
 * @returns {object} action type and payload
 */
export const getShippingRegions = () => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));
    const regions = await http.get('shipping/regions');

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(SHIPPING_OPTION_SUCCESS, regions.data));
  } catch (error) {
    let errorMessage;
    if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = error.response.data.error.message;
    }
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(SHIPPING_OPTION_FAILURE, errorMessage));
  }
}

/**
 * @description get one shipping option
 *
 * @param {string} = shipping ID
 *
 * @returns {object} action type and payload
 */
export const getShippingRegion= (shippindId) => async(dispatch, getState, http) => {
  try {

    dispatch(isRequesting(IS_REQUESTING, true));
    const regions = await http.get(`shipping/regions/${shippindId}`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_ONE_SHIPPING_SUCCESS, regions.data));
  } catch (error) {
    let errorMessage;
    if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = error.response.data.error.message;
    }
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(SHIPPING_OPTION_FAILURE, errorMessage));
  }
}

// regions initial state
const shippingRegionsInitialState = {
  data: [],
  shippingOption: {},
  isLoading: false,
  error: ''
}

export const reducer = (state = shippingRegionsInitialState, action) => {
  switch (action.type) {
    case SHIPPING_OPTION_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case GET_ONE_SHIPPING_SUCCESS:
      return {
        ...state,
        shippingOption: action.payload
      }
    case SHIPPING_OPTION_FAILURE:
      return {
        ...state,
        error: action.error
      }
  default:
    return state
  }
}

export default reducer;