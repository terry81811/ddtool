"use strict";

const Fluxxor = require("fluxxor");
const Const = require("../constants");
const PanelActTypes = Const.ActTypes.Panel;

// Keeping these variables outside the PageStore makes them private.
// We surely don"t want others use these variables directly -- this
// makes sure we have proper consistency.
let _filters;
let _measurement;
let _aggregator;

let PanelStore = Fluxxor.createStore({
    initialize: function() {
      _filters = [];
      _measurement = null;
      _aggregator = null;

      this.bindActions(
        PanelActTypes.SET_INITIAL_VALUES, this.onSetInitialValues,
        PanelActTypes.UPDATE_FILTERS, this.onUpdateFilters,
        PanelActTypes.UPDATE_MEASUREMENT, this.onUpdateMeasurement,
        PanelActTypes.UPDATE_AGGREGATOR, this.onUpdateAggregator
      );
    },

    getState: function() {
      return {
        filters: _filters,
        measurement: _measurement,
        aggregator: _aggregator
      };
    },

    onSetInitialValues: function(payload) {
      _filters = payload.filters;
      _measurement = payload.measurement;
      _aggregator = payload.aggregator;
      console.log("update panel store");
      this.emit(Const.CHANGE_EVENT);
    },

    onUpdateFilters: function(payload) {
      _filters = payload.filters;
      this.emit(Const.CHANGE_EVENT);
    },

    onUpdateMeasurement: function(payload) {
      _measurement = payload.measurement;
      this.emit(Const.CHANGE_EVENT);
    },

    onUpdateAggregator: function(payload) {
      _aggregator = payload.aggregator;
      this.emit(Const.CHANGE_EVENT);
    }

});
module.exports = PanelStore;
