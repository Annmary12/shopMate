import React, { Component } from 'react';

// third-party library
import { withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import InputBox from 'components/InputBox';
import CheckBox from 'components/CheckBox';
import RadioBox from 'components/RadioBox';
import Button from 'components/Button';
import SelectBox from 'components/SelectBox';

// utils
import DeliverySchema from 'utils/validationSchemas/checkoutDelivery';

// style
import './Delivery.scss';

// actions
import { getShippingRegions, getShippingRegion } from 'store/modules/shippingOptions';

class CheckoutDelivery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {},
      regions: [],
      selectedShippingOption: {}
    }
  }

  async componentDidMount() {
    await this.props.getShippingRegions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shippingRegions.length > this.props.shippingRegions.length) {
      this.setState({
        regions: nextProps.shippingRegions
      })
    }

    if (nextProps.customer  !==  this.props.customer) {
      this.setState({
        customer: nextProps.customer
      })
    }
  }

  /**
   * Handles shipping select region
   *
   * @param {object} - value
   *
   * @returns {void}
   */
  handleShippingRegionSelect = (value) => {
    if ( value && value.shipping_region_id !== 1) {
      this.props.getShippingRegion(value.shipping_region_id)
    }
  }

  render() {
    const { regions } = this.state;
    const { shippingOptions, values, errors, touched, hasError } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="delivery">
        { hasError &&
          <div className="error-message">
              {hasError}
          </div>
        }
          <div className="form-row">
            <div>
              <label htmlFor="name">First Name *</label>
              <InputBox
                name="firstName"
                inputType="blocked"
                value={values.firstName}
                {...this.props}
              />
            </div>
            <div>
              <label htmlFor="name">Last Name *</label>
              <InputBox
                name="lastName"
                inputType="blocked"
                value={values.lastName}
                {...this.props}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="name">Address *</label>
              <InputBox
                name="address_1"
                inputType="blocked"
                value={values.address_1}
                {...this.props}
              />
            </div>
            <div>
              <label htmlFor="name">City *</label>
              <InputBox
                name="city"
                inputType="blocked"
                value={values.city}
                {...this.props}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="name">State *</label>
              <InputBox
                name="country"
                inputType="blocked"
                value={values.state}
                {...this.props}
              />
            </div>
            <div>
              <label htmlFor="name">Zip Code*</label>
              <InputBox
                name="postal_code"
                inputType="blocked"
                value={values.zipcode}
                {...this.props}
              />
            </div>
          </div>
          <div className="billing-info">
            <CheckBox name="isDifferentBillingAddress" {...this.props} checked={values['isDifferentBillingAddress']} />
            <label>My Billing Information is the same as my delivery information</label>
          </div>
          <div className="vl mtm mbm" />
          <div className="options">
            <h1>Delivery Options</h1>
            {
              errors['shipping_id'] && touched.shipping_id && <span className="error-message">{errors.shipping_id}</span>
            }
            { regions && regions.length > 1 &&
              <SelectBox
                name="Select"
                options={regions}
                handleShippingRegionSelect={this.handleShippingRegionSelect}
              />
            }
            <div className="mts">
              { shippingOptions && shippingOptions.length > 1 &&
                shippingOptions.map(option => (
                  <label htmlFor="radio" key={option.shipping_id}>
                    <RadioBox
                      name="shipping_id"
                      value={option.shipping_id}
                      checked={parseInt(values.shipping_id) === parseInt(option.shipping_id)}
                      onChange={this.props.handleChange}
                      {...this.props}
                    />
                    {option.shipping_type}
                  </label>
                ))
              }
            </div>
          </div>
        </div>
        <div className="footer">
          <Link to="product-page">
            <Button
              name="Back"
              classes="btn__secondary"
              size="medium"
            />
          </Link>
          <Button
            classes="btn__primary"
            type="submit"
            name={this.props.isSubmitting ? 'loading..' : 'Next Step'}
            disabled={this.props.isSubmitting}
          />
        </div>
      </form>

    )
  }
}

const CheckoutDeliveryConfig = {
  enableReinitialize: true,

  mapPropsToValues: ({ customer : { name, address_1, city, postal_code, country }}) => ({
    firstName: (name && name.trim().split(' ')[0]) || '',
    lastName: (name && name.trim().split(' ')[1]) || '',
    address_1: address_1 || '',
    city: city || '',
    postal_code: postal_code || '',
    country: country || '',
    shipping_id: '',
    isDifferentBillingAddress: false
  }),

  validationSchema: DeliverySchema,

  handleSubmit: async (values, { setSubmitting, props }) => {
    await props.checkoutAction(values, 1);
    setSubmitting(false);
  }
}

export const mapStateToProps = state => {
  return {
    isLoading: state.customer.isLoading,
    shippingRegions: state.regions.data,
    shippingOptions: state.regions.shippingOption,
    hasError: state.customer.error
  }
};

export const mapDispatchToProps = dispatch => ({
  getShippingRegions: () => dispatch(getShippingRegions()),
  getShippingRegion: (shippingId) => dispatch(getShippingRegion(shippingId))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withFormik(CheckoutDeliveryConfig))(CheckoutDelivery);