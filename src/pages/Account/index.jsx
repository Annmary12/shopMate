// react libraries
import React, { Component } from 'react';

// third party library
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

// component
import Profile from 'components/Profile';
import OrderList from 'components/OrderList';
import SavedItems from 'components/SavedItems';
import Button from 'components/Button';

// actions
import { getSavedItem, moveToCart, removeItem } from 'store/modules/cart';
import { customerOrders } from 'store/modules/order'
import { logout } from 'store/modules/auth';

// style
import './Account.scss';

const initialState = {
  isProfile: false,
  isOrder: false,
  isSavedItem: false,
}
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
       isProfile: true,
       isOrder: false,
       isSavedItem: false,
    }
  }

  componentDidMount() {
    this.props.getSavedItem();
    this.props.customerOrders();
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  };

  /**
   * Handles route change
   *
   * @returns {void}
   */
  onRouteChanged = () => {
    const { name } = queryString.parse(this.props.location.search);

    if( name) {
      const query = 'is'+[name.charAt(0).toUpperCase() + name.slice(1)];
      this.setState({
        ...initialState,
        [query]: true
      })
    }
  }

  /**
   * Moves items to cart
   *
   * @param {string} - item id
   *
   * @returns {void}
   */
  moveToCart = (itemId) => async() => {
    await this.props.moveToCart(itemId)
    await this.props.getSavedItem();
  }

 /**
   * Removes items from saved items
   *
   * @param {string} - item id
   *
   * @returns {void}
   */
  RemoveItemFromSavedItems = (itemId) => async() => {
    await this.props.removeItem(itemId)
    await this.props.getSavedItem();
  }

  /**
   * Handles Logout
   *
   * @returns {void}
   */
  logout = () => {
    this.props.logout();
  }

  render() {
    const { isProfile, isOrder, isSavedItem } = this.state;
    return (
      <div className="account">
        <div className="account__nav">
          <Link to="/account?name=profile" className={isProfile ? 'active-link' : ''}>My Account</Link>
          <Link to="/account?name=order" className={isOrder ? 'active-link' : ''}>My Orders</Link>
          <Link to="/account?name=savedItem" className={isSavedItem ? 'active-link' : ''}>My Saved Items</Link>
          <div className="vl mts mbs"></div>
          <Button
            name="Logout"
            classes="btn__secondary"
            onClick={this.logout}
          />
        </div>
        <div className="account__content">
          { isProfile &&  <Profile /> }
          { isOrder && <OrderList orders={this.props.orders}/> }
          { isSavedItem &&
            <SavedItems
              items={this.props.SavedItems}
              moveToCartAction={this.moveToCart}
              isLoading={this.props.isLoading}
              removeItemAction={this.RemoveItemFromSavedItems}
            /> }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  SavedItems: state.cart.savedItems,
  isLoading: state.cart.isLoading,
  orders: state.orders.data
})

export const mapDispatchToProps = dispatch => ({
  getSavedItem: () => dispatch(getSavedItem()),
  moveToCart: (itemId) => dispatch(moveToCart(itemId)),
  removeItem: (itemId) => dispatch(removeItem(itemId)),
  customerOrders: () => dispatch(customerOrders()),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
