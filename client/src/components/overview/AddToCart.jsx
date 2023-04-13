import React, { useState, useEffect, useRef } from 'react';
import SizeSelector from './SizeSelector.jsx';
import { DetermineAction } from '../relatedProducts/CardButtons.jsx';
const axios = require('axios');

const AddToCart = ( { productDetails, selectedStyle, productStyles, myOutfit, setMyOutfit, setOutfitCards, setProductId, updateSelectedProduct, inOutfit, setInOutfit } ) => {

  const [selectedSize, setSelectedSize] = useState('');
  const [alertSize, setAlertSize] = useState(false);
  const [alertSuccessfulAdd, setAlertSuccessfulAdd] = useState(false);
  // Can use the selectedQuantity value to render the quantityDefaultValue code, as well as pass to the helper function to render the quantity options ***
    // This would set it to one helper function and one state to get the quantity array and handle conditional rendering
  const [selectedQuantity, setSelectedQuantity] = useState('Starting Quantity');
  const [quantityOptions, setQuantityOptions] = useState([]);
  // Might be able to replace this with props -- If I have the number of each size; if count of all sizes is 0, render default (-); otherwise, render the option (1)
    // Since I only use this code once ***
  const [quantityDefaultValue, setQuantityDefaultValue] = useState(<option value="Starting Quantity" disabled>-</option>);

  const ref = useRef(null);

  let possibleQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    if (alertSuccessfulAdd) {
      setTimeout(() => setAlertSuccessfulAdd(false), 2000);
    }
  }, [alertSize, alertSuccessfulAdd, inOutfit]);

  const setSelectedStyleData = (quantityStart, selectedSkuIndex, styleSkuData) => {
    if (quantityStart === 0) {
      setSelectedQuantity(0);
    } else {
      setSelectedSize(styleSkuData[selectedSkuIndex][0]);
      setSelectedQuantity(1);
      let sizeStock = styleSkuData[selectedSkuIndex][1];
        // If I can pass the # of each size, I could avoid hard-coding this to render the options
        // Could make a helper function (like with size) to map only as long as we need to for the selected size ***
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
          return axios.get('./cart');
        })
        .then(cartData => {
          console.log('Your Cart: ', cartData.data);
          setAlertSuccessfulAdd(true);
        })
        .catch(error => {
          console.error('Error adding product to cart!');
        });
    } else {
      setAlertSize(true);
      ref.current.focus();
    }
  }

  const handleAddToOutfitClick = (e) => {
    e.preventDefault();
    DetermineAction(productDetails.id, setMyOutfit, setOutfitCards, setProductId, updateSelectedProduct, inOutfit, setInOutfit, myOutfit);
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
        {selectedQuantity === 0 ? null : <button data-testid="addToCartButton" className="addToCartButton" onClick={handleAddToCartClick}>Add to Cart<span className="addToCartPlus">+</span></button>}
        <button data-testid="addToOutfitButton" className="addToOutfitButton" onClick={handleAddToOutfitClick}>
          {inOutfit ? <span className="addedToOutfit">&#9733;</span> : <span className="notAddedToOutfit">&#9734;</span>}
        </button>
      </div>
    </div>
  )
}

export default AddToCart;
