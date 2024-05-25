const reponseVerdicts = require('../constants/response.js');
const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.error(error);
        ctx.status = error.status || 500;
        ctx.body = {
            error: {
                message: error.message || reponseVerdicts.INTERNAL_SERVER_ERROR,
            },
        };
    }
};

module.exports = errorHandler;
