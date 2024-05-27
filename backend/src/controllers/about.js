const { getCurrentTimeWithSeconds } = require('../utils/utils.js');
const { getAboutById} = require('../models/about.js');

const getAboutDetails = async(ctx) => {
    const requestInboundTime = getCurrentTimeWithSeconds();
    const data = await getAboutById();
    
    
    ctx.body = {
        requestInboundTime: requestInboundTime,
        requestOutboundTime: getCurrentTimeWithSeconds(),
        responseVerdict : "Success",
        data : {
            about: data,
        },
    };
    
    ctx.status = 200;
};

module.exports = {
    getAboutDetails,
};