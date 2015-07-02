"use strict";

let scopedKeyMirror = function(scope, obj) {
  let rtn = {};
  let key;

  for (key in obj) {
    let scopedKey = `${scope.toUpperCase()}_${key}`;
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    rtn[key] = scopedKey;
  }

  return rtn;
};

module.exports = {
  ActTypes: {
    Data: scopedKeyMirror("DATA", {
      RECEIVE_ALL_COL_INFOS: null,
    }),
  },

  CHANGE_EVENT: "change",
  API: {
    root: "//docker.yoctol.com/api/"
  },

};
