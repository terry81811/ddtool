const React = require("react");
const {
  Row, Col
} = require("react-bootstrap");

const DDLeftSideBar = require("./DDLeftSideBar.jsx");
const DDCentralView = require("./DDCentralView.jsx");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDWrapper = React.createClass({
  displayName: "DDWrapper",
  propTypes: {
  },

  render: function() {
    return (
      <Row className={"DDWrapper"}>
        <Col md={2}>
          <DDLeftSideBar />
        </Col>
        <Col md={10}>
          <DDCentralView />
        </Col>
      </Row>
    );
  }
});

module.exports = DDWrapper;
