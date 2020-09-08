const schedule = require('node-schedule');
const fetch = require("node-fetch");
const momenttz = require('moment-timezone');
const moment = require('moment');
const CampaignModel = require('../models/Campaign');
const { success, failed } = require("../helpers/utilities");

exports.initSchedule = (req, res) => {

    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 8, 0, 0);
    let query = {
        "start.time": {
            "$gte": today, 
            "$lt": tomorrow
        }
    }
    CampaignModel.find(query).sort({'start.time': 1}).then((campaignFound) => {
        setAutoTask(campaignFound);
    }).catch((error) => {
        failed(req, res, error);
    });
        
};

function setAutoTask(campaignFound) {

    const year = campaignFound[0].getFullYear();
    const month = campaignFound[0].getMonth();
    const day = campaignFound[0].getDate();
    const hours = campaignFound[0].getHours();
    const minutes = campaignFound[0].getMinutes();
    var date = new Date(year, month, day, hours, minutes, 0);
    var j = schedule.scheduleJob(date, async function(){
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(res)
            }
     
            const response = await fetch(`http://kr8tif.lawaapp.com:1338/api`, options)
            const responseJson = await response.json();
            console.log(responseJson);
        } catch(error) {
            console.log(error)
        }
    });
}