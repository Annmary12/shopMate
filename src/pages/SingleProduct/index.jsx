import React, { Component } from 'react';

// third-party library
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'
import Magnifier from "react-magnifier";

// components
import ProductCard from 'components/ProductCard';
import RadioBox from 'components/RadioBox';
import Button from 'components/Button';
import Footer from 'components/FooterTwo';
import Review from 'components/Review';

// actions
import { getProduct, getProducts, addToCart, getProductReview, addReview } from 'store/modules/products';
import { getItemsInCart } from 'store/modules/cart';
import { sizes, colors } from 'store/data';

// styles
import './SingleProduct.scss';

// images
import heartIcon from 'assets/images/icons-heart-red.png';
import commentIcon from 'assets/images/icons-comments-black.png';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: '',
      quantity: 1,
      selectedSize: 'S',
      selectedColor: 'blue',
      review: {
        product_id: this.props.match.params.productId,
        review: '',
        reportAs: '',
        rating: 0
      }
    }
    this.formRef = React.createRef();
  }
  

   async componentDidMount() {
    const { productId } = this.props.match.params;
     await this.props.getProduct(productId);
     await this.props.getProductReview(productId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
     this.props.getProduct(this.props.match.params.productId);
    }
  };

  /**
   * Handles Image change
   *
   * @param {string} - image url
   *
   * @returns {void}
   */
  onImageChange = (image) => {
    this.setState({
      selectedImage: `https://backendapi.turing.com/images/products/${image}`,
    })
  }

  /**
   * Handles cart quantity change
   *
   * @param {string} - type of the action
   *
   * @returns {void}
   */
  onHandleQuantity = (type) => () => {
    const { quantity } =  this.state;

    this.setState({
      quantity: type === 'add' ? (quantity + 1) : (quantity === 1 ? 1 : quantity - 1 )
    })
  }

  /**
   * Handles product size change
   *
   * @param {string} - size
   *
   * @returns {void}
   */
  onSizeChange = (size) => () => {
    this.setState({
      selectedSize: size
    })
  }

  /**
   * Handles review state change
   *
   * @param {event} - event
   *
   * @returns {void}
   */
  onInputReviewChange = (event) => {

    const { name, value } = event.target;
     this.setState({
       review: {
         ...this.state.review,
         [name]: value
       }
     })
  }

  /**
   * Adds a review
   *
   * @returns {void}
   */
  onSubmitReview = async(event) => {
    event.preventDefault();
    const { productId } = this.props.match.params;

    await this.props.addReview(this.state.review)
    await this.resetReviewForm();
    await this.props.getProductReview(productId);
  }

  /**
   * Reset Review form
   *
   * @returns {void}
   */
  resetReviewForm = () => {
    this.setState({
      review: {
        ...this.state.review,
        review: '',
        reportAs: '',
        rating: 0
      }
    })
    this.formRef.current.reset();
  }

  /**
   * Handles rating change
   *
   * @param {integer} - rating
   *
   * @returns {void}
   */
  onRatingChange = (rating) => {
    this.setState({
      review: {
        ...this.state.review,
        rating
      }
    })
  }

  /**
   * Handles color change
   *
   * @param {object} - event
   *
   * @returns {void}
   */
  handleColorChange = (event) => {
    this.setState({
      selectedColor: event.target.value
    });
  }

  /**
   * Gets size Classes
   *
   * @param {string} - size
   *
   * @returns {string} - size classes
   */
  getSizeClasses = (size) => {
    return `size ${this.state.selectedSize === size ? 'size__active' : ''}`;
  }

  /**
   * Adds an item to cart
   *
   * @return {void}
   */
  addToCart = async() => {
    const { quantity, selectedSize, selectedColor } = this.state;
    const cartItem = {...this.props.product, quantity, selectedSize, selectedColor };

    await this.props.addToCart(cartItem);
    await this.props.getItemsInCart();
  }

  render() {
    const { product, isLoading, products, reviews } = this.props;
    const imageBaseUrl = 'https://backendapi.turing.com/images/products';

    return (
      <>
        <div className="single-product mts">
          { product &&
            <section className="single-product__card">
              <div className="single-product__image">
                <Magnifier
                  src={this.state.selectedImage ? this.state.selectedImage : `https://backendapi.turing.com/images/products/${product.thumbnail}`}
                  width='100%'
                  height='auto'
                  className="single-product__image--big"
                  mgShape='square'
                  zoomFactor={1.5}
                  mgWidth={1000}
                  mgHeight={400}
                  mgBorderWidth={2}
                  mgMouseOffsetY={-100}
                  mgTouchOffsetX={-50}
                  mgMouseOffsetX={-100}
                  mgTouchOffsetY={-50}
                 />
                {/* <img src={this.state.selectedImage ? this.state.selectedImage : `https://backendapi.turing.com/images/products/${product.thumbnail}`} alt="product" className="single-product__image--big" /> */}
                <div className="single-product__small-images">
                  <img src={`${imageBaseUrl}/${product.image}`} alt="product" className="single-product__image--small single-product__image--active" onClick={() => this.onImageChange(product.image)} />
                  <img src={`${imageBaseUrl}/${product.image_2}`} alt="product" className="single-product__image--small" onClick={() => this.onImageChange(product.image_2)} />
                </div>
              </div>
              <div className="single-product__content">
                <ul>
                  <li><Link to='/'>Home</Link></li>
                  <li>.</li>
                  <li><Link to='/product-page'>All Categories</Link></li>
                  <li>.</li>
                  <li><Link to='/product-page'>Men's Clothing & Accessories</Link></li>
                </ul>
                <div>
                  <StarRatings
                    rating={3.5}
                    starRatedColor="#FFAF30"
                    numberOfStars={5}
                    name='rating'
                    starDimension="30px"
                    starSpacing="0px"
                  />
                </div>

                <h1 className="single-product__title">
                  {product.name}
                </h1>
                <p className="single-product__description">
                  {product.description}
                </p>
                <div className="single-product__price">
                  { parseInt(product.discounted_price) > 0
                      ? <span>
                        £{product.discounted_price}
                          <strike className="nmr"> £{product.price}</strike>
                        </span>
                      : `£${product.price}`
                  }
                </div>
                <div className="single-product__colors mtxs">
                  <h2 className="mbxs">Color</h2>
                  { colors && colors.map((color, index) => (
                    <RadioBox
                      name="color"
                      key={index}
                      color={color.name}
                      value={color.name}
                      checked={this.state.selectedColor === color.name}
                      onChange={this.handleColorChange}
                    />
                  ))}
                </div>

                <div className="single-product__sizes mtxs">
                  <h2 className="mbxs">Size</h2>
                  { sizes && sizes.map((size, index) => (
                    <span className={this.getSizeClasses(size)} key={index} onClick={this.onSizeChange(size)}> {size} </span>
                  ))}
                </div>

                <div className="single-product__quantity mtxs">
                  <h2 className="mbxs">Quantity</h2>
                  <span className="single-product__quantity--btn" onClick={this.onHandleQuantity('add')}>
                    <i className="fa fa-plus fa-2x"></i>
                  </span>
                  <span className="single-product__quantity--value mls">
                    {this.state.quantity}
                  </span>
                  <span className="single-product__quantity--btn" onClick={this.onHandleQuantity('minus')}>
                    <i className="fa fa-minus fa-2x"></i>
                  </span>
                </div>

                <div className="single-product__checkout mts">
                  <Button
                    name="Add to Cart"
                    classes="btn__primary"
                    size="medium"
                    onClick={this.addToCart}
                    type="submit"
                    isLoading={this.props.isLoading}
                  />
                  <span className="single-product__checkout--icon">
                    <img src={heartIcon} alt="heart" />
                    <span>Add to Wish List</span>
                  </span>
                </div>
              </div>
            </section>}
            <Review
              reviews={reviews}
              onSubmitReview={this.onSubmitReview}
              onInputReviewChange={this.onInputReviewChange}
              onRatingChange={this.onRatingChange}
              initialReview={this.state.review}
              ref={this.formRef}
              isLoading={isLoading}
            />
        </div>
        <div>
          <section className="products mbm mtm">
            <h1 className="products__title">You may also like</h1>
            <div className="products__cards">
              { isLoading
              ? <div>Loading----</div>
              : products && products.length > 0 && products.map(product => (
              <div className="card" key={product.product_id}>
                <ProductCard
                  title={product.name}
                  price={product.price}
                  img={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
                  id={product.product_id}
                />
              </div>
            ))}
            </div>
          </section>
        </div>
        <Footer color="white"/>
      </>
    )
  }
}

export const mapStateToProps = state => {
  return {
    products: state.products.data.slice(0,4),
    product: state.products.singleProduct.product,
    isLoading: state.products.isLoading,
    reviews: state.products.singleProduct.reviews
  }
};

export const mapDispatchToProps = dispatch => ({
  getProduct: (productId) => dispatch(getProduct(productId)),
  getProducts: (limit) => dispatch(getProducts(limit)),
  addToCart: (product) => dispatch(addToCart(product)),
  getItemsInCart: () => dispatch(getItemsInCart()),
  getProductReview: (productId) => dispatch(getProductReview(productId)),
  addReview: (reviewDetails) => dispatch(addReview(reviewDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
