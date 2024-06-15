import middy from '@middy/core';

import { getCurrentTimeWithSeconds } from '../utils/utils.js';

const getAboutDetails = middy().
    handler(async function (event, context) {
        const requestInboundTime = getCurrentTimeWithSeconds();
        const data = "This is a sample about ID";
        const response = {
            requestInboundTime: requestInboundTime,
            requestOutboundTime: getCurrentTimeWithSeconds(),
            responseVerdict: "Success",
            data: {
                about: data,
            },
        };
        
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    });

export { getAboutDetails };
