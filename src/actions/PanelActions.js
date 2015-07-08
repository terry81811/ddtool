"use strict";

const Const = require("../constants");

const PanelActTypes = Const.ActTypes.Panel;

let PanelActions = {
  setInitialValues(statInfo) {
    this.dispatch(
      PanelActTypes.SET_INITIAL_VALUES,
      {
        filters: statInfo.filters,
        measurement: statInfo.measurement,
        aggregator: statInfo.measurement.aggregator
      }
    );
  },

  updateFilters(filters) {
    this.dispatch(
      PanelActTypes.UPDATE_FILTERS,
      { filters: filters}
    );
  },

  updateMeasurement(measurement) {
    this.dispatch(
      PanelActTypes.UPDATE_MEASUREMENT,
      { measurement: measurement}
    );
  },

  updateAggregator(agr) {
    this.dispatch(
      PanelActTypes.UPDATE_AGGREGATOR,
      { aggregator: agr}
    );
  }

};

module.exports = PanelActions;
