const Koa = require('koa');
const {koaBody} = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes/routes');
const dotEnv = require('dotenv');
const errorHandler = require('./handler/error');
const responseHandler = require('./handler/response');


// Load environment variables
dotEnv.config();
// Create a new Koa application and setup middllewares
const app = new Koa();

app.use(cors());                                        // Enable CORS for all routes
app.use(errorHandler);
app.use(responseHandler());
app.use(koaBody({includeUnparsed: true}));
app.use(router.routes())
app.use(router.allowedMethods());

// Start the server
app.listen(process.env.PORT || 8080 , () => {
    console.log('Server is running on port 8080');
});
