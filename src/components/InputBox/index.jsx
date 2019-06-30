// react libraries
import * as React from 'react';
import { Link } from 'react-router-dom';

// third party libraries
import PropTypes from 'prop-types';

// style
import './InputBox.scss';

const InputBox = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  name,
  size,
  inputType,
  type,
  bottomLabel,
  link,
  linkContent,
  onClick,
  placeholder,
  hasIcon,
  iconClass,
  value
}) => {
  const inputClasses = `input input__${inputType} ` + (errors[name] && touched[name] ? ' input__error' : '') + (size ? size : '');

  return (
    <div className="form-input">
      <div className="form-input__input">
      { type === 'textarea'
        ? <textarea className={inputClasses} name={name} placeholder={placeholder} onChange={handleChange} rows="8">{values[name]}</textarea>
        : <input
            type={type}
            className={inputClasses}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name] || value || ''}
            placeholder={placeholder}
          />
      }
        { hasIcon && iconClass && <span className="form-input__icon"><i className={iconClass}></i></span> }
        { bottomLabel && <div className="form-input__bottom">{bottomLabel} <Link to={link}>{linkContent}</Link></div>}
        {
          errors[name] && touched[name] && <span className="input__error--message">{errors[name]}</span>
        }
      </div>
  </div>
  )
}

InputBox.propTypes = {
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  bottomLabel: PropTypes.string,
  link: PropTypes.string,
  placeholder: PropTypes.string,
  iconText: PropTypes.string,
  size: PropTypes.string,
  inputType: PropTypes.string,
};

InputBox.defaultProps = {
  type: 'text',
  values: {},
  touched: {},
  errors: {},
  inputType: 'rounded',
  isSubmitting: false,
  hasIcon: false,
  link: '#'
};

export default InputBox;