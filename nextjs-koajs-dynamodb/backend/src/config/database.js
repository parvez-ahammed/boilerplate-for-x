// configuration for database connection
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  apiVersion: '1'
});

module.exports = { client };