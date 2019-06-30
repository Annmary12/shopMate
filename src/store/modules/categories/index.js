// types
import { IS_REQUESTING } from '../types';
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE } from './types';

// helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';

/**
 * @description Get all categories
 *
 * @returns {object} action type and payload
 */
export const getCategories = () => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const categories = await http.get('categories');

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_CATEGORIES_SUCCESS, categories.data.rows));
  } catch (error) {
    let errorMessage;
    if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = error.response.data.error.message;
    }
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(GET_CATEGORIES_FAILURE, errorMessage));
  }
}

const categoriesInitialState = {
  data: [],
  isLoading: false,
  error: ''
}

export const reducer = (state = categoriesInitialState, action) => {
  switch(action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case GET_CATEGORIES_FAILURE:
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
