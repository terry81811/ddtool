const React = require("react");
const {
  Well
} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDPagePanel = React.createClass({
  displayName: "DDPagePanel",
  propTypes: {
    page: React.PropTypes.string
  },

  render: function() {
    return (
      <Well>
        <h4>title: {this.props.page}</h4>
      </Well>
    );
  }
});

module.exports = DDPagePanel;
