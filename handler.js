'use strict';

const request = require('request');
const queryString = require('querystring');

module.exports.invite = (event, context, callback) => {
  const payload = {
    token: process.env.SLACK_TOKEN,
    email: queryString.parse(event.body).email
  };

  request.post(
    `https://${ process.env.SUB_DOMAIN }.slack.com/api/users.admin.invite`,
    {form: payload},
    function(err, httpResponse, body) {
      if (err) {
        return callback(err);
      }

      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin' : "*"
        },
        body: JSON.stringify(httpResponse)
      };

      callback(null, response);
    }
  )
};
