const React = require("react");
const _ = require("lodash");
const {
  Row, Col
} = require("react-bootstrap");

const DDPagePanel = require("./DDPagePanel.jsx");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDPanelView = React.createClass({
  displayName: "DDPanelView",
  propTypes: {
    pages: React.PropTypes.array
  },

  render: function() {
    let PagePanels = _.map(this.props.pages, function(page, key){
      return <DDPagePanel key={key} page={page} />;
    });

    return (
      <Row className={"DDPanelView"}>
        <Col className={"padding15Col"}>
          {PagePanels}
        </Col>
      </Row>
    );
  }
});

module.exports = DDPanelView;
