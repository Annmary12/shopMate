// react libraries
import * as React from 'react';

// third-party labraries
import PropTypes from 'prop-types';

// style
import './Button.scss';

const Button = ({
  type,
  disabled,
  classes,
  name,
  size,
  onClick,
  isLoading = false
}) => (
  <button
    className={[classes +' '+ size]}
    type={type ? type : 'button'}
    disabled={disabled}
    onClick={onClick ? onClick : null}
  >
    { isLoading ? 'loading...' : name }
  </button>
)

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  classes: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;