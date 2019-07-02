// types
import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAILURE, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAILURE } from './types';
import { IS_REQUESTING } from '../types';

// helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';

/**
 * @description get all products
 *
 * @param {number} limit
 *
 * @returns {object} action type and payload
 */
export const getProducts = (limit = 12, page = 1) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const products = await http.get(`/products?limit=${limit}&page=${page}`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_PRODUCTS_SUCCESS, products.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(GET_PRODUCTS_FAILURE, error.message));
  }
}

/**
 * @description Get product by search
 *
 * @param {string} query
 *
 * @returns {object} action type and payload
 */
export const searchProduct = (query) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const products = await http.get(`/products/search?query_string=${query}&limit=12`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_PRODUCTS_SUCCESS, products.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(GET_PRODUCTS_FAILURE, error.message));
  }
}

/**
 * @description get all products
 *
 * @param {number} limit
 * @param {number} categoryId
 *
 * @returns {object} action type and payload
 */
export const getProductsByCategory = (limit = 12, categoryId, page = 1) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const products = await http.get(`products/inCategory/${categoryId}?limit=${limit}&page=${page}`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_PRODUCTS_SUCCESS, products.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(GET_PRODUCTS_FAILURE, error.message));
  }
}

/**
 * @description get all products
 *
 * @param {number} limit
 * @param {number} categoryId
 *
 * @returns {object} action type and payload
 */
export const getProductsByDepartment = (limit = 12, departmentId, page = 1) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const products = await http.get(`products/inCategory/${departmentId}?limit=${limit}&page=${page}`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_PRODUCTS_SUCCESS, products.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(GET_PRODUCTS_FAILURE, error.message));
  }
}


/**
 * @description - gets a product
 *
 * @param {string} productId
 *
 * @returns {object} action type and payload
 */
export const getProduct = (productId) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const product = await http.get(`/products/${productId}`);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_SINGLE_PRODUCT_SUCCESS, product.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(GET_SINGLE_PRODUCT_FAILURE, error.message));
  }
}

/**
 * @description - generates cart unique Id
 *
 * @retuns {string} = cart_id
 */
export const generateUniqueId = () => async(dispatch, getState, http) => {
  try {
    if (!localStorage.cartId) {
      const {data: { cart_id }} = await http.get('/shoppingcart/generateUniqueId');

      localStorage.setItem('cartId', cart_id);
      return cart_id;
    }
      return localStorage.getItem('cartId');

  } catch(error) {
    dispatch(isRequesting(IS_REQUESTING, false));
  }
}

/**
 * @description - add a product to cart
 *
 * @param {object} product
 *
 * @returns {object} action type and payload
 */
export const addToCart = (product) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));
    const cart_id = await dispatch(generateUniqueId());
    const { product_id } = product;
    const attributes = `${product.selectedColor}, ${product.selectedSize}`;

    await http.post('/shoppingcart/add', { cart_id, product_id, attributes});
    dispatch(isRequesting(IS_REQUESTING, false));

  } catch(error) {
    dispatch(isRequesting(IS_REQUESTING, false));
  }
}

/**
 * @description - gets a product review
 *
 * @param {string} productId
 *
 * @returns {object} action type and payload
 */
export const getProductReview = (productId) => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const reviews = await http.get(`/products/${productId}/reviews`)

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(PRODUCT_REVIEW_SUCCESS, reviews.data));
  } catch(error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(PRODUCT_REVIEW_FAILURE, error.message));
  }
}

/**
 * @description - Add review
 *
 * @param {object} reviewDetails
 *
 * @returns {object} action type and payload
 */
export const addReview = (reviewDetails) => async (dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    await http.post(`/products/${reviewDetails.product_id}/reviews`, reviewDetails);

    dispatch(isRequesting(IS_REQUESTING, false));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(PRODUCT_REVIEW_FAILURE, error.response.data.error));
  }
}


// product initial state

const productInitialState = {
  data: [],
  singleProduct: {
    product: {},
    reviews: []
  },
  totalProduct: 0,
  isLoading: false,
  error: ''
}

// reducer
/**
 * This reducer changes the product state of the application
 *
 * @param {object} [state=productInitialState]
 * @param action = productActions
 *
 * @returns {object} state
 */
export const reducer = (state = productInitialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: [...action.payload.rows],
        totalProduct: action.payload.count
      }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProduct: { ...state.singleProduct, product: action.payload },
      }
    case PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        singleProduct: { ...state.singleProduct, reviews: action.payload}
      }
    case GET_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case PRODUCT_REVIEW_FAILURE:
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