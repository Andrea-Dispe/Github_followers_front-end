const axios = require("axios");
const stringify = require('json-stringify-safe');

exports.getGithubFollowers = function (req, res) {
  try {
    axios({
      method: "get",
      url: "https://api.github.com/users/mosh-hamedani/followers",
    })
    .then(function (response) {

      const circularObj = {};
      circularObj.circularRef = circularObj;
      circularObj.list = [circularObj, circularObj];
      // console.log(stringify(circularObj, null, 2));
      res.send(JSON.parse(stringify(response.data)))
      console.log(JSON.parse(stringify(response)))
    });
  } catch (error) {
    console.error(error);
  }
};
