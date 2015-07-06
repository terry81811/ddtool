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
//    WebAPIUtils.ColInfos.get(colId).then((statInfo) => {
//      console.log(statInfo);
//      this.dispatch(
//        DataActTypes.RECEIVE_COL_INFO,
//        {statInfo: statInfo}
//      );
//    }).catch((err) => {
//      console.log("Got an error: " + err);
//    });

      let statInfo = {
        id: 12,
        humanName: "消費卡別",
        codeName: "col_11",
        contentType: "STRING",
        colDefinition: " ",
        type: "DefaultCol",
        paramsPositions: [ ],
        tableSetting: [ ],
        statsTrueCount: 1,
        statsFalseCount: null,
        statsMin: null,
        statsMax: null,
        statsUniqCount: null,
        statsValMostFreq: null,
        statsNumMostFreq: null,
        targetTable: {
          id: 1,
          humanName: "aegis",
          codeName: "aegis",
          filter: " ",
          groupers: [ ],
          parentTableId: null
        }
      };
      this.dispatch(
        DataActTypes.RECEIVE_COL_INFO,
        {statInfo: statInfo}
      );
  },

};

module.exports = DataActions;
