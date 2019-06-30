/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

// component
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';

// style
import './FooterTwo.scss';

const FooterTwo = ({ color, hasSubFooter}) => (
  <div className="footer-two">
    { hasSubFooter &&
      <section className="footer-two__subscribe">
        <h1>SUBSCRIBE FOR SHOP NEWS, UPDATES AND SPECIAL OFFERS</h1>
        <div className="footer-two__subscribe--form">
          <InputBox
            type="text"
            placeholder="Your e-mail here"
            hasIcon={true}
            iconClass="fa fa-envelope fa-2x"
            name="email"
            size="medium"
          />
          <Button
            name="subscribe"
            classes="btn__primary"
          />
        </div>
      </section>
   }
    <section className={`footer-two__footer ${color}`}>
    <ul>
      <li><a href="#">Women</a></li>
      <li><a href="#">Men</a></li>
      <li><a href="#">Kids</a></li>
      <li><a href="#">Shoes</a></li>
      <li><a href="#">Brands</a></li>
    </ul>
    <div className="footer-two__socail-links mtm">
      <span><a href="#"><i className="fa fa-instagram fa-3x"></i></a></span>
      <span><a href="#"><i className="fa fa-pinterest fa-3x"></i></a></span>
      <span><a href="#"><i className="fa fa-twitter fa-3x"></i></a></span>
      <span><a href="#"><i className="fa fa-facebook-f fa-3x"></i></a></span>
    </div>
    <div className="footer-two__privacy mtm">
      ©2019 shopmate Ltd  •  Contact  • Privacy policy
    </div>
    </section>
  </div>
)

export default FooterTwo;
