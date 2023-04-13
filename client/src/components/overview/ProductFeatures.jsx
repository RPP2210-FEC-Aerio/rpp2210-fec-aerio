import React from 'react';

const ProductFeatures = ( { features } ) => {

  // Replace count with the index ***
  // Actually, replace all of this with what is below ***
  let count = 0;
  const featuresList = features.map((feature => {
    count++;
    return (
      <div className="product_feature">
        <img className="feature_checkmark" src="https://cdn-icons-png.flaticon.com/512/9675/9675140.png" alt="Product Feature" height="26px" width="26px"></img>
        <span key={count} className="product_feature_text" data-testid={`feature-${count}`}>{feature.value} {feature.feature}</span><br></br>
      </div>
    );
  }))

  return (
    <div className="overview_product_features">
      <div>
        {featuresList}
        {/* {features.map((feature, count) =>
          <div className="product_feature" key={count}>
            <img className="feature_checkmark" src="https://cdn-icons-png.flaticon.com/512/9675/9675140.png" alt="Product Feature" height="26px" width="26px"></img>
            <span className="product_feature_text" data-testid={`feature-${count}`}>{feature.value} {feature.feature}</span><br></br>
          </div>
       )} */}
      </div>
    </div>
  )
}

export default ProductFeatures;
