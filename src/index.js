import middy from '@middy/core';
import httpRouterHandler from '@middy/http-router';
import { routes } from './routes/routes.js';

const handler = middy()
    .handler(httpRouterHandler(routes));
    
export { handler };