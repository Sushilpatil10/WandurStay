const express =require("express");
const router = express.Router({ mergeParams: true }); 
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLogedIn,isOwner,validateListing} =require("../middleware.js");
const listingController =require("../controllers/listings.js");
const multer =require('multer');
const {storage} =require("../cloudconfig.js");
const upload =multer({storage})


// Index Route  and CREATE Route 
router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(
        isLogedIn,
        upload.single("listing[image]"),
        validateListing,
        
        wrapAsync(listingController.createListing)
    )
 


// NEW Route
router.get("/new",isLogedIn, listingController.renderNewForm);


// SHOW Route: /listings/:id and UPDATE Route and DELETE Route 
router
    .route("/:id")
        .get(wrapAsync(listingController.showListing))
        .put(
            isLogedIn,
            isOwner,
            upload.single("listing[image]"),
            validateListing,
            wrapAsync(listingController.updateListing)
        )
        .delete(
            isLogedIn,
            isOwner, 
            wrapAsync(listingController.destroyListing)
        );     




// EDIT Route: /listings/:id/edit 
router.get("/:id/edit",
    isLogedIn,
    isOwner, 
    wrapAsync(listingController.renderEditForm));     





    

// Catch-all for 404 Not Found: This MUST be the very last route defined.
// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page Not Found!"));
// })

/*  

  throw new TypeError(`Missing parameter name at ${i}: ${DEBUG_URL}`);
  remember ---> You have to solve this error .

*/




module.exports =router  ;
