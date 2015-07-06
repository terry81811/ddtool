"use strict";

const Fluxxor = require("fluxxor");
const Const = require("../constants");
const DataActTypes = Const.ActTypes.Data;

// Keeping these variables outside the PageStore makes them private.
// We surely don"t want others use these variables directly -- this
// makes sure we have proper consistency.
let _colInfos;
let _colInfo;

let DataStore = Fluxxor.createStore({
    initialize: function() {
      _colInfos = [];
      _colInfo = null;
      this.bindActions(
        DataActTypes.RECEIVE_ALL_COL_INFOS, this.onReceiveAllColInfos,
        DataActTypes.RECEIVE_COL_INFO, this.onReceiveColInfo
      );
    },

    getState: function() {
      return {
        colInfos: _colInfos,
        colInfo: _colInfo
      };
    },

    onReceiveAllColInfos: function(payload) {
      _colInfos = payload.colInfos;
      this.emit(Const.CHANGE_EVENT);
    },

    onReceiveColInfo: function(payload) {
      _colInfo = payload.colInfo;
      this.emit(Const.CHANGE_EVENT);
    }

});
module.exports = DataStore;
