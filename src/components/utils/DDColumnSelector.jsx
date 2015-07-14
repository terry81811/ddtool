const React = require("react");
const _ = require("lodash");
const Select = require("react-select");
const {
  Input
} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDColumnSelector = React.createClass({
  displayName: "DDColumnSelector",
  propTypes: {
    cols: React.PropTypes.array.isRequired,
    multi: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string
  },

  render: function() {

    let options = _.map(this.props.cols, function(col){
      return {value: col.id, label: col.humanName};
    });

    return (
      <Select
        value={this.props.value}
        multi={this.props.multi}
        placeholder="請選擇 Column"
        name="form-field-name"
        options={options}
        onChange={this.props.onChange}
      />
    );
  }
});

module.exports = DDColumnSelector;
