const React = require("react");

const {
  Table
} = require("react-bootstrap");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageViewStatTable = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageViewStatTable",
  propTypes: {
    statInfo: React.PropTypes.object,
  },
  render: function() {

    return (

            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>{this.props.statInfo.contentType}</td>
                </tr>
                <tr>
                  <td>True</td>
                  <td>{this.props.statInfo.statsTrueCount}</td>
                </tr>
                <tr>
                  <td>False</td>
                  <td>{this.props.statInfo.statsFalseCount}</td>
                </tr>
                <tr>
                  <td>Uniq. Count</td>
                  <td>{this.props.statInfo.statsUniqCount}</td>
                </tr>
                <tr>
                  <td>min</td>
                  <td>{this.props.statInfo.statsMin}</td>
                </tr>
                <tr>
                  <td>max</td>
                  <td>{this.props.statInfo.statsMax}</td>
                </tr>
                <tr>
                  <td>most freq val</td>
                  <td>{this.props.statInfo.statsValMostFreq}</td>
                </tr>
                <tr>
                  <td>most freq num</td>
                  <td>{this.props.statInfo.statsNumMostFreq}</td>
                </tr>
              </tbody>
            </Table>


    );


  }
});

module.exports = DDPageViewStatTable;
