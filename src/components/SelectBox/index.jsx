// react libraries
import React, { Component } from 'react';

// third-party library
import PropTypes from 'prop-types';

// styles
import './SelectBox.scss';

class SelectBox extends Component {

  constructor(props){
    super(props);

    this.state = {
      showDropdownOptions: false,
      selectedOption: {
        shipping_region: '',
        shipping_region_id: ''
      },
    }
  }

  /**
   * toggles the select dropdown
   *
   * @returns {void}
   */
  toggleDropdownOptions = () => {
    this.setState({
      showDropdownOptions: !this.state.showDropdownOptions
    });
  }

  /**
   * hides dropdownoptions
   *
   * @returns {void}
   */
  hideDropdownOptions = () => (
    this.setState({
      showDropdownOptions: false,
    })
  );

  /**
   * handle select box onchange event
   *
   * @param {string} option
   * @returns {void}
   */
  handleSelectBoxChange = option => event => {
    event.persist();
    event.target.value = option;
    event.target.name = this.props.name;
    this.setState({
      selectedOption: option
    });
    this.props.handleShippingRegionSelect(option)
  }

  render() {
    const { name, handleChange, options } = this.props;
    return(
      <div className="select-box">
        <div className="select-box__inputField" onClick={this.toggleDropdownOptions}>
          <input
            type="text"
            name={name}
            className='select-box__input'
            onBlur={this.hideDropdownOptions}
            value={this.state.selectedOption.shipping_region}
            onChange={handleChange}
            placeholder={options[0].shipping_region}
            autoComplete="off"
          />

          <span className='select-box__input--icon'>
            { this.state.showDropdownOptions
              ? <i className="fa fa-caret-up"></i>
              : <i className="fa fa-caret-down"></i>
            }
          </span>
        </div>
        { this.state.showDropdownOptions && options &&
          <div className="select-box__options">
          { options.map((option, index) =>
            <span
              className="select-box__options__item"
              key={index}
              onMouseDown={this.handleSelectBoxChange(option)}
            >{option.shipping_region}</span>
          )}
          </div>
        }
      </div>
    )
  }
}

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  options: PropTypes.array.isRequired,
}

export default SelectBox;