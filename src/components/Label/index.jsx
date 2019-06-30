import React from 'react';

// style
import './Label.scss';

const Label = ({
  name,
  color
}) => (
  <div className={`label__${color}`}>
      { name }
  </div>
);

export default Label;
