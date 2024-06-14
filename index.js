import middy from '@middy/core';
import httpRouterHandler from '@middy/http-router';

const getHandler = middy()
    .handler(async function (event, context) {
        try {
            return {
                statusCode: 200,
                body: JSON.stringify('Hello World!')
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify('The world is ending!')
            };
        }
    })

const routes = [
    { method: 'GET', path: '/hello', handler: getHandler },
]
const handler = middy()
    .handler(httpRouterHandler(routes));
export { handler };