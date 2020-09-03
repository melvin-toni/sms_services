const CronJob = require('cron').CronJob;
const fetch = require("node-fetch");
const CampaignModel = require('../models/Campaign');
const { success, failed } = require("../helpers/utilities");

exports.initSchedule = (req, res) => {

    var today = new Date();
    var tomorrow = new Date();
    // CampaignModel.find({}).then((campaignFound) => {
        // let sendParam = {
        //     campaignFound
        // }
        sendSMS(res)
    // }).catch((error) => {
        // failed(req, res, error);
    // })
    // var job = new CronJob('* * * * * *', function() {
    //     console.log('You will see this message every second');
    // }, null, true, 'Asia/Kuala_Lumpur');
    // job.start();
};

async function sendSMS(res) {
    let data = {
		'dnis': '60111111111,6211111111',
		'message': 'Testing OK'
	};

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
 
        const response = await fetch(`http://kr8tif.lawaapp.com:1338/api`, options)
        const responseJson = await response.json();
        console.log(responseJson);
    } catch(error) {
        console.log(error)
    }
    
    // CampaignModel.find({}).then(() => {

    // }).catch((error) => {
    //     failed(req, res, error);
    // })
}