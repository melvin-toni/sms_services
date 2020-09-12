const CAMPAIGN_MODEL = require('../models/Campaign');
const { success, failed } = require("../helpers/utilities");

exports.create = (req, res) => {
    const now = new Date();
    let recipientList = []
    
    req.body.recipients.map(recipient => {
        recipientList.push({
            _id: recipient
        });
    });

    let dataCampaign = {
        recipients: recipientList,
        message: req.body.message,
        start: {
            // time: req.body.startTime
            time: now
        }
    }

    CAMPAIGN_MODEL.create(dataCampaign).then((campaignCreated) => {
        success(req, res, campaignCreated);
    }).catch((error) => {
        failed(req, res, error);
    });     
};

exports.readAll = (req, res) => {
    CAMPAIGN_MODEL.create(dataCampaign).then((campaignCreated) => {
        success(req, res, campaignCreated);
    }).catch((error) => {
        failed(req, res, error);
    }); 
}

exports.readOne = (req, res) => {
    CAMPAIGN_MODEL.create(dataCampaign).then((campaignCreated) => {
        success(req, res, campaignCreated);
    }).catch((error) => {
        failed(req, res, error);
    }); 
}

function aggregateReadCampaign() {
    const filter = [
        
    ]
}