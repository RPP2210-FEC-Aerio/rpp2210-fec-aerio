import React, { useState, useEffect } from 'react';
import RatingBreakdown from './RatingBreakdown.jsx'
import ReviewList from './ReviewList.jsx'
import NewReview from './NewReview.jsx'
import { RatingCalculator } from '../relatedProducts/helperFunctions.jsx'
import axios from 'axios';

const Reviews = ({ productId, productName, updateAverageRating }) => {

  /*  This Component will need the below from it's parent:
        -) product_id, product name, product characteristics (latter two needed for NewReview)
      This Component will request the below from the API:
        -) Reviews from GET /reviews/
        -) Review Metadata from GET /reviews/meta
      This Component will store the following state:
        -) Reviews
        -) Reviews Metadata
      This Component will send the following state:
        -) Reviews TO ReviewList
        -) Reviews Metadata to RatingBreakdown
      This Component's state can be updated by the following components:
        -) SortOptions (can sort by dropdown)
        -) ReviewTile (can mark as helpful)
        -) **UNSURE RatingBreakdown (can filter for reviews with specific ratings, additive)
        -) KeywordSearch
    Note: Will need to make functions for subsequent calls to getReviews API to filter & sort the results
  */
     // //array of review objects


  const [reviews, setReviews] = useState([])
  const [reviewsMeta, setReviewsMeta] = useState({})
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant')
  const [count, setCount] = useState(1000000)

  const getReviews = (currentCount, currentPage, currentSort) => {
    return axios.get('/reviews', {
      params: {
        product_id: productId,
        count: currentCount,
        page: currentPage,
        sort: currentSort
      }
    })
  }

  const updateReviews = () => {
    getReviews(count, page, sort)
    .then((result) => {
      setReviews(result.data.results);
    })
    .catch((err) => {console.log('Trouble getting reviews from client', err)});
  }


  const sortReviews = (e, option) => {
    e.preventDefault();
    var newSort = e.target.value.toLowerCase()
    setSort(newSort)

  }

  useEffect(() => {
    updateReviews()

    axios.get('/reviews/meta', {
      params: {
        product_id: productId
      }
    })
    .then((result) => {
      setReviewsMeta(result.data);
      var averageRating = RatingCalculator(result.data.ratings)
      updateAverageRating(averageRating)
    })
    .catch((err) => {console.log('Trouble getting reviews meta from client', err)});
  }, [])


  useEffect(() => {
    updateReviews()
  }, [sort])

  return (
    <div data-testid='reviews-1' style={{border: '2px solid red'}}>
      <h1>Reviews!</h1>
      <div className="reviews reviewsMain">
        <RatingBreakdown reviewsMeta={reviewsMeta}/>
        { reviews.length !== 0 ? <ReviewList reviews={reviews} sortReviews={sortReviews} updateReviews={updateReviews} reviewsMeta={reviewsMeta} productName={productName}/> : null}
      </div>
    </div>
  )
}

export default Reviews;