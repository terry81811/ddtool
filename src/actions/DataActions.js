"use strict";

const Const = require("../constants");

const DataActTypes = Const.ActTypes.Data;
const PanelActTypes = Const.ActTypes.Panel;

const WebAPIUtils = require("../utils/WebAPIUtils");

let DataActions = {

 getAllResources() {
   let promiseColInfos = WebAPIUtils.ColInfos.getAll();
   let promiseStatInfos = WebAPIUtils.StatInfos.getAll();//

   Promise.all([promiseStatInfos, promiseColInfos]).then((p) => {
     let statInfos = p[0];
     let colInfos = p[1];
     this.dispatch(
       DataActTypes.RECEIVE_ALL_STAT_INFOS,
       {statInfos: statInfos}
     );
     this.dispatch(
       DataActTypes.RECEIVE_ALL_COL_INFOS,
       {colInfos: colInfos}
     );
   });
 },

  getAllStatInfos() {
    WebAPIUtils.StatInfos.getAll().then((statInfos) => {
      this.dispatch(
        DataActTypes.RECEIVE_ALL_STAT_INFOS,
        {statInfos: statInfos}
      );
    }).catch((err) => {
      console.log("Got an error: " + err);
    });
  },

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

  updateChartType(chartType) {
    this.dispatch(
      DataActTypes.UPDATE_CHART_TYPE,
      {chartType: chartType}
    );
  },

  getStatInfo(statId) {

    console.log("Data action: getStatInfo");
    WebAPIUtils.StatInfos.get(statId).then((statInfo) => {

      this.dispatch(
        DataActTypes.RECEIVE_STAT_INFO,
        {statInfo: statInfo}
      );
      this.dispatch(
        PanelActTypes.SET_INITIAL_VALUES,
        {
          filters: statInfo.filters,
          measurement: statInfo.measurement,
          aggregator: statInfo.measurement.aggregator
        }
      );
    }).catch((err) => {
      console.log("Got an error: " + err);
    });
  },

  clearStatInfo() {
    this.dispatch(
      DataActTypes.CLEAR_STAT_INFO,
      {}
    );
  }

};

module.exports = DataActions;
