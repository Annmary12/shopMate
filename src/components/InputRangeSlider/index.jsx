import React from 'react';

// third-party library
import InputRange from 'react-input-range';

// styles
import './InputRangeSlider.scss';

const InputRangeSlider = ({
  range,
  value,
  onChange,
  onChangeComplete
}) => (
  <InputRange
    maxValue={20}
    minValue={0}
    formatLabel={value => `£ ${value}`}
    value={range}
    onChange={onChange}
    onChangeComplete={value => console.log(value)}
    />
)

export default InputRangeSlider;
