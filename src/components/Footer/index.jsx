/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

// style
import './Footer.scss';

const Footer = () => (
  <div className="footer">
  <div>
    <h2 className="footer__title">Questions</h2>
    <ul>
      <li><a href="#">Help</a></li>
      <li><a href="#">Track Order</a></li>
      <li><a href="#">Returns</a></li>
    </ul>
  </div>
  <div>
    <h2 className="footer__title">What's in store</h2>
    <ul>
      <li><a href="#">Women</a></li>
      <li><a href="#">Men</a></li>
      <li><a href="#">Product A-Z</a></li>
      <li><a href="#">Buy Gift Vouchers</a></li>
    </ul>
  </div>
  <div>
    <h2 className="footer__title">Follow Us</h2>
    <ul>
      <li><a href="#">Facebook</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">YouTube</a></li>
    </ul>
  </div>
  <div>
    <span className="copyright">@2019 shopmate ltd</span>
  </div>
  </div>
)

export default Footer;
