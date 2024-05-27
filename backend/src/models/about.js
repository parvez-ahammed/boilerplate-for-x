
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { client } = require('../config/database');
const TABLE_NAME = 'user';
async function getAboutById(id = 1) {
    const params = {
        TableName: TABLE_NAME,
        Key: marshall({ userId: "1", email: "telltoparvez@gmail.com" })
    };

    const command = new GetItemCommand(params);

    
    try {
        const data = await client.send(command);
        if (data.Item) {
            const item = unmarshall(data.Item);
            return item.about;
        } else {
            throw new Error('Item not found');
        }
    } catch (error) {
        console.error("Unable to read item. Error:", error);
        throw error;
    }
}

module.exports = { getAboutById };