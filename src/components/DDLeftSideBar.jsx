const React = require("react");
const {
  Row, Col,
  Badge, Panel,
  DropdownButton, MenuItem, ButtonGroup, ButtonToolbar
} = require("react-bootstrap");

const DDPageList = require("./DDPageList.jsx");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDLeftSideBar = React.createClass({
  displayName: "DDLeftSideBar",
  propTypes: {
    pages: React.PropTypes.array
  },

  render: function() {
    return (
      <Row className={"DDLeftSideBar"}>
        <Col className={"padding15Col"}>
          <Panel>
            <h4>Pages <Badge>12</Badge><a className={"pull-right anchor-cursor"}>+</a></h4>
          </Panel>
          <ButtonToolbar>
            <DropdownButton title="Sort By" bsSize="small" className={"pull-right"}>
              <MenuItem eventKey="1">Created Date</MenuItem>
              <MenuItem eventKey="2">Dimension</MenuItem>
              <MenuItem eventKey="3">Measurement</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
          <DDPageList pages = {this.props.pages}/>
        </Col>
      </Row>
    );
  }
});

module.exports = DDLeftSideBar;
