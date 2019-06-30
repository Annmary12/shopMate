// react libraries
import React from 'react';

// style
import './OrderList.scss';

const OrderList = ({orders}) => (
  <div className="order-list">
  <h1 className="title">My Orders {orders.length}</h1>
  { orders && orders.length >= 1 && orders.slice(0,9).map((order, index) => (
  <div className="item">
    <div className="item__content">
      <p>Women Men Retro Style Round Nerd Glasses Clear Lens Eyewear Metal Frame Glasses</p>
    </div>
    <div className="item__buttons">
      <p>View Details</p>
    </div>
  </div>
  ))}
</div>
)

export default OrderList;

