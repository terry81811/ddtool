"use strict";
const _ = require("lodash");

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
        PanelActTypes.UPDATE_AGGREGATOR, this.onUpdateAggregator,
        PanelActTypes.CREATE_FILTER, this.onCreateFilter,
        PanelActTypes.DELETE_FILTER, this.onDeleteFilter,
        PanelActTypes.UPDATE_FILTER_COL,  this.onUpdateFilterCol,
        PanelActTypes.UPDATE_FILTER_WHERE, this.onUpdateFilteWhere,
        PanelActTypes.UPDATE_FILTER_VALUE, this.onUpdateFilterValue,
        PanelActTypes.SUBMIT_FORM, this.onSubmitForm
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
    },

    onCreateFilter: function() {
      _filters.push({
        colId: null,
        humanName: null,
        where: null,
        target: null
      });
      this.emit(Const.CHANGE_EVENT);
    },

    onDeleteFilter: function(payload) {
      if(_filters.length <= 1){
        _filters[0] = {
          colId: null,
          humanName: null,
          where: null,
          target: null
        };
      }else{
        _.pullAt(_filters, payload.index);
      }
      this.emit(Const.CHANGE_EVENT);
    },

    onUpdateFilterCol: function(payload) {
      if(payload.filter){
        _filters[payload.index].colId = payload.filter.id;
        _filters[payload.index].humanName = payload.filter.humanName;
      }else{ //payload === undefined if not found (when click "clear")
        _filters[payload.index].colId = null;
        _filters[payload.index].humanName = null;
        _filters[payload.index].where = null;
        _filters[payload.index].value = null;
      }
      this.emit(Const.CHANGE_EVENT);
    },

    onUpdateFilteWhere: function(payload) {
      _filters[payload.index].where = payload.whereExp;
      this.emit(Const.CHANGE_EVENT);
    },

    onUpdateFilterValue: function(payload) {
      _filters[payload.index].value = payload.value;
      this.emit(Const.CHANGE_EVENT);
    },

    onSubmitForm: function(payload) {
      console.log(payload);
    }

});
module.exports = PanelStore;
