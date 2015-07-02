const React = require("react");
const {
  Input,
  Row, Col,
  Badge, Panel,
  DropdownButton, MenuItem, ButtonToolbar
} = require("react-bootstrap");

const DDPageThumbNails = require("./DDPageThumbNails.jsx");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDLeftSideBar = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDLeftSideBar",
  propTypes: {
    pages: React.PropTypes.array
  },

  render: function() {
    return (
      <Row className={"DDLeftSideBar"}>
        <Col className={"padding15Col"}>
          <Panel>
            <h4><a href={"#/"}>Pages</a> <Badge>{this.props.pages.length}</Badge>
              <a className={"pull-right anchor-cursor"}>+</a>
            </h4>
          </Panel>
          <ButtonToolbar>
          <Input type='checkbox' label='Show Default Col'/>
            <DropdownButton title="Sort By" bsSize="small" className={"pull-right"}>
              <MenuItem eventKey="1">Created Date</MenuItem>
              <MenuItem eventKey="2">Dimension</MenuItem>
              <MenuItem eventKey="3">Measurement</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
          <DDPageThumbNails pages = {this.props.pages}/>
        </Col>
      </Row>
    );
  }
});

module.exports = DDLeftSideBar;
