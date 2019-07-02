// react libraries
import React from 'react';

// components
import Button from 'components/Button';

// image;
import shoeImage from 'assets/images/men.jpg';

// styles
import './SavedItems.scss';

const SavedItems = ({items, moveToCartAction, removeItemAction}) => (
  <div className="saved-items">
    <h1 className="title">Saved Items {items.length}</h1>
    { items && items.length >= 1 && items.map((item, index) => (
      <div className="item" key={index}>
        <div className="item__image">
          <img src={shoeImage} alt="" />
        </div>
        <div className="item__content">
          <p>{item.name}</p>
          <p>{item.attributes}</p>
          <div className="price">£{item.price}</div>
        </div>
        <div className="item__buttons">
          <div className="item__buttons--add-to-cart">
            <Button
              name='Add To Cart'
              classes="btn__primary"
              onClick={moveToCartAction(item.item_id)}
            />
          </div>
          <div className="item__buttons--remove">
            <Button
              name="Remove"
              classes="btn__secondary"
              onClick={removeItemAction(item.item_id)}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default SavedItems;
