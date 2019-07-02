// Types
import { IS_REQUESTING } from '../types';
import { GET_DEPARTMENT_FAILURE, GET_DEPARTMENT_SUCCESS } from './types';

// Helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';

/**
 * @description Get all departments
 *
 * @returns {object} action type and payload
 */
export const getDepartment = () => async(dispatch, getState, http) => {
  try {
    dispatch(isRequesting(IS_REQUESTING, true));

    const department = await http.get('departments')

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(GET_DEPARTMENT_SUCCESS, department.data));
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(GET_DEPARTMENT_FAILURE, error.response.data.error.message));
  }
}

const departmentInitialState = {
  data: [],
  isLoading: false,
  error: ''
}

export const reducer = (state = departmentInitialState, action) => {
  switch(action.type) {
    case GET_DEPARTMENT_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case GET_DEPARTMENT_FAILURE:
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