import * as jwtDecode from 'jwt-decode';

// types
import { IS_REQUESTING } from '../types';
import { AUTH_SUCCESS, AUTH_FAILURE, CLEAR_ERROR, LOGOUT } from './types';

// helpers
import { actionResponseFailure, actionResponseSuccess, isRequesting} from '../../../utils/helpers/action';
import { authService } from '../../../utils/auth';
import history from '../../../utils/history';

/**
 * @description register a user
 *
 * @param {object} - users details
 * @param {function} - closeModal
 *
 * @returns {object} action type and payload
 */
export const registerUser = (userDetails, closeModal) => async(dispatch, getState, http) => {
  try {
    dispatch({ type: CLEAR_ERROR });
    dispatch(isRequesting(IS_REQUESTING, true));
    const { data: { accessToken }} = await http.post('/customers', userDetails);
    const decodeUser = jwtDecode(accessToken)

    localStorage.setItem('jwtToken', accessToken);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(AUTH_SUCCESS, decodeUser));

    history.push('/product-page');
    closeModal();
  } catch (error) {

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(AUTH_FAILURE, error.response.data.error.message));
  }
}

/**
 * @description login
 *
 * @param {object} - users details
 * @param {function} - closeModal
 * 
 * @returns {object} action type and payload
 */
export const login = (userDetails, closeModal) => async(dispatch, getState, http) => {
  try {
    dispatch({ type: CLEAR_ERROR });
    dispatch(isRequesting(IS_REQUESTING, true));

    const { data: { accessToken }} = await http.post('/customers/login', userDetails);
    const decodeUser = jwtDecode(accessToken)

    localStorage.setItem('jwtToken', accessToken);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(AUTH_SUCCESS, decodeUser));

    history.push('/product-page');
    closeModal();
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(AUTH_FAILURE, error.response.data.error.message));
  }
}

/**
 * @description login with facebook
 *
 * @param {string} - facebook access token
 * @param {function} - closeModal
 *
 * @returns {object} action type and payload
 */
export const loginWithFacebook = (facebookAccessToken, closeModal) => async(dispatch, getState, http) =>{
  try {
    dispatch({ type: CLEAR_ERROR });
    dispatch(isRequesting(IS_REQUESTING, true));

    const { data: { accessToken }} = await http.post('/customers/facebook', {access_token: facebookAccessToken});
    const decodeUser = jwtDecode(accessToken)

    localStorage.setItem('jwtToken', accessToken);

    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseSuccess(AUTH_SUCCESS, decodeUser));

    history.push('/product-page');
    closeModal();
  } catch (error) {
    dispatch(isRequesting(IS_REQUESTING, false));
    dispatch(actionResponseFailure(AUTH_FAILURE, error.response.data.error.message));
  }
}

/**
 * @description logout user
 *
 * @returns {object} action type and payload
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken')
  dispatch(actionResponseSuccess(LOGOUT, {}));
  history.push('/product-page');
}


// auth initial state
const authInitialState = {
  user: authService.getUser(),
  isAuthenticated: Boolean(authService.getUser()) || false,
  isLoading: false,
  error: ''
}

export const reducer = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true
        }
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.error,
        isAuthenticated: false
      }
    case LOGOUT:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false
      }
    case IS_REQUESTING:
        return {
          ...state,
          isLoading: action.bool
        }
    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
      }
    default:
      return state
  }
}

export default reducer;