import React, { Component } from 'react';

// third-party library
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// component
import Modal from 'components/Modal';
import CartModal from 'components/CartModal';
import AuthForm from 'components/AuthForm';

// actions
import { getItemsInCart } from 'store/modules/cart';
import { logout } from 'store/modules/auth';

// style
import './SubNav.scss';

// image
import countryLogo from '../../assets/images/gbr.png';

const initialState = {
  showModal: false,
  isCart: false,
  isLogin: false,
  isRegister: false,
}
class SubNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      toggleDropdown: false,
    }
    this.toggleRef = React.createRef();
  }

  componentDidMount() {
    this.props.getItemsInCart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.closeDropdown();
    }
  };

  /**
   * Toggles modal
   *
   * @param {string} - modal type
   *
   * @returns {void}
   */
  toggleModal = (type) => () => {
    this.setState({
      [type]: !this.state[type],
      showModal: !this.state.showModal,
    });
  }

  /**
   * Closes Modal
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      ...initialState
    })
  }

  /**
   * Changes the state of the form
   *
   * @param {string} - form type
   *
   * @returns {void}
   */
  onChangeFormState = (type) => () => {
    this.setState({
      ...initialState,
      [type]: !this.state[type],
      showModal: true,
    })
  }

  /**
   * Toggles dropdown
   *
   * @returns {void}
   */
  toggleDropdown = () => {
    this.setState({
      toggleDropdown: !this.state.toggleDropdown
    }, () => (
      this.state.toggleDropdown ? this.toggleRef.current.focus() : ''
    ))
  }

  /**
   * Closes Dropdown
   *
   * @returns {void}
   */
  closeDropdown = () => {
    this.setState({
      toggleDropdown: false
    })
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
    const { isLoading, itemsInCart, user, isAuthenticated} = this.props;
    const { toggleDropdown } = this.state;
    return (
      <>
      <div className="subnav">
        <div className="subnav__sign-info">
          Hi!
          { isAuthenticated
            ? <span className="title" onClick={this.toggleDropdown}> { user.name } <span><i className={toggleDropdown ? 'fa fa-caret-up' : 'fa fa-caret-down'}></i></span></span>
            : <>
                <span className="title" onClick={this.toggleModal('isLogin')}> Sign in </span>
                  or
                <span className="title" onClick={this.toggleModal('isRegister')}> Register</span>
              </>
          }
          { toggleDropdown &&
            <div className="user-info" ref={this.toggleRef} onBlur={this.closeDropdown}>
              <div className="item"><Link to="/account?name=profile">My Account</Link></div>
              <div className="item"><Link to="/account?name=order">My Orders</Link></div>
              <div className="item"><Link to="/account?name=savedItem">My Saved items</Link></div>
              <div className="vl" />
              <div className="item" onClick={this.logout}>Logout</div>
            </div>
          }
        </div>
        <div className="subnav__links">
          <Link to="/product-page">Daily Deals</Link>
          <span>Sell</span>
          <span>Help & Contact</span>
        </div>
        <div className="subnav__country">
          <img src={countryLogo} alt="flag" />
          <span> £ GBP</span>
        </div>
          <div className="subnav__notification">
            <span onClick={this.toggleModal('isCart')}>
              <i className="fa fa-lock fa-2x"></i>
              <span className="subnav__notification--number">{itemsInCart && itemsInCart.length}</span>
            </span>
            <span>Your bag: £3.99</span>
        </div>
      </div>
      { this.state.showModal &&
          <Modal
            showModal={this.state.showModal}
            classes={this.state.isCart ? 'modal-w-900' : 'modal-w-600'}
            closeModal={this.closeModal}
          >
            { this.state.isCart &&
              <CartModal
                cartItems={itemsInCart}
                isLoading={isLoading}
                closeModal={this.closeModal}
              />
            }

            {
              (this.state.isLogin || this.state.isRegister) &&
                <AuthForm
                  formType={this.state.isLogin ? 'login' : 'signup'}
                  closeModal={this.closeModal}
                  onChangeFormState={this.onChangeFormState}
                />
            }

          </Modal>
        }
      </>
    )
  }
};

export const mapStateToProps = state => {
  return {
    itemsInCart: state.cart.data,
    isLoading: state.cart.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
};

export const mapDispatchToProps = dispatch => ({
  getItemsInCart: () => dispatch(getItemsInCart()),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SubNav);
