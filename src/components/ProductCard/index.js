import React from 'react';

// third party library
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// components
import Button from '../../components/Button';

// style
import './ProductCard.scss';

// images
import shirt from '../../assets/images/shirt1.png';
import heartIcon from '../../assets/images/icons-heart-red.png';

const ProductCard = ({
  title,
  img,
  price,
  id
}) => (
    <div className="product-card">
        <img src={img ? img : shirt } alt="product" className="product-card__image" />
        <h1 className="product-card__title">{title}</h1>
        <div className="product-card__price">
          £{price ? price: '16.99'}
        </div>
        <div className="quick-view-btn">

        <Link to={`/products/${id}`}>
          <Button
            name="Buy Now"
            classes="btn__primary"
          />
        </Link>
          <img src={heartIcon} alt="heart" className="heartIcon" />
        </div>
    </div>
  );

  ProductCard.propTypes = {
    title: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.number
  };

export default ProductCard;
