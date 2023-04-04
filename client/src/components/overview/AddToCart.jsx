import React, { useState, useEffect, useRef } from 'react';
import SizeSelector from './SizeSelector.jsx';
const axios = require('axios');

const AddToCart = ( { productDetails, selectedStyle, productStyles, myOutfit, setMyOutfit } ) => {

  const [selectedSize, setSelectedSize] = useState('');
  const [alertSize, setAlertSize] = useState(false);
  const [alertSuccessfulAdd, setAlertSuccessfulAdd] = useState(false);
  // CHANGE STARTING QUANTITY TO 0, for addToCartButton testing
  const [selectedQuantity, setSelectedQuantity] = useState('Starting Quantity');
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [quantityDefaultValue, setQuantityDefaultValue] = useState(<option value="Starting Quantity" disabled>-</option>);

  // Potential solution -- sync w/ Sarah***
  const [inOutfit, setInOutfit] = useState(false);

  const ref = useRef(null);

  let possibleQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    if (alertSuccessfulAdd) {
      setTimeout(() => setAlertSuccessfulAdd(false), 2000);
    }
  }, [alertSize, alertSuccessfulAdd, inOutfit]);

  useEffect(() => {
    setInOutfit(false);
  }, [productDetails]);

  const setSelectedStyleData = (quantityStart, selectedSkuIndex, styleSkuData) => {
    if (quantityStart === 0) {
      setSelectedQuantity(0);
    } else {
      setSelectedSize(styleSkuData[selectedSkuIndex][0]);
      setSelectedQuantity(1);
      let sizeStock = styleSkuData[selectedSkuIndex][1];
        setQuantityOptions(possibleQuantities.map(quantity => {
          if (quantity <= sizeStock) {
            return (
              <option key={quantity} value={quantity}>{quantity}</option>
            )
          }
        }));
      setAlertSize(false);
    }
  }

  const handleQuantityChange = (e) => {
    e.preventDefault();
    setSelectedQuantity(e.target.value);
  }

  const handleAddToCartClick = (e) => {
    // As per HelpDesk -- Known API bug: Count on a GET to /cart is the number of times the SKU has been added, NOT the total quantity added
    e.preventDefault();
    if (selectedSize.length > 0 && selectedQuantity > 0) {
      axios.post('/cart', {
        sku_id: selectedSize,
        count: selectedQuantity
      })
        .then(success => {
          // Refactor if time -- send the user some sort of visual to let them know it's been added
          console.log('Item successfully added to cart!');
          return axios.get('./cart');
        })
        .then(cartData => {
          console.log('Cart data in addToCart: ', cartData.data);
        })
        .catch(error => {
          console.error('Error adding product to cart!');
        });
        setAlertSuccessfulAdd(true);
    } else {
      setAlertSize(true);
      ref.current.focus();
    }
  }

  // Sync with Sarah to see if we can import a function from cardButtons.jsx ***
  const handleAddToOutfitClick = (e) => {
    e.preventDefault();
    console.log('Add to Outfit Clicked! Current product id: ', productDetails.id);
    console.log('My Outfit: ', myOutfit);
    setInOutfit(true);
    // let currentOutfitList = JSON.parse(localStorage.getItem("outfitList"));
  }

  return (
    <div className="overview_addToCart">
      {alertSize ? <div className="size_selector_alert">Please select size</div> : alertSuccessfulAdd ? <div className="successful_add_alert">Item added to cart!</div> : <div className="size_selector_alert"></div>}
      <div className="addToCart_top">
        <div data-testid="sizeSelector" className="size_selector">
          <SizeSelector ref={ref} selectedStyle={selectedStyle} setSelectedStyleData={setSelectedStyleData} setSelectedQuantity={setSelectedQuantity}/>
        </div>
        <div data-testid="quantitySelector" className="quantity_selector">
          <select value={selectedQuantity} className="quantity_selector_dropdown" onChange={handleQuantityChange}>
            {quantityDefaultValue}
            {quantityOptions}
          </select>
        </div>
      </div>
      <div className="addToCart_bottom">
        {selectedQuantity === 0 ? null : <button data-testid="addToCartButton" className="addToCartButton" onClick={handleAddToCartClick}>Add to Cart</button>}
        <button data-testid="addToOutfitButton" className="addToOutfitButton" onClick={handleAddToOutfitClick}>
          {inOutfit ? <img className="addToOutfitIcon" src="https://img.icons8.com/ios-filled/256/christmas-star.png" alt="In My Outfit" width="35px" height="35px"></img> : <img className="addToOutfitIcon" src="https://img.icons8.com/ios/256/christmas-star.png" alt="Add to Outfit" width="35px" height="35px"></img>}
        </button>
      </div>
    </div>
  )
}

export default AddToCart;

// BUTTON SOURCES
// Unfilled Star: https://icons8.com/icon/2549/christmas-star
// Filled Star: https://icons8.com/icon/10159/christmas-star

// BUTTON SRCs TO USE
// Unfilled Star: https://img.icons8.com/ios/256/christmas-star.png
// Filled Star: https://img.icons8.com/ios-filled/256/christmas-star.png