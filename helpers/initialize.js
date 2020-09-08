console.log('initializing data');
const env = require('dotenv');
const mongoose = require('mongoose');
const RecipientModel = require('../models/Recipient');
const CampaignModel = require('../models/Campaign');
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
    populateDummyRecipient().then((recipientList) => {

        populateDummyCampaigns(recipientList).then(() => {
            console.log('Dummy data populated');
            process.exit(0);
        }).catch((error) => {
            console.log("Populate dummy campaigns failed:", error);
            process.exit(1);
        });
    }).catch((error) => {
        console.log("Populate dummy recipients failed:", error);
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
                RecipientModel.create(DUMMY_DATA.recipient).then((recipientInserted) => {
                    let recipientList = [];
                    recipientInserted.map(ri => recipientList.push(ri._id));
                    resolve(recipientList);
                }).catch((error) => reject(error));
            }
        }).catch((err) => reject(err));
    })
}

function populateDummyCampaigns(recipientList) {
    return new Promise((resolve, reject) => {
        CampaignModel.findOne({}).then((campaignFound) => {
            if (campaignFound) {
                resolve(0);
            } else {
                let DUMMY_CAMPAIGN = DUMMY_DATA.campaign;
                DUMMY_CAMPAIGN.map(DC => DC.recipients = []);
                let inity = 0;
                let recipientCounter = 5;
                let now = new Date();

                for (let x=0 ; x<2 ; x++) {
                    if (x === 1) {
                        inity = 5;
                        recipientCounter = 10;
                    }
                    for (inity ; inity<recipientCounter ; inity++) {
                        DUMMY_CAMPAIGN[x].recipients.push({'_id': recipientList[inity]});
                        DUMMY_CAMPAIGN[x].start = {
                            time: now,
                            offset: now.getTimezoneOffset()
                        };
                    }
                }
                CampaignModel.create(DUMMY_CAMPAIGN).then(() => {
                    resolve(0);
                }).catch((error) => reject(error));
            }
        }).catch((err) => reject(err));
    })
}