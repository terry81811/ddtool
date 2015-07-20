"use strict";

const Const = require("../constants");

const PanelActTypes = Const.ActTypes.Panel;

let PanelActions = {
//  setInitialValues(statInfo) {
//    console.log("Panel action: setInitialValues");
//    this.dispatch(
//      PanelActTypes.SET_INITIAL_VALUES,
//      {
//        filters: statInfo.filters,
//        measurement: statInfo.measurement,
//        aggregator: statInfo.measurement.aggregator
//      }
//    );
//  },

  updateFilters(filters) {
    this.dispatch(
      PanelActTypes.UPDATE_FILTERS,
      { filters: filters}
    );
  },

  updateMeasurement(measurement) {
    this.dispatch(
      PanelActTypes.UPDATE_MEASUREMENT,
      { measurement: measurement} //measurement === undefined if not found
    );
  },

  updateAggregator(agr) {
    this.dispatch(
      PanelActTypes.UPDATE_AGGREGATOR,
      { aggregator: agr}
    );
  },

  createFilter() {
    this.dispatch(
      PanelActTypes.CREATE_FILTER,
      {}
    );
  },

  deleteFilter(index) {
    this.dispatch(
      PanelActTypes.DELETE_FILTER,
      {index: index}
    );
  },

  updateFilterCol(index, filter) {
    this.dispatch(
      PanelActTypes.UPDATE_FILTER_COL,
      {
        index: index,
        filter: filter
      }
    );
  },

  updateFilterWhere(index, whereExp) {
    this.dispatch(
      PanelActTypes.UPDATE_FILTER_WHERE,
      {
        index: index,
        whereExp: whereExp
      }
    );
  },

  updateFilterValue(index, value) {
    this.dispatch(
      PanelActTypes.UPDATE_FILTER_VALUE,
      {
        index: index,
        value: value
      }
    );
  },

  submitForm(statInfo) {
    this.dispatch(
      PanelActTypes.SUBMIT_FORM,
      {
        statInfo: statInfo
      }
    );
  }

};

module.exports = PanelActions;
