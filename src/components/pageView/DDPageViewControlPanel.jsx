const React = require("react");

const {
} = require("react-bootstrap");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageViewControlPanel = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageViewControlPanel",
  propTypes: {
    page: React.PropTypes.object,
  },
  render: function() {

    return (
      <h4>
        this is some panel
      </h4>

    );


  }
});

module.exports = DDPageViewControlPanel;
