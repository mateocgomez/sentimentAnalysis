"use strict";
const AWS = require("aws-sdk");
const comprehend = new AWS.Comprehend({ apiVersion: "2017-11-27" });
module.exports.analyze = async (event) => {
  let body = JSON.parse(event.body);
  const params = {
    LanguageCode: "es",
    Text: body.text, 
  };
  return Promise.resolve(comprehend.detectSentiment(params).promise()).then(
    function (data) {
      console.log(data);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: (JSON.stringify(data)),
      };
    }
  );
};
