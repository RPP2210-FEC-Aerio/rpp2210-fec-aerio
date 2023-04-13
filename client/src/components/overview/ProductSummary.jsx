import React, { useState, useEffect, useRef } from 'react';
import StarRating from '../reviews/StarRating.jsx';

const ProductSummary = ( { productDetails, selectedStyle, averageStarRating, totalNumberReviews, reviewsRef } ) => {

  // Clean up by refactoring to the below, conditional rendering based on selectedStyle.sale_price
    // Eliminates memory taken up by productPrice variable
    // Uses className or style for the condition
  let productPrice;
  if (!selectedStyle.sale_price) {
    productPrice = <span>${selectedStyle.original_price}</span>
  } else {
    productPrice =
      <div>
        <span className="product_sale_price" data-testid="product_sale_price"> ${selectedStyle.sale_price}&ensp;</span>
        <span><s>${selectedStyle.original_price}</s></span>
      </div>
  }

  const handleTotalReviewsClick = (e) => {
    e.preventDefault();
    reviewsRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="overview_product_summary">
      {totalNumberReviews > 0 ? <div className="overview_product_rating">
        <StarRating rating={averageStarRating}/>
        <span className="overview_total_reviews" onClick={handleTotalReviewsClick}>Read all {totalNumberReviews} reviews</span></div> : <div className="overview_product_rating_empty"></div>}
      <br></br>
      <span >{productDetails.category.toUpperCase()}</span><br></br>
      <span className="product_summary_title" data-testid="productTitle"><b>{productDetails.name}</b></span><br></br>
      {productPrice}
      {/* <div>
        {!selectedStyle.sale_price && <span className="product_sale_price" data-testid="product_sale_price"> ${selectedStyle.sale_price}&ensp;</span>}
      <span style={!selectedStyle.sale_price ? {"some style" : "somestylevalue"} : {}}>${selectedStyle.original_price}</span>

      </div> */}

    </div>
  )
}

export default ProductSummary;
