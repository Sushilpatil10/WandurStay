const mongoose =require("mongoose");
const initData = require("./data.js");
const Listing =require("../models/listing.js");

async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
.then(()=>{
    console.log("Connected to DB WanderLust");
})
.catch((err)=>{
    console.log(err);
})

const initDB =async ()=>{
    await Listing.deleteMany({});
   initData.data= initData.data.map((obj)=>({...obj,owner:"685bf1e3e61ee347b4b939d1"}));
    await Listing.insertMany(initData.data);
    console.log("Data was intialized")
};

initDB();