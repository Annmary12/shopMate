import React, { Component } from 'react';

// third-party library
import { connect } from 'react-redux';
import { Elements, StripeProvider } from 'react-stripe-elements';

// components
import Delivery from 'components/Checkout/Delivery';
import Comfirmation from 'components/Checkout/Confirmation';
import Finish from 'components/Checkout/Finish';
import Payment from 'components/Checkout/Payment';

// actions
import { getTotalAmount } from 'store/modules/cart';
import { getCustomer, updateCustomer } from 'store/modules/customer';
import { createOrder } from 'store/modules/order';

// styles
import './Checkout.scss';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 3,
      shippingId: ''
    }

    // if (window.performance) {
    //   if (performance.navigation.type === 1) {
    //     alert(this.state.currentStep);
    //   } else {
    //     alert( "This page is not reloaded");
    //   }
    // }
  }

  componentDidMount() {
    this.props.getTotalAmount();
    if (this.props.user) {
      this.props.getCustomer();
    }
  }

  /**
   * Get shipping region
   *
   * @param {number} - shipping id
   *
   * @returns {object} - ship region
   */
  getRegion = (shippingRegionId) => {
    const { shippingRegions } = this.props;

    if (shippingRegions) {
      return shippingRegions.find(region => region.shipping_region_id === parseInt(shippingRegionId))
    }

    return false;
  }

  /**
   * Gets shipping option
   *
   * @param {number} - shipping Id
   *
   * @returns {object} = shipping option
   */
  getShippingOption = (shippingId) => {
    const { shippingOptions } = this.props;
    if (shippingOptions && shippingOptions.length > 1) {
      return shippingOptions.find(option => option.shipping_id === parseInt(shippingId));
    }
    return false;
  }

  /**
   * Checkout Action
   *
   * @param {object} - values
   * @param {step} - checkout step
   *
   * @returns {void}
   */
  checkoutAction = async (values, step) => {
    if (step === 1) {
      if (values.shipping_id) {
        this.setState({
          shippingId: values.shipping_id
        })
      }
      const getShippingOption = await this.getShippingOption(values.shipping_id)
      const getRegion = await this.getRegion(getShippingOption.shipping_region_id);
      const region = getRegion && getRegion.shipping_region ? getRegion.shipping_region : '';
      const shipping_region_id = getRegion && getRegion.shipping_region_id ? getRegion.shipping_region_id : '';
      const customerDetails = {
        ...values,
        name: values.firstName + ' ' + values.lastName,
        region,
        shipping_region_id
      }

      this.props.updateCustomer(customerDetails, step, this.updateCurrentStep)
    }
  }

  /**
   * updates the current step
   *
   * @param {number} - steo
   *
   * @returns {void}
   */
  updateCurrentStep = (step) => {
    this.setState({
      currentStep: step
    })
  }

  /**
   * Gets Order details
   *
   * @returns {void}
   */
  getOrderDetails = () => (
    {
      card_id: localStorage.getItem('cartId'),
      shipping_id: this.props.customer.shipping_region_id,
      tax_id: 1
    }
  )

  /**
   * Takes you to the next step of action
   *
   * @param {number} - current step
   * @param {string} - action
   *
   * @returns {void}
   */
  nextStepAction = (currentStep, action = null) => () => {
    this.setState({
      currentStep: action === 'back' ? currentStep - 1 : currentStep + 1
    })
  }

  render() {
    const { currentStep } = this.state;
    const { customer, itemsInCart, totalAmount, isAuthenticated } = this.props;

    return (
      <div className="checkout">
        {!isAuthenticated
          ? <div className="checkout__not-signed-in">Please Kindly <span className="title">Login </span> or <span className="title">Register</span> to Continue the Checkout Process</div>
          : itemsInCart.length <= 0
            ? <div className="checkout__not-signed-in">No Items In Your Cart</div>
            : <>
              <h1 className="checkout__header mbs"> Checkout Page </h1>
              <ul className="progressbar">
                <li className={currentStep >= 1 ? 'active' : ''}> Delivery </li>
                <li className={currentStep >= 2 ? 'active' : ''}>Confirmation</li>
                <li className={currentStep >= 3 ? 'active' : ''}>Payment</li>
                <li className={currentStep >= 4 ? 'active' : ''}>Finish</li>
              </ul>

              {currentStep === 1 && <Delivery checkoutAction={this.checkoutAction} customer={this.props.customer}
              />}
              {currentStep === 2 &&
                <Comfirmation
                  address={customer}
                  itemsInCart={itemsInCart}
                  totalAmount={totalAmount}
                  nextStepAction={this.nextStepAction}
                  shippingInfo={this.state.shippingId ? this.getShippingOption(this.state.shippingId) : {}}
                />
              }
              {currentStep === 3 &&
                <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
                  <Elements>
                    <Payment
                      createOrder={this.props.createOrder}
                      orderDetails={this.getOrderDetails()}
                      totalAmount={this.props.totalAmount}
                      updateCurrentStep={this.updateCurrentStep}
                      shippingInfo={this.state.shippingId ? this.getShippingOption(this.state.shippingId) : {}}
                    />
                  </Elements>
                </StripeProvider>
              }
              {currentStep === 4 && <Finish />}
            </>
        }

      </div>
    )
  }
}

export const mapStateToProps = state => {
  return {
    itemsInCart: state.cart.data,
    totalAmount: state.cart.totalAmount,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    customer: state.customer.data,
    shippingRegions: state.regions.data,
    shippingOptions: state.regions.shippingOption
  }
};

export const mapDispatchToProps = dispatch => ({
  getTotalAmount: () => dispatch(getTotalAmount()),
  getCustomer: () => dispatch(getCustomer()),
  updateCustomer: (customerDetails, step, updateCurrentStep) => dispatch(updateCustomer(customerDetails, step, updateCurrentStep)),
  createOrder: (orderDetails, stripeToken, amount, updateCurrentStep) => dispatch(createOrder(orderDetails, stripeToken, amount, updateCurrentStep))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
