import React from 'react';

// components
import Button from 'components/Button';

// style
import './Confirmation.scss';

const CheckoutConfirmation = ({ address, itemsInCart, totalAmount, nextStepAction, shippingInfo }) => (
  <>
    <div className="confirmation">
      <div className="confirmation__summary">
        <div className="order-summary">
          <h1>Order Summary</h1>
          {itemsInCart.length > 0 &&
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {itemsInCart.map(item => (
                  <tr key={item.item_id}>
                    <td>{item.name}</td>
                    <td>{item.attributes}, {item.quantity}</td>
                    <td>£{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>}
        </div>
        <div className="address">
          <h1 className="mbs">Delivery</h1>
          <label htmlFor="address">Address</label>
          <p>{address.address_1}, {address.city}, {address.postal_code}</p>
          <label htmlFor="options">Delivery Options</label>
          <p> {shippingInfo && shippingInfo.shipping_type} </p>
        </div>
      </div>
      <div className="vl mtm mbm" />
      <div className="total">
        <div className="discount">
          NEWYEAR8%
      </div>
        <div>
          <p htmlFor="subtotal">Subtotal</p>
          <span>£{totalAmount}</span>
        </div>
        <div>
          <p htmlFor="subtotal">Shipping</p>
          <span>{ shippingInfo  ? `£${shippingInfo.shipping_cost}` : 'Free' }</span>
        </div>
        <div>
          <p htmlFor="subtotal">Grandtotal</p>
          <span>£{shippingInfo.shipping_cost ? Number(parseFloat(shippingInfo.shipping_cost) + parseFloat(totalAmount)).toFixed(2) : totalAmount}</span>
        </div>
      </div>
    </div>
    <div className="footer">
      <Button
        name="Back"
        classes="btn__secondary"
        size="medium"
        onClick={nextStepAction(2, 'back')}
      />
      <Button
        classes="btn__primary"
        type="submit"
        name="Next Step"
        onClick={nextStepAction(2)}
      />
    </div>
  </>
)

export default CheckoutConfirmation;
