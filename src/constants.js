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
      RECEIVE_COL_INFO: null,
      UPDATE_CHART_TYPE: null
    }),
    Panel: scopedKeyMirror("Panel", {
      SET_INITIAL_VALUES: null,
      UPDATE_FILTERS: null,
      UPDATE_MEASUREMENT: null,
      UPDATE_AGGREGATOR: null,
      CREATE_FILTER: null,
      DELETE_FILTER: null,
      UPDATE_FILTER_COL: null,
      UPDATE_FILTER_WHERE: null,
      UPDATE_FILTER_VALUE: null,
      SUBMIT_FORM: null
    }),
  },

  CHANGE_EVENT: "change",
  API: {
    root: "//docker.yoctol.com/api/"
  },

};
