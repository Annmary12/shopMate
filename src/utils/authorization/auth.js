
import axios from 'axios';

/**
 * @description sets token to the header
 * @function setAuthorizationToken
 * @param { string } token - holds the token
 * @returns { void }
 */
export const setAuthorizationToken = (token) => {
  // sets token to header
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
