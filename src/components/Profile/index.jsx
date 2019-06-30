// react libraries
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';

// components
import InputBox from 'components/InputBox';
import Button from 'components/Button';

// actions
import { getCustomer, updateCustomerDetails } from 'store/modules/customer';

// style
import './Profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    this.props.getCustomer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: nextProps.user
      })
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateCustomerDetails(this.state.user);
  }

  render() {
    const { email, name, day_phone, eve_phone, mob_phone } = this.state.user;

    return (
      <div className="profile">
        <h1 className="profile__title">
          Account Information
        </h1>
        <div className="vl mbs" />
        <form className="profile__form" onSubmit={this.handleSubmit}>
          <div className="profile__field">
            <label htmlFor="name">Name </label>
            <InputBox
              name="name"
              inputType="blocked"
              value={name}
              handleChange={this.handleChange}
            />
          </div>
          <div className="profile__field">
            <label htmlFor="email">Email </label>
            <InputBox
              name="email"
              inputType="blocked"
              value={email}
              handleChange={this.handleChange}
            />
          </div>

          <div className="profile__field">
            <label htmlFor="password">Password </label>
            <InputBox
              name="password"
              inputType="blocked"
              type="password"
              handleChange={this.handleChange}
            />
          </div>

          <div className="profile__field">
            <label htmlFor="name">Day Phone </label>
            <InputBox
              name="day_phone"
              inputType="blocked"
              type="number"
              value={day_phone}
              handleChange={this.handleChange}
            />
          </div>

          <div className="profile__field">
            <label htmlFor="name">Evening Phone </label>
            <InputBox
              name="eve_phone"
              inputType="blocked"
              value={eve_phone}
              handleChange={this.handleChange}
            />
          </div>

          <div className="profile__field">
            <label htmlFor="name">Mobile Phone </label>
            <InputBox
              name="mob_phone"
              inputType="blocked"
              value={mob_phone}
              handleChange={this.handleChange}
            />
          </div>
          <Button
            name={!this.props.isLoading ? "Update" : "Updating..."}
            classes="btn__primary"
            type="submit"
          />
        </form>
      </div>
    )
  }
};

export const mapStateToProps = state => ({
  user: state.customer.data,
  isLoading: state.customer.isLoading
});

export const mapDispatchToProps = dispatch => ({
  getCustomer: () => dispatch(getCustomer()),
  updateCustomerDetails: (customerDetails) => dispatch(updateCustomerDetails(customerDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
