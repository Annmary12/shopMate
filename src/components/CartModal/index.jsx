import React, { Component } from 'react';

// third-party library
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Button from 'components/Button';

// actions
import { removeItem, updateItem, saveForLater } from 'store/modules/cart';

// styles
import './CartModal.scss';

class CartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    }
  }


  /**
   * Removes item from cart
   *
   * @param {string} - item id
   *
   * @returns {void}
   */
  removeItem = (itemId) => () => {
    this.props.removeItem(itemId);
  }

  /**
   * Saves for Later
   *
   * @param {string} - item id
   *
   * @returns {void}
   */
  saveForLater = (itemId) => () => {
    this.props.saveForLater(itemId);
  }


  /**
   * updates cart item quantity
   *
   * @param {string} - type
   * @param {number} - itemId
   * @param {number} - quantity
   *
   * @returns {void}
   */
  updateItem = (itemId, type, quantity) => () => {
    const getQuantity = type === 'add' ? quantity + 1 : quantity - 1;

    this.props.updateItem(itemId, getQuantity);
  }

  /**
   * Redirects the user to a specific route
   *
   * @param {string} - to
   *
   * @returns {void}
   */
  reDirect = (to) => () => {
    this.props.history.push(`/${to}`);
    this.props.closeModal();
  }

  render() {
    const { cartItems, isLoading } = this.props;
    const imageBaseUrl = 'https://backendapi.turing.com/images/products';

    return (
      <>
      <div className="cart-modal">
        <h1 className="cart-modal__header">{ cartItems && cartItems.length <= 0 ? 'No' : cartItems.length} Items In Your Cart</h1>
        { isLoading
          ? 'Loading'
          : cartItems.length > 0
            ? <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                { cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="cart-modal__desc">
                      <img src={`${imageBaseUrl}/${item.image}`} alt="shirt" />
                      <div className="cart-modal__desc--content">
                        <h2>{item.name}</h2>
                        <p>Men BK3513</p>
                        <span onClick={this.saveForLater(item.item_id)} className="save-for-later"><i className="fa fa-heart"></i>Save for later</span>
                        <span onClick={this.removeItem(item.item_id)} className="cart-modal__remove"><i className="fa fa-times"></i> remove</span>
                      </div>
                    </td>
                    <td className="cart-modal__size">{item.attributes}</td>
                    <td>
                      <span className="single-product__quantity--btn" onClick={this.updateItem(item.item_id, 'add', item.quantity)}>
                        <i className="fa fa-plus fa-2x"></i>
                      </span>
                      <span className="single-product__quantity--value mls">
                        {item.quantity}
                      </span>
                      <span className="single-product__quantity--btn" onClick={this.updateItem(item.item_id, 'minus', item.quantity)}>
                        <i className="fa fa-minus fa-2x"></i>
                      </span>
                    </td>
                    <td className="cart-modal__price">{item.price}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            : ''
        }
      </div>
      <div className="cart-footer">
        <Button
          name="Back to Shop"
          classes="btn__secondary"
          onClick={this.reDirect('product-page')}
        />
        <Button
          name="Checkout"
          classes="btn__primary"
          onClick={this.reDirect('checkout')}
        />
        </div>
      </>
    )
  }
}

export const mapStateToProps = state => {
  return { }
};

export const mapDispatchToProps = dispatch => ({
  removeItem: (itemId) => dispatch(removeItem(itemId)),
  updateItem: (itemId, quantity) => dispatch(updateItem(itemId, quantity)),
  saveForLater: (itemId) => dispatch(saveForLater(itemId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartModal));
