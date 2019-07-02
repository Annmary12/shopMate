// types
import { IS_REQUESTING } from '../types';
import {
  CART_FAILURE,
  GET_CART_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  GET_TOTAL_CART_AMOUNT,
  MOVE_TO_CART_SUCCESS,
  SAVE_ITEMS_SUCCESS,
  SAVE_FOR_LATER_SUCCESS,
  EMPTY_CART_SUCCESS } from './types';

// helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';

/**
 * @description get all items in cart
 *
 * @returns {object} action type and payload
 */
export const getItemsInCart = () => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      const cartItems = await http.get(`/shoppingcart/${cartId}`);
      dispatch(actionResponseSuccess(GET_CART_SUCCESS, cartItems.data));
    }

    dispatch(isRequesting(IS_REQUESTING, false));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

/**
 * @description removes item from cart
 *
 * @param {string} itemId
 *
 * @returns {object} action type and payload
 */
export const removeItem = (itemId) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));
    await http.delete(`/shoppingcart/removeProduct/${itemId}`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(REMOVE_ITEM_SUCCESS, itemId));

  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

/**
 * @description Updates item in cart
 *
 * @param {string} itemId
 *
 * @returns {object} action type and payload
 */
export const updateItem = (itemId, quantity) =>  async(dispatch, getState, http) => {
  try {
    const { data } = await http.put(`/shoppingcart/update/${itemId}`, {quantity});
    const getUpdateItem = data.find(item => item.item_id === itemId);

    dispatch(actionResponseSuccess(UPDATE_ITEM_SUCCESS, getUpdateItem))

  } catch (error) {
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

/**
 * @description Get total amount
 *
 * @returns {object} action type and payload
 */
export const getTotalAmount = () => async(dispatch, getState, http) => {
  try {
    const cartId = localStorage.getItem('cartId');
    const totalAmount = await http.get(`/shoppingcart/totalAmount/${cartId}`);

    dispatch(actionResponseSuccess(GET_TOTAL_CART_AMOUNT, totalAmount.data.total_amount))
  } catch (error) {
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

/**
 * @description  Move to Cart
 *
 * @param {string} - item id
 *
 * @returns {object} action type and payload
 */
export const moveToCart = (itemId) => async(dispatch, getState, http) => {
  try {
    await http.get(`/shoppingcart/moveToCart/${itemId}`);

    dispatch(actionResponseSuccess(MOVE_TO_CART_SUCCESS, itemId))
  } catch (error) {
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

/**
 * @description  Save item for later
 *
 * @param {string} - item id
 *
 * @returns {object} action type and payload
 */
export const saveForLater = (itemId) => async(dispatch, getState, http) => {
  try {
    const url = `/shoppingcart/saveForLater/${itemId}`;
    await http.get(url);

    dispatch(actionResponseSuccess(SAVE_FOR_LATER_SUCCESS, itemId))
  } catch (error) {
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

/**
 * @description  Save item for later
 *
 * @returns {object} action type and payload
 */
export const getSavedItem = () => async(dispatch, getState, http) => {
  try {
    const cartId = localStorage.getItem('cartId');
    const item = await http.get(`/shoppingcart/getSaved/${cartId}`);

    dispatch(actionResponseSuccess(SAVE_ITEMS_SUCCESS, item.data))
  } catch (error) {
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

/**
 * @description  Empty items in cart
 *
 * @returns {object} action type and payload
 */
export const emptyCart = () => async(dispatch, getState, http) => {
  try {
    const cartId = localStorage.getItem('cartId');
    await http.delete(`/shoppingcart/empty/${cartId}`);
    localStorage.removeItem('cartId');

    // dispatch(actionResponseSuccess(EMPTY_CART_SUCCESS, []))
  } catch (error) {
    dispatch(actionResponseFailure(CART_FAILURE, error.message));
  }
}

// cart initial state

const cartInitialState = {
  data: [],
  isLoading: false,
  error: '',
  totalAmount: 0,
  savedItems: []
}

export const reducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case GET_CART_SUCCESS:
      return {
        ...state,
        data: [...action.payload]
      }
    case CART_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.item_id !== action.payload)
      }
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        data: state.data.map(item => item.item_id === action.payload.item_id
          ? { ...item, quantity: action.payload.quantity, subtotal: action.payload.subtotal }
          : item )
      }
    case GET_TOTAL_CART_AMOUNT:
      return {
        ...state,
        totalAmount: action.payload
      }
    case SAVE_FOR_LATER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.item_id !== action.payload)
      }
    case MOVE_TO_CART_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.item_id !== action.payload)
      }
    case SAVE_ITEMS_SUCCESS:
      return {
        ...state,
        savedItems: action.payload
      }
    case EMPTY_CART_SUCCESS:
      return {
        ...state,
        data: action.payload
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