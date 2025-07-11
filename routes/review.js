const express =require("express");
const router = express.Router({ mergeParams: true }); 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review  =require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLogedIn, isreviewAuthor} = require("../middleware.js")
const reviewController =require("../controllers/review.js")

//Post Route for reviews
router.post("/",isLogedIn,validateReview,
    wrapAsync(reviewController.createReview));


// Delete review Route
router.delete("/:reviewId",isLogedIn,isreviewAuthor,
    wrapAsync(reviewController.destroyReview)
);


module.exports =router ;