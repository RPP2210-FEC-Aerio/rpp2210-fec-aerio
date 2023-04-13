import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ExpandedGallery from './ExpandedGallery.jsx';

const ProductGallery = ( { productPhotos, productName, styleName } ) => {

  const [mainImage, setMainImage] = useState('');
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [topThumbnailIndex, setTopThumbnailIndex] = useState(0);
  const [bottomThumbnailIndex, setBottomThumbnailIndex] = useState(7);
  const [showExpanded, setShowExpanded] = useState(false);

  useEffect(() => {
    setMainImage(productPhotos[mainImageIndex].url);
  }, [productPhotos]);

  const handleThumbnailClick = (e, expandedId) => {
    e.preventDefault();
    if (expandedId) {
      setMainImage(productPhotos[expandedId].url);
      setMainImageIndex(expandedId);
    } else {
      let thumbnail_index = parseInt(e.target.id);
      setMainImage(productPhotos[thumbnail_index].url);
      setMainImageIndex(thumbnail_index);
    }
  }

  const imageDescription = productName.concat(', ', styleName);

  let count = -1;

  const thunbnailList = productPhotos.map(photo => {
    count++;
    let thumbnailDescription = imageDescription.concat(' Image #', count);
    if (photo.url === mainImage) {
      return (
        <img className="selected_gallery_thumbnail" key={count} id={count} data-testid={`galleryThumbnailImage${count}`} src={photo.thumbnail_url} alt={thumbnailDescription} width="100px" onClick={handleThumbnailClick}></img>
      );
    } else {
      return (
        <img className="gallery_thumbnail" key={count} id={count} data-testid={`galleryThumbnailImage${count}`} src={photo.thumbnail_url} alt={thumbnailDescription} width="100px" onClick={handleThumbnailClick}></img>
      );
    }
  });

  const handleMainImageClick = (e) => {
    e.preventDefault();
    setShowExpanded(true);
  }

  const handleMainPreviousClick = (e) => {
    e.preventDefault();
    // Main image index and main image are getting the same thing, could condense ***
    setMainImage(productPhotos[mainImageIndex - 1].url);
    setMainImageIndex(mainImageIndex - 1);
    if (mainImageIndex - 1 < topThumbnailIndex) {
      setTopThumbnailIndex(topThumbnailIndex - 1);
      setBottomThumbnailIndex(bottomThumbnailIndex - 1);
    }
  }

  const handleMainNextClick = (e) => {
    e.preventDefault();
    setMainImage(productPhotos[mainImageIndex + 1].url);
    setMainImageIndex(mainImageIndex + 1);
    if (mainImageIndex === bottomThumbnailIndex - 1) {
      setTopThumbnailIndex(topThumbnailIndex + 1);
      setBottomThumbnailIndex(bottomThumbnailIndex + 1);
    }
  }

  const handleThumbnailPreviousClick = (e) => {
    e.preventDefault();
    setTopThumbnailIndex(topThumbnailIndex - 1);
    setBottomThumbnailIndex(bottomThumbnailIndex - 1);
  }

  const handleThumbnailNextClick = (e) => {
    e.preventDefault();
    setTopThumbnailIndex(topThumbnailIndex + 1);
    setBottomThumbnailIndex(bottomThumbnailIndex + 1);
  }

  // Below, can change src to productPhotos[mainImageIndex==0? 0 : mainImageIndex - 1].url
    // Would need to check mainImageIndex for 0 prior to this (className = mainImage line) OR convert the src to the ternary condition
  // To Research -- CSS variables, to reduce the number of states at a time
  return (
    <div className="gallery">
      {mainImageIndex > 0 ? <img className="main_image_previous" onClick={handleMainPreviousClick} src="https://cdn-icons-png.flaticon.com/512/2732/2732652.png" alt="Previous"></img> : null}
      {mainImageIndex < thunbnailList.length - 1 ? <img className="main_image_next" onClick={handleMainNextClick} src="https://cdn-icons-png.flaticon.com/512/2732/2732652.png" alt="Next"></img> : null}
      <img className="mainImage" data-testid="mainImage" src={productPhotos[mainImageIndex==0? 0 : mainImageIndex - 1].url} alt={imageDescription} height="750" width="750" onClick={handleMainImageClick}></img>
      {/* <img className="mainImage" data-testid="mainImage" src={mainImage} alt={imageDescription} height="750" width="750" onClick={handleMainImageClick}></img> */}
      {showExpanded && createPortal(
        <ExpandedGallery mainImage={mainImage} imageDescription={imageDescription} mainImageIndex={mainImageIndex} productPhotos={productPhotos} handleMainPreviousClick={handleMainPreviousClick} handleMainNextClick={handleMainNextClick} handleThumbnailClick={handleThumbnailClick} setShowExpanded={setShowExpanded} onClose={() => setShowExpanded(false)} />,
        document.getElementById("overview_top")
      )}
      <div className="thumbnailGallery">
        {topThumbnailIndex > 0 ? <img className="thumbnail_gallery_previous" onClick={handleThumbnailPreviousClick} src="https://cdn-icons-png.flaticon.com/512/2732/2732661.png" alt="Up"></img> : null}
        <div className="thumbnailCarousel">{thunbnailList.slice(topThumbnailIndex, bottomThumbnailIndex)}</div>
        {thunbnailList.length > 7 && bottomThumbnailIndex < thunbnailList.length ? <img className="thumbnail_gallery_next" onClick={handleThumbnailNextClick} src="https://cdn-icons-png.flaticon.com/512/2732/2732661.png" alt="Down"></img> : null}
      </div>
    </div>
  )
}

export default ProductGallery;
