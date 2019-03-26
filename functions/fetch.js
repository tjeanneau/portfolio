import fetch from "node-fetch";

const API_ENDPOINT =
  "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke";

  exports.handler = (event, context, callback) => {
    callback(null, {
      statusCode: 200,
      body: 'No worries, all is working fine!'
    })
  }