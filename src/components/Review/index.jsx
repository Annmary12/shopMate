// react libraries
import * as React from 'react';

// third-party library
import StarRatings from 'react-star-ratings';
import moment from 'moment';

// components
import Button from 'components/Button';
import InputBox from 'components/InputBox';

// images
import heartIcon from 'assets/images/icons-heart-red.png';
import commentIcon from 'assets/images/icons-comments-black.png';

const Review = React.forwardRef(({ reviews, onInputReviewChange, onSubmitReview, onRatingChange, initialReview, isLoading}, ref) => (
  <section className="product-review">
    <form className="product-review__form" onSubmit={onSubmitReview} ref={ref}>
      <h1 className="product-review__form-title">Add a review</h1>
      <div className="product-review__form-field">
        <label htmlFor="label">Choose a nickname</label>
        <div className="product-review__form-field--input">
          <InputBox inputType="blocked" handleChange={onInputReviewChange} name="reportAs"/>
        </div>
      </div>
      <div className="product-review__form-field">
        <label htmlFor="label">Your review</label>
        <div className="product-review__form-field--input">
          <InputBox
            inputType="blocked"
            type="textarea"
            name="review"
            bottomLabel="Your review must be at least 50 characters"
            linkContent="Full review guidelines"
            handleChange={onInputReviewChange}
            value={initialReview.review}
          />
        </div>
      </div>
      <div className="product-review__form-field">
        <label htmlFor="label-rating" className="label-rating">Overall rating</label>
        <StarRatings
          starRatedColor="#FFAF30"
          numberOfStars={5}
          changeRating={onRatingChange}
          name='rating'
          starDimension="30px"
          starSpacing="0px"
          rating={parseInt(initialReview.rating)}
        />
      </div>
      <div className="product-review__form-field mts">
        <label></label>
        <Button
          name="submit"
          classes="btn__primary"
          type="submit"
          isLoading={isLoading}
        />
      </div>

    </form>
    <div className="vl mbm mtm"></div>
    <h1 className="product-review__title">Product reviews</h1>
    {reviews && reviews.length >= 1 ?
      reviews.slice(0, 5).map((review, index) => (
        <div key={index}>
          <div className="product-review__content mbm">
            <div className="product-review__rating">
              <StarRatings
                rating={review.rating}
                starRatedColor="#FFAF30"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="0px"
              />

              <p className="product-review__name mtxs">{review.name}</p>
              <p className="product-review__time">{moment(new Date(review.created_on)).fromNow()}</p>
            </div>
            <div className="product-review__description">
              <p>{review.review}</p>
              <div className="mtm icons">
                <span><img src={heartIcon} alt="heart" /> <label htmlFor="like">114</label> </span>
                <span><img src={commentIcon} alt="comment" /> <label htmlFor="comment">13</label> </span>
              </div>
            </div>
          </div>
          <div className="vl mbm"></div>
          </div>
          ))
          :
          <div>
            No Reviews Yet
          </div>
        }
  </section>
  ))

export default Review;
