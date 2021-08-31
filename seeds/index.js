const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places , descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db= mongoose.connection;
db.on("error", console.error.bind( console, "connection error"));
db.once("open", ()=>{
    console.log("Database Connected")
})

const sample= array => array[Math.floor(Math.random() * array.length)];

  
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0 ; i<200 ; i++){
        const random1000= Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random() * 20) + 10;
         const camp = new Campground({
             author: '61266e6aebe4a21adc696017',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "sjcuiesieojvperiujgoijgvlmveorguiejgv",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dm7uivked/image/upload/v1630341309/YelpCamp/rwsijvflctfzeguavy6o.jpg',
                  filename: 'YelpCamp/rwsijvflctfzeguavy6o'
                },
                {
                  url: 'https://res.cloudinary.com/dm7uivked/image/upload/v1630341317/YelpCamp/yromzf145stmpfu3kkyc.jpg',
                  filename: 'YelpCamp/yromzf145stmpfu3kkyc'
                }
              ]
            
             })
        await camp.save()


    }
}

seedDB().then( ()=>{
    mongoose.connection.close();
})


