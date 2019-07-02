/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';


// third party libraries
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

// components
import ProductCard from 'components/ProductCard';
import Button from 'components/Button';
import Footer from 'components/FooterTwo';
import Pagination from 'components/Pagination';

// actions
import { getProducts, getProductsByCategory, getProductsByDepartment } from 'store/modules/products';
import { getCategories, getCategoriesInDepartment } from 'store/modules/categories';

// style
import './ProductPage.scss';


class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      value: { min: 2, max: 10 },
      priceRange: {
        min: 5,
        max: 10,
      },
      currentPage: 1,
      limit: 12,
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getProducts();
    }
  };

  /**
   * Gets all product
   *
   * @returns {void}
   */
  getProducts = () => {
    const { departmentId, categoryId } = queryString.parse(this.props.location.search);
    console.log({departmentId, categoryId})
    if (departmentId) {
      this.props.getProductsByDepartment(12, departmentId);
      this.props.getCategoriesInDepartment(departmentId);
    } else if (categoryId) {
      this.props.getProductsByCategory(12, categoryId);
    }
    else {
      this.props.getProducts();
      this.props.getCategories();
    }
  }

  /**
   * @description - Handle the pagination
   *
   * @returns {void}
   * @param {number} page - holds the page number you clicked
   */
  onPageChange = (page) => {
    const { limit } = this.state;
    const currentPage = page.selected + 1;
    const { departmentId, categoryId } = queryString.parse(this.props.location.search);

    if (departmentId) {
      this.props.getProductsByDepartment(12, departmentId, currentPage);
    } else if (categoryId) {
      this.props.getProductsByCategory(12, categoryId, currentPage);
    }
     else {
      this.props.getProducts(limit, currentPage);
    }

    this.setState({
      currentPage
    });
  }

  render() {
    const { products, isLoading, categories } = this.props;
    const totalPages = Math.ceil(this.props.totalProduct / this.state.limit);
    const { categoryId } = queryString.parse(this.props.location.search);

    return (
      <div className="productpage">
        <section className="productpage__header">
          <h1 className="productpage__header--title">Mens Wear</h1>
          <div className="productpage__header--list">
            <ul>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">ASOS Basic Tops</a></li>
              <li><a href="#">Bags</a></li>
              <li><a href="#">Caps & Hats</a></li>
              <li><a href="#">Gifts</a></li>
              <li><a href="#">Grooming</a></li>
            </ul>
            <ul>
              <li><a href="#">Hoodies & Sweatshirts</a></li>
              <li><a href="#">Jackets & Coats</a></li>
              <li><a href="#">Jeans</a></li>
              <li><a href="#">Jewellery</a></li>
              <li><a href="#">Joggers</a></li>
              <li><a href="#">Jumpers & Cardigans</a></li>
            </ul>
            <ul>
              <li><a href="#">Leather Jackets</a></li>
              <li><a href="#">Long Sleeve T-Shirts</a></li>
              <li><a href="#">Loungewear</a></li>
              <li><a href="#">Oversized & Longline</a></li>
              <li><a href="#">Polo Shirts</a></li>
              <li><a href="#">Shirts</a></li>
            </ul>
            <div />
          </div>
        </section>
        <section className="productpage__list mts mbs">
          <section className="filter">
            <div className="filter__category filter__category--title">
              Categories
            </div>
            <div className="categories">
              { categories && categories.map((category, index) => (
                <div className={`filter__category filter__category--item ${category.category_id === parseInt(categoryId) ? 'active-link' : ''}`} key={index}>
                  <Link to={`/product-page?categoryId=${category.category_id}`}>{category.name}</Link>
                </div>
              ))}
              <Link to="product-page" className="filter__category--clear"><i className="fa fa-times"></i> Clear All</Link>
            </div>
          </section>
          <div className="productpage__cards">
          { isLoading
            ? <div>Loading----</div>
            : products && products.length > 0 
              ? products.slice(0,8).map(product => (
                <div className="card" key={product.product_id}>
                  <ProductCard
                    title={product.name}
                    price={product.price}
                    img={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
                    id={product.product_id}
                  />
                </div>
              ))
              : <div className="no-product">No Product found!!! </div>
        }
          </div>
        </section>
          { this.props.totalProduct > this.state.limit &&
            <div className="pagination-section">
              <Pagination
                currentPage={ this.state.currentPage }
                pageCount={ totalPages }
                limit={ this.state.limit }
                onPageChange={ this.onPageChange }
              />
          </div>
          }
        <section className="popular-product">
        { isLoading
            ? <div>Loading----</div>
            : products && products.length > 0 && products.slice(8,12).map(product => (
            <div className="card" key={product.product_id}>
              <ProductCard
                title={product.name}
                price={product.price}
                img={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
                id={product.product_id}
              />
            </div>
          ))}
        </section>
        <section className="productpage__subfooter">
          <h1>Converse</h1>
          <p>Explore styles tough enough to <br />handle all your workouts</p>
          <Button
            name="Shop Brand"
            classes="btn__secondary"
            size="medium"
          />
        </section>
        <Footer hasSubFooter={true} />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  products: state.products.data,
  isLoading: state.products.isLoading,
  totalProduct: state.products.totalProduct,
  categories: state.categories.data
});

export const mapDispatchToProps = dispatch => ({
  getProducts: (limit, page) => dispatch(getProducts(limit, page)),
  getProductsByCategory: (limit, categoryId, page) => dispatch(getProductsByCategory(limit, categoryId, page)),
  getProductsByDepartment: (limit, productId, page) => dispatch(getProductsByDepartment(limit, productId, page)),
  getCategoriesInDepartment: (departmentId) => dispatch(getCategoriesInDepartment(departmentId)),
  getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
