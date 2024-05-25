const { getCurrentTimeWithSeconds } = require('../utils/utils.js');
const {ABOUT} = require('../data.js');

const getAboutDetails = async(ctx) => {
    const requestInboundTime = getCurrentTimeWithSeconds();
    
    ctx.body = {
        requestInboundTime: requestInboundTime,
        requestOutboundTime: getCurrentTimeWithSeconds(),
        responseVerdict : "Success",
        data : {
            about: ABOUT,
        },
    };
    ctx.status = 200;
};

module.exports = {
    getAboutDetails,
};