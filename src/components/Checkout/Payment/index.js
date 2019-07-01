import React, { Component } from 'react';

// third-party library
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';
import { connect } from 'react-redux';

// style
import './Payment.scss';

// component
import RadioBox from 'components/RadioBox';
import Button from 'components/Button';

// images
import visaLogo from 'assets/images/logos-visa.png';
import mastercard from 'assets/images/logos-mastercard.png';
import paypal from 'assets/images/logos-PayPal.png';

// action

const createOptions = () => {
  return {
    style: {
      base: {
        marginTop: '10px !important',
        padding: '1.5rem 4.5rem',
        border: 'inherit !important',
        fontSize: '1.4rem',
        width: '100%',
        color: '#424770',
        // fontSize: '16px',
        // color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: 'transparentize(#0d2a4d, 0.8)',
          fontSize: '1.4rem',
          fontWeight: '100',
          letterSpacing: '.15rem',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};
class CheckoutPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'card',
      paymentType: '',
      name: '',
      errorMessage: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage !== this.props.errorMessage) {
      this.setState({
        errorMessage: nextProps.errorMessage
      })
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const {  updateCurrentStep, orderDetails, totalAmount, shippingInfo : {shipping_cost} } = this.props;
      const totalAmoutPlusShipping = shipping_cost ? Number(parseFloat(shipping_cost) + parseFloat(totalAmount)).toFixed(2) : totalAmount;

      if (this.props.stripe) {
        const token = await this.props.stripe.createToken();
        if (token.error) {
          this.setState({
            errorMessage: token.error.message
          })
        } else {
          this.props.createOrder(orderDetails, token.token.id, totalAmoutPlusShipping, updateCurrentStep);
        }
      } else {
        this.setState({
          errorMessage: "Stripe.js hasn't loaded yet."
        })
      }
    } catch (error) {
      this.setState({
        errorMessage: error.message
      })
    }
  }
  render() {
    const { handleInputChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className="payment">
          <div className="payment__method">
            <div>
              <span className="images">
                <img src={visaLogo} alt="visaLogo" />
                <img src={mastercard} alt="mastercard" className="mls" />
              </span>
              <p>
                <RadioBox
                  name="paymentType"
                  onChange={handleInputChange}
                  value="visa"
                  checked={this.state.paymentType === "visa"}
                />
                <label htmlFor="pay">Pay £{this.props.totalAmount} with credit card</label>
              </p>
            </div>
            <div>
              <img src={paypal} alt="paypal" />
              <p>
                <RadioBox
                  name="paymentType"
                  onChange={handleInputChange}
                  value="payPay"
                  checked={this.state.paymentType === "payPay"}
                />
                <label htmlFor="pay">Pay £{this.props.totalAmount} with paypal</label>
              </p>
            </div>
          </div>
          <div className="form-row mtm">
            <div>
              <label htmlFor="name">Cardholder's Name</label>
              <input name="name"onChange={handleInputChange} className="card-name mtxs"/>
            </div>
            <div>
              <label htmlFor="name" className="stripe-label">Card Number</label>
              <CardNumberElement
                onChange={this.handleChange}
                {...createOptions()}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="card-details">
              <div>
                <label htmlFor="name" className="stripe-label">Valid thru</label>
                <CardExpiryElement
                  onChange={this.handleChange}
                  {...createOptions()}
                />

              </div>
              <div>
                <label htmlFor="name" className="stripe-label">CVV/CVC*</label>
                <CardCVCElement
                  onChange={this.handleChange}
                  {...createOptions()}
                />
              </div>
            </div>
            <div>
              <p>* CVV or CVC is the card security code, unique three digits number on <br />the back of your card separate from its number.</p>
            </div>
          </div>
          <div className="error-message">
            {this.state.errorMessage}
          </div>
        </div>

        <div className="footer">
          <Button
            name="Back"
            classes="btn__secondary"
            size="medium"
            onClick={() => this.props.updateCurrentStep(2)}
          />
          <Button
            classes="btn__primary"
            type="submit"
            name={!this.props.isLoading ? 'Pay' : 'Loading...'}
          />
        </div>
      </form>
    )
  }
}
export const mapStateToProps = state => {
  return {
    isLoading: state.orders.isLoading,
    errorMessage: state.orders.error,
    totalAmount: state.cart.totalAmount,
  }
};

export default connect(mapStateToProps, null)(injectStripe(CheckoutPayment));
