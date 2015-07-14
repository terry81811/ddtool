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
    cols: React.PropTypes.array,
    statInfos: React.PropTypes.array
  },

  render: function() {
    let PagePanels = _.map(this.props.statInfos, (statInfo, key) => {
      return <DDPagePanel key={key} cols={this.props.cols} statInfo={statInfo}/>;
    });

    return (
      <Row className={"DDPanelView zeroMarginRow"}>
        <Col>
          {PagePanels}
        </Col>
      </Row>
    );
  }
});

module.exports = DDPanelView;
