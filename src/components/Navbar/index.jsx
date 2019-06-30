import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// third-party library
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import queryString from 'query-string';
import logo from 'assets/images/SHOPMATE.png';

//components
import SubNav from 'components/SubNav';
import Modal from 'components/Modal';
import CartModal from 'components/CartModal';

// action
import { getItemsInCart } from 'store/modules/cart';
import { getCategories } from 'store/modules/categories';
import { searchProduct } from 'store/modules/products';

// style
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHomePage: false,
      isProductPage: '',
      showModal: false,
      isCheckout: false,
      showSearch: false,
      showNavBar: true,
      search: '',
      noContent: false,
    }
    this.form = React.createRef();
  }

  componentDidMount() {
    this.onRouteChanged();
    this.props.getItemsInCart();
    this.props.getCategories();
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      console.log(this.props.location, 'history')
      this.onRouteChanged();
    }
  };

  /**
   * Handles route change
   *
   * @returns {void}
   */
  onRouteChanged = () => {
    const { pathname } = this.props.location;
    this.setState({
      isHomePage: pathname !== '/' ? true : false,
      isProductPage: pathname === '/product-page' ? 'product-page' : '',
      showNavBar: pathname === '/account' ||  pathname === '/checkout' ? false: true,
      noContent: pathname.includes('/products/') ? true : false
    })
  }

  /**
   * Toggles modal
   *
   * @returns {void}
   */
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  /**
   * Closes Modal
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  /**
   * Toggles search field
   *
   * @returns {void}
   */
  toggeSearchField = () => {
    this.setState({
      showSearch: !this.state.showSearch
    })
  }

  /**
   * Handles input change
   *
   * @param {object} - event
   *
   * @returns {void}
   */
  onChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * Submits search request
   *
   * @param {object} - event
   *
   * @returns {void}
   */
  onSubmitSearch = async(event) => {
    event.preventDefault();
    await this.props.searchProduct(this.state.search);
    this.form.current.reset();
  }

  /**
   * Closes search field
   *
   * @returns {void}
   */
  closeSearchField = () => {
    this.setState({
      showSearch: false
    })
  }

  render() {
    const { isLoading, itemsInCart, categories } = this.props;
    const { categoryId } = queryString.parse(this.props.location.search);

    return (
      <>
        { this.state.isHomePage && <SubNav {...this.props}/> }
        { this.state.showNavBar &&
        <div className={`navbar navbar__${this.state.isProductPage}`}>
          <div className="navbar__left">
            <ul>
              <li>
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </li>
             { !this.state.noContent &&  categories && categories.length > 1 && categories.slice(0, 6).map((category, index) => (
                <li key={category.category_id} className={category.category_id === parseInt(categoryId) ? 'active-link' : ''}>
                  <Link to={`/product-page?categoryId=${category.category_id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar__right">
            <ul>
              <li>
                { this.state.showSearch &&
                  <form action="" className="search-form" onSubmit={this.onSubmitSearch} ref={this.form}>
                    <input type="text" name="search" className="search-input" placeholder="search anything" onChange={this.onChangeInput} />
                    <span className="search-input__icon" onClick={this.onSubmitSearch}><i className="fa fa-search"></i></span>
                    <span className="search-input__close" onClick={this.closeSearchField}><i className="fa fa-times"></i></span>
                  </form>
                }
                { !this.state.showSearch &&
                  <i className="fa fa-search fa-2x" onClick={this.toggeSearchField}></i>
                }
              </li>
              <li className="navbar__right--notification" onClick={this.toggleModal}>
                <i className="fa fa-lock fa-2x"></i>
                <span className="navbar__right--number">{itemsInCart && itemsInCart.length}
                </span>
              </li>
            </ul>
          </div>
        </div>
        }
         { this.state.showModal &&
          <Modal
            showModal={this.state.showModal}
            classes="modal-w-900"
            closeModal={this.closeModal}
          >
            <CartModal
              cartItems={itemsInCart}
              isLoading={isLoading}
              closeModal={this.closeModal}
            />
          </Modal>
        }
      </>
    )
  }
}

export const mapStateToProps = state => {
  return {
    itemsInCart: state.cart.data,
    isLoading: state.cart.isLoading,
    categories: state.categories.data
  }
};

export const mapDispatchToProps = dispatch => ({
  getItemsInCart: () => dispatch(getItemsInCart()),
  getCategories: () => dispatch(getCategories()),
  searchProduct: (querySearch) => dispatch(searchProduct(querySearch))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
