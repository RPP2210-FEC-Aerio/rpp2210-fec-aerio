import React, { useState } from 'react';

const ExpandedGallery = ( { mainImage, imageDescription, mainImageIndex, productPhotos, handleMainPreviousClick, handleMainNextClick, handleThumbnailClick, setShowExpanded } ) => {

  // Likely do not need mainImage passed here -- can base everything off mainImageIndex ***

  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState({});
  const [transform, setTransform] = useState('none');
  const [cursor, setCursor] = useState('crosshair');

  let count = -1;

  const expandedThunbnailList = productPhotos.map(photo => {
    count++;
    let thumbnailDescription = imageDescription.concat(' Image #', count);
    if (photo.url === mainImage) {
      return (
        <img className="expanded_selected_gallery_thumbnail" key={count} id={count} data-testid={`expandedGalleryThumbnailImage${count}`} src="https://cdn-icons-png.flaticon.com/512/649/649768.png" alt={thumbnailDescription} onClick={handleThumbnailClick}></img>
      );
    } else {
      return (
        <img className="expanded_gallery_thumbnail" key={count} id={count} data-testid={`expandedGalleryThumbnailImage${count}`} src="https://cdn-icons-png.flaticon.com/512/649/649768.png" alt={thumbnailDescription} onClick={handleThumbnailClick}></img>
      );
    }
  });

  const handleCloseClick = (e) => {
    e.preventDefault();
    setShowExpanded(false);
    setIsZoomed(false);
  }

  const handleExpandedMainImageClick = (e) => {
    e.preventDefault();
    if (!isZoomed) {
      setTransform('scale(2.5)');
      setCursor('zoom-out');
      setIsZoomed(true);
    } else {
      setTransform('none');
      setCursor('crosshair');
      setIsZoomed(false);
    }
  }

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isZoomed) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      setTransformOrigin(`${x}px ${y}px`);
    }
  }

  return (
    <div id="expanded_gallery">
      <img className="expanded_gallery_mainImage" src={mainImage} alt={imageDescription} style={{transform: transform, transformOrigin: transformOrigin, cursor: cursor}} onMouseMove={handleMouseMove} onClick={handleExpandedMainImageClick}></img>
      {isZoomed ? null : <div className="expandedThumbnailGallery">{expandedThunbnailList}</div>}
      {mainImageIndex > 0 && !isZoomed ? <img className="expanded_main_image_previous" onClick={handleMainPreviousClick} src="https://cdn-icons-png.flaticon.com/512/2732/2732652.png" alt="Previous"></img> : null}
      {mainImageIndex < productPhotos.length - 1 && !isZoomed ? <img className="expanded_main_image_next" onClick={handleMainNextClick} src="https://cdn-icons-png.flaticon.com/512/2732/2732652.png" alt="Next"></img> : null}
      {isZoomed ? null : <img className="expanded_gallery_close" src="https://cdn-icons-png.flaticon.com/512/607/607863.png" alt="Close" onClick={handleCloseClick}></img>}
    </div>
  )
}

export default ExpandedGallery;
