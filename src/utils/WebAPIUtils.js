"use strict";

const request = require("superagent/lib/client");
const Const = require("../constants");
const Humps = require("humps");

let asyncGet = function(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res) => {
      if (err !== null) {
        console.log(err);
      }

      res = Humps.camelizeKeys(res);
      if (res.ok) {
        resolve(res.body);
      } else {
        reject(res);
      }
    });
  });
};

let asyncPost = function(url, payload) {
  payload = Humps.decamelizeKeys(payload);
  return new Promise((resolve, reject) => {
    request.post(url).send(payload).end((err, res) => {
      if (err !== null) {
        console.log(err);
      }

      res = Humps.camelizeKeys(res);
      if (res.ok) {
        resolve(res.body);
      } else {
        reject(res);
      }
    });
  });
};

let asyncDelete = function(url) {
  return new Promise((resolve, reject) => {
    request.del(url).end((err, res) => {
      if (err !== null) {
        console.log(err);
      }

      res = Humps.camelizeKeys(res);
      if (res.ok) {
        resolve(res.body);
      } else {
        reject(res);
      }
    });
  });
};

let asyncPut = function(url, payload) {
  payload = Humps.decamelizeKeys(payload);
  // console.log("async put send this");
  // console.log(payload);
  return new Promise((resolve, reject) => {
    request.put(url).send(payload).end((err, res) => {
      if (err !== null) {
        console.log(err);
      }

      res = Humps.camelizeKeys(res);
      if (res.ok) {
        resolve(res.body);
      } else {
        reject(res);
      }
    });
  });
};

// The structure here should correspond to
// backend's resources.
module.exports = {
  ColInfos: {
    getAll() {
      return asyncGet(Const.API.root + "col_infos");
    },
  }
};
