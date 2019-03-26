const https = require('https');
const { AIRTABLE_API_KEY } = process.env;

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
          var { records } = JSON.parse(body);
          resolve(records);
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
  console.log('Experiences', experiences)
  const testimonials = await getDatabase('Testimonials')
  console.log('Testimonials', testimonials)
  const tools = await getDatabase('Tools')
  console.log('Tools', tools)
  return {
    statusCode: 200,
    body: JSON.stringify({ experiences, testimonials, tools })
  }
}