import React from 'react';

// third-party library
import { Link } from 'react-router-dom';

// component
import Button from 'components/Button';

// style
import './Finish.scss';

// image
import finishIcon from 'assets/images/icons-rocket.png';

const CheckoutFinish = () => (
  <div className="finish">
    <img src={finishIcon} alt="finish-icon" />

    <h1>Success!</h1>
    <p className="mbs">Your items will be shipped shortly, <br/> you will get email with details.</p>
    <Link to="product-page">
      <Button
        name="Back to Shop"
        classes="btn__primary"
        size="medium"
      />
    </Link>
  </div>
)

export default CheckoutFinish;
