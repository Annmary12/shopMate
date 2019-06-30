// react libraries
import * as React from 'react';
import { Link } from 'react-router-dom';

// components
import Button from 'components/Button';
import InputBox from 'components/InputBox';
import Footer from 'components/Footer';
import Label from 'components/Label';

// asset
import bag from 'assets/images/bag.png';

// style
import './HomePage.scss';

const HomePage = () => (
  <div className="homepage">
    <section className="homepage__header">
      <h2 className="homepage__title">
        Background <span className="italic">and</span><br/> development
      </h2>
      <h4 className="homepage__sub-title">
        Convergent the dictates of the<br/> consumer: background and <br/>development
      </h4>
      <Link to="product-page">
        <Button
          name="Shop Now"
          classes="btn__secondary"
        />
      </Link>
    </section>
    <section className="sub-header">
      <img src={bag} alt="bag" />
      <div className="sub-header__content">
        <h2>Vera Bradley</h2>
        <p>
          Carry the day in style with this extra-large tote crafted in our chic B.B.
          Collection textured PVC. Featuring colorful faux leather trim, this tote offers
          a roomy interior plus just enough perfectly placed pockets to keep smaller items
          organized and easy to find.
        </p>
        <Link to="product-page">
          <Button
            name="Shop Now"
            classes="btn__primary"
          />
        </Link>
      </div>
      <div className="sub-header__label">
        <Label
          name="sale"
          color="cyan"
        />
      </div>
    </section>
    <section className="gallery">
      <div className="box gallery__one">
        <div>
        <h1 className="gallery__one--title">WOW</h1>
        <p>Check <br/> WHAT!</p>
        </div>
      </div>
      <div className="box gallery__two">
        <div>
          <h1 className="gallery__two--title">MEN</h1>
        </div>
      </div>
      <div className="box gallery__three">
        <div className="gallery__three--image" />
        <div className="gallery__three--content">
          <h1>Let the Game begin</h1>
          <p>Registration is on - get ready for the Open</p>
          <Button
            name="Register"
            classes="btn__primary"
          />
        </div>
        <div className="gallery__three--label">
          <Label
            name="pop"
            color="orange"
          />
        </div>
      </div>
    </section>
    <section className="subscription">
      <div className="subscription__content">
        <h1 className="subscription__content--title">10% Discount for your subscription</h1>
        <p>Carry the day in style with this extra-large tote crafted in our<br/> chic B.B. 
          Collection textured PVC. Featuring colorful faux <br/> leather trim, this tote offers 
          a roomy interior.</p>
        <div className="subscription__form">
        <InputBox
          type="text"
          placeholder="Your e-mail here"
          hasIcon={true}
          iconclass="fa fa-envelope fa-2x"
          name="email"
          size="medium"
        />
        <Button
            name="subscribe"
            classes="btn__primary"
          />
        </div>
      </div>
    </section>
    <section>
      <Footer />
    </section>
  </div>
)

export default HomePage;