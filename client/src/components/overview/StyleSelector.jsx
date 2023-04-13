import React from 'react';

const StyleSelector = ( { selectedStyle, productStyles, updateSelectedStyle } ) => {

  // Do not need to define count here, can simply pass it as the second argument to map (index) -- will auto-increment
  // For clarity, refactor "count" to be "index" ***
  const styleThumbnails = productStyles.map((style, count) => {
    let styleDescription = style.name; // Strike this variable, never used
    if (style.style_id === selectedStyle.style_id) {
      return (
        <div key={count} className="selected_style_thumbnail_cropper">
          <img className="selected_style_icon" src="https://cdn-icons-png.flaticon.com/512/1442/1442912.png" alt="Selected Style"></img>
          <img className="selected_style_thumbnail" data-testid={`selectedStyleThumbnailImage${count}`} id={count} src={style.photos[0].thumbnail_url} alt={style.name} onClick={updateSelectedStyle}></img>
        </div>
      )
    } else {
      return (
        <div key={count} className="style_thumbnail_cropper">
          <img className="style_thumbnail" data-testid={`styleThumbnailImage${count}`} id={count} src={style.photos[0].thumbnail_url} alt={style.name} onClick={updateSelectedStyle}></img>
        </div>
      )
    }
  })

  return (
    <div className="overview_style_selector">
      <div>
        <span data-testid="selectedStyleTitle"><b>{selectedStyle.name.toUpperCase()} > </b></span>
        <span>SELECTED STYLE</span>
      </div>
      <div className="style_selector_thumbnails">
        {styleThumbnails}
      </div>
    </div>
  )
}

export default StyleSelector;
