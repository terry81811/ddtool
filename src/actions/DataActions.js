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

  getStatInfo(statId) {
    WebAPIUtils.StatInfos.get(statId).then((statInfo) => {
      console.log(statInfo);

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
        humanName: "消費卡別default",
        grouper: {
          type: "float",
          grouperId: 12,
          interval: 100,
//          custom: [
//            [0.5, 1],
//            [1, 2],
//            [2, 6]
//          ] //or null when categorical
        },
        filters: [
          {
            colId: 4,
            humanName: "訂單金額",
            where: "gt",
            value: "2000"
          },
          {
            colId: 4,
            humanName: "訂單金額",
            where: "lt",
            value: "10000"
          },
          {
            colId: 13,
            humanName: "性別",
            where: "eq",
            value: "F"
          },
        ],
        measurement: {
          colId: 15,
          humanName: "子女數",
          aggregator: "avg"
        },
        stat: {
          general: {
            values: [
              {label: "100-200", value: 350},
              {label: "200-300", value: 400},
              {label: "300-400", value: 300},
              {label: "400-500", value: 250},
              {label: "500-600", value: 550},
              {label: "600-700", value: 150}
            ],
          },
          numerical: {
            min: [121, 124, 125, 128, 131, 101, 99, 72, 180],
            max: [672, 670, 667, 663, 661, 590, 712, 800, 598],
            sum: 1250000,
            mean: 420,
            std: 33,
          },
        }
      };
      this.dispatch(
        DataActTypes.RECEIVE_COL_INFO,
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

  },
  updateChartType(chartType) {
    this.dispatch(
      DataActTypes.UPDATE_CHART_TYPE,
      {chartType: chartType}
    );
  },

};

module.exports = DataActions;
