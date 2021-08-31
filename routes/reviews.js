const express = require ('express');
const router= express.Router({mergeParams: true});

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const{validateReview , isLoggedIn, isReviewAuthor} = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const reviews = require('../controllers/reviews');



router.post('/', isLoggedIn , catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn ,isReviewAuthor,catchAsync(reviews.deleteReview));

module.exports = router;
