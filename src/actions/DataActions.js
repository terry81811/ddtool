"use strict";

const Const = require("../constants");

const DataActTypes = Const.ActTypes.Data;

const WebAPIUtils = require("../utils/WebAPIUtils");

let DataActions = {
  getAllColInfos() {
    WebAPIUtils.ColInfos.getAll().then((colInfos) => {
      this.dispatch(
        DataActTypes.RECEIVE_ALL_COL_INFOS,
        {colInfos: colInfos}
      );
    }).catch((err) => {
      console.log("Got an error: " + err);
    });
  },
  getColInfo(colId) {
    WebAPIUtils.ColInfos.get(colId).then((colInfo) => {
      this.dispatch(
        DataActTypes.RECEIVE_COL_INFO,
        {colInfo: colInfo}
      );
    }).catch((err) => {
      console.log("Got an error: " + err);
    });
  },

};

module.exports = DataActions;
