# A boiler plate for AWS Lambda using middy

## What is middy?
Middy is a very simple middleware engine that allows you to simplify your AWS Lambda code when using Node.js.

If you have used web frameworks like Express, then you will be familiar with the concepts adopted in Middy and you will be able to get started very quickly.

A middleware engine allows you to focus on the strict business logic of your Lambda and then attach additional common elements like authentication, authorization, validation, serialization, etc. in a modular and reusable way by decorating the main business logic.


## nodemon script for local development

On each file save, the script will build the project and start the local server.

```bash
 nodemon --exec "sam build && sam local start-api"
```