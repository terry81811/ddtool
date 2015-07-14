"use strict";

const _ = require("lodash");
const Fluxxor = require("fluxxor");
const Const = require("../constants");
const DataActTypes = Const.ActTypes.Data;

// Keeping these variables outside the PageStore makes them private.
// We surely don"t want others use these variables directly -- this
// makes sure we have proper consistency.
let _colInfos;
let _statInfos;
let _statInfo;
let _misc;

let DataStore = Fluxxor.createStore({
    initialize: function() {
      _statInfos = [];
      _colInfos = [];
      _statInfo = null;
      _misc = {
        chartType: "bar"
      };
      this.bindActions(
        DataActTypes.RECEIVE_ALL_STAT_INFOS, this.onReceiveAllStatInfos,
        DataActTypes.RECEIVE_ALL_COL_INFOS, this.onReceiveAllColInfos,
        DataActTypes.RECEIVE_STAT_INFO, this.onReceiveStatInfo,
        DataActTypes.UPDATE_CHART_TYPE, this.onUpdateChartType
      );
    },

    getState: function() {
      return {
        statInfos: _statInfos,
        colInfos: _colInfos,
        statInfo: _statInfo,
        misc: _misc
      };
    },

    onReceiveAllStatInfos: function(payload) {
      console.log("stat:");
      console.log(payload);
      _statInfos = payload.statInfos;
      this.emit(Const.CHANGE_EVENT);
    },

    onReceiveAllColInfos: function(payload) {
      console.log("col:");
      console.log(payload);
      _colInfos = payload.colInfos;
      this.emit(Const.CHANGE_EVENT);
    },

    onReceiveStatInfo: function(payload) {
      _statInfo = payload.statInfo;
      this.emit(Const.CHANGE_EVENT);
    },

    onUpdateChartType: function(payload) {
      _misc.chartType = payload.chartType;
      this.emit(Const.CHANGE_EVENT);
    }

});
module.exports = DataStore;
