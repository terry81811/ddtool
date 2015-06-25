const React = require("react");
const {

} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDPageThumbNail = React.createClass({
  displayName: "DDPageThumbNail",
  propTypes: {
    page: React.PropTypes.string
  },

  render: function() {
    return (
      <span>{this.props.page}</span>
    );
  }
});

module.exports = DDPageThumbNail;
