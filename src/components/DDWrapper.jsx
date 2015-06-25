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
    let pages = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
    return (
      <Row className={"DDWrapper"}>
        <Col md={2}>
          <DDLeftSideBar pages={pages}/>
        </Col>
        <Col md={10}>
          <DDCentralView pages={pages} className={"padding15"}/>
        </Col>
      </Row>
    );
  }
});

module.exports = DDWrapper;
