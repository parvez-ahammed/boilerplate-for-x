const responseHandler = () => {
    return async (ctx, next) => {
      ctx.response.ok = (responseSummary, response = {}) => {
        ctx.status = 200;
        ctx.body = { responseSummary, response };
      };
  
      ctx.response.created = (responseSummary, response = {}) => {
        ctx.status = 201;
        ctx.body = { responseSummary, response };
      };
      ctx.response.accepted = (responseSummary, response = {}) => {
        ctx.status = 202;
        ctx.body = { responseSummary, response };
      };

      ctx.response.noContent = () => {
        ctx.status = 204;
        ctx.body = null;
      };

      ctx.response.badRequest = (responseSummary, response = {}) => {
        ctx.status = 400;
        ctx.body = { responseSummary, response };
      };
  
      ctx.response.unauthorized = (responseSummary, response = {}) => {
        ctx.status = 401;
        ctx.body = { responseSummary, response };
      };
  
      ctx.response.forbidden = (responseSummary, response = {}) => {
        ctx.status = 403;
        ctx.body = { responseSummary, response };
      };
  
      ctx.response.notFound = (responseSummary, response = {}) => {
        ctx.status = 404;
        ctx.body = { responseSummary, response };
      };

      ctx.response.conflict = (responseSummary, response = {}) => {
        ctx.status = 409;
        ctx.body = { responseSummary, response };
      };

      ctx.response.unprocessableEntity = (responseSummary, response = {}) => {
        ctx.status = 422;
        ctx.body = { responseSummary, response };
      };

      ctx.response.tooManyRequests = (responseSummary, response = {}) => {
        ctx.status = 429;
        ctx.body = { responseSummary, response };
      };

      ctx.response.internalError = (responseSummary, response = {}) => {
        ctx.status = 500;
        ctx.body = { responseSummary, response };
      };

      ctx.response.notImplemented = (responseSummary, response = {}) => {
        ctx.status = 501;
        ctx.body = { responseSummary, response };
      };

      ctx.response.serviceUnavailable = (responseSummary, response = {}) => {
        ctx.status = 503;
        ctx.body = { responseSummary, response };
      };

      ctx.response.gatewayTimeout = (responseSummary, response = {}) => {
        ctx.status = 504;
        ctx.body = { responseSummary, response };
      };

      ctx.response.custom = (status, responseSummary, response = {}) => {
        ctx.status = status;
        ctx.body = { responseSummary, response };
      };
  
      await next();
    };
  };
  
  module.exports = responseHandler;