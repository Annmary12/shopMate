// import { logout } from 'store/modules/auth';
import * as jwtDecode from 'jwt-decode';
import moment from 'moment';

export const authService = {
  getToken() {
    return localStorage.getItem('jwtToken');
  },

  isAuthenticated() {
    return this.getToken() ? true : false;
  },

  getUser() {
    return this.getToken() ? jwtDecode(this.getToken()) : null;
  },

  isExpired() {
    if (this.getToken() === null) {
      return false
    }

    const { exp } = jwtDecode(this.getToken());
    const expDate = moment.unix(exp).format('YYYY MM DD');
    const todaysDate = moment().format('YYYY MM DD');

    return moment(expDate).isBefore(todaysDate);
  },
}