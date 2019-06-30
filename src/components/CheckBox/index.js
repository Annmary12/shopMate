import React from 'react';

import PropTypes from 'prop-types';

// styles
import './ChexkBox.scss';

const CheckBox = ({ name, checked, handleChange, label}) => (
  <label htmlFor="checkbox" className="checkbox">
    <input
      type="checkbox"
      className="checkbox__input"
      name={name}
      checked={checked}
      onChange={handleChange}
    />
    <label htmlFor={label} className="checkbox__label">{label}</label>
    <span className="checkbox__checkmark"></span>
  </label>
)

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  label: PropTypes.string,
}

export default CheckBox;