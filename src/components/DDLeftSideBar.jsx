const React = require("react");
const {
  Row,
  DropdownButton, MenuItem
} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDLeftSideBar = React.createClass({
  displayName: "DDLeftSideBar",
  propTypes: {
  },

  render: function() {
    return (
      <Row className={"DDLeftSideBar"}>
        <DropdownButton title='Sort By' bsSize='small' className={'pull-right'}>
          <MenuItem eventKey='1'>Created Date</MenuItem>
          <MenuItem eventKey='2'>Dimension</MenuItem>
          <MenuItem eventKey='3'>Measure</MenuItem>
        </DropdownButton>
      </Row>
    );
  }
});

module.exports = DDLeftSideBar;
