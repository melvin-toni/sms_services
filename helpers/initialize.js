console.log('initializing data');
const env = require('dotenv');
const mongoose = require('mongoose');
const RecipientModel = require('../models/Recipient');
const DUMMY_DATA = require('./DUMMY_DATA');

if (process.env.NODE_ENV === 'production') {
    console.log("production");
    env.config({ path: '.env.production' });
} else {
    console.log("development");
    env.config({ path: '.env.development' });  
}

mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB connection Established');
    populateDummyRecipient().then(() => {
        console.log('Dummy data populated');
        process.exit(0);
    }).catch((error) => {
        console.log("Populate initial user failed:", error);
        process.exit(1);
    });
}).catch((error) => {
    console.log("MongoDB connection err:", error);
    process.exit(1);
});

function populateDummyRecipient() {
    return new Promise((resolve, reject) => {
        RecipientModel.findOne({}).then((recipientFound) => {
            if (recipientFound) {
                resolve(0);
            } else {
                RecipientModel.create(DUMMY_DATA.recipient).then(() => {
                    resolve(0);
                }).catch((error) => reject(error));
            }
        }).catch((err) => reject(err));
    })
}