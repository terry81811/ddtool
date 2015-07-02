"use strict";

const Fluxxor = require("fluxxor");
const Const = require("../constants");
const DataActTypes = Const.ActTypes.Data;

// Keeping these variables outside the PageStore makes them private.
// We surely don"t want others use these variables directly -- this
// makes sure we have proper consistency.
let _colInfos;

let DataStore = Fluxxor.createStore({
    initialize: function() {
      _colInfos = [];
      this.bindActions(
        DataActTypes.RECEIVE_ALL_COL_INFOS, this.onReceiveAllColInfos
      );
    },

    getState: function() {
      return {
        colInfos: _colInfos
      };
    },

    onReceiveAllColInfos: function(payload) {
      _colInfos = payload.colInfos;
      this.emit(Const.CHANGE_EVENT);
    }

});
module.exports = DataStore;
