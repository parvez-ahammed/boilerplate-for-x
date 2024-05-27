// configuration for database connection
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  apiVersion: '2012-08-10'
});

module.exports = { client };