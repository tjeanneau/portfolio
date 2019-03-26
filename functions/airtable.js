const https = require('https');
const { AIRTABLE_API_KEY } = process.env;

console.log(AIRTABLE_API_KEY);

const getDatabase = async (table) => {
  const url = `https://api.airtable.com/v0/appbxQ4N0x22IeQZW/${table}?view=Online&api_key=${AIRTABLE_API_KEY}`
  return new Promise((resolve, reject) => {
    https.get(url, function(response) {
      // Continuously update stream with data
      var body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {
          // Data reception is done, do whatever with it!
          console.log(body)
          var data = JSON.parse(body);
          console.log(data)
          resolve(data);
      });
      response.on('error', function(e) {
        console.log(e);
        reject(e);
      });
    });
  });
}

exports.handler = async (event, context, callback) => {
  const experiences = await getDatabase('Experiences')
  const testimonials = await getDatabase('Testimonials')
  const tools = await getDatabase('Tools')
  return {
    statusCode: 200,
    body: { experiences, testimonials, tools }
  }
}