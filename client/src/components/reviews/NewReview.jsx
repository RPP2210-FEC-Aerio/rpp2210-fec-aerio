import React, { useState } from 'react';
import axios from 'axios';
import Characteristics from './Characteristics.jsx'

const NewReview = ({reviewsMeta, onClose, productName }) => {

  /* This component will:
    1) Need to control the inputs of each field in their own state
    2) Need to send a post request to reviews
    3) Need data:
      - product name
      - product characteristics
   */

  const [overall, setOverall] = useState('1')
  const [recommend, setRecommend] = useState(false)
  const [characteristics, setCharacteristics] = useState({})
  const [summary, setSummary] = useState('Test Summary')
  const [body, setBody] = useState('Test body')
  const [photos, setPhotos] = useState([])
  const [nickname, setNickname] = useState('Nickname')
  const [email, setEmail] = useState('myemail@email.com')






  var fullReview = {
    product_id: Number(reviewsMeta.product_id),
    rating: overall,
    summary: summary,
    body: body,
    recommend: recommend,
    name: nickname,
    email: email,
    photos: photos,
    characteristics: characteristics
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/reviews', fullReview)
    .then((success) => {console.log('Succesfully added new review')})
    .catch((err) => {console.log('ERROR adding new review', err)})
    onClose();
  }


  const handleChange = (e) => {
    e.preventDefault();
    var input = e.target.value
  }
  return (
    <div data-testid='newReview-1' className="reviews newReview">
      <form onSubmit={handleSubmit}>
        <div>Write Your Review</div>
        <div>About the {productName}</div>
        <div>
          <label>Overall Rating</label>
          <div className="reviews ratingOptions">
            <label>
              1
              <input type="radio" name="star"></input>
            </label>
            <label>
              2
              <input type="radio" name="star"></input>
            </label>
            <label>
              3
              <input type="radio" name="star"></input>
            </label>
            <label>
              4
              <input type="radio" name="star"></input>
            </label>
            <label>
              5
              <input type="radio" name="star"></input>
            </label>
          </div>
        </div>
        <div>
          <label>Do you recommend this product?</label>
          <button>Yes</button>
          <button>No</button>
        </div>
        <div>
          <Characteristics characteristics={reviewsMeta.characteristics}/>
        </div>
        <div>
          <label>Review Summary</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Review Body</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Upload Your Photos</label>
          <input type="text"></input>
        </div>
        <div>
          <label>What is your nickname?</label>
          <input type="text"></input>
        </div>
        <div>
          <label>What is your email?</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Submit Review</label>
          <input type="submit"></input>
        </div>
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  )
}

export default NewReview;