import React from 'react';

// styles
import './RadioBox.scss';

const RadioBox = ({
  name,
  color = 'default',
  checked = false,
  onChange,
  value
}) => (
  <label className={`radio-box radio-box__${color}`}>
    <input type="radio" name={name} onChange={onChange} value={value} checked={checked}/>
    <span className={`checkmark checkmark__${color}`}></span>
  </label>
)

export default RadioBox;