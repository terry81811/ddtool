const React = require("react");
const {
  Row
} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDCentralView = React.createClass({
  displayName: "DDCentralView",
  propTypes: {
  },

  render: function() {
    return (
      <Row className={"DDCentralView"}>
        this is DDCentralView
      </Row>
    );
  }
});

module.exports = DDCentralView;
