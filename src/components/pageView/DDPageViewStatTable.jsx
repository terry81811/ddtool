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
    page: React.PropTypes.object,
  },
  render: function() {

    return (

            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>{this.props.page.contentType}</td>
                </tr>
                <tr>
                  <td>True</td>
                  <td>{this.props.page.statsTrueCount}</td>
                </tr>
                <tr>
                  <td>False</td>
                  <td>{this.props.page.statsFalseCount}</td>
                </tr>
                <tr>
                  <td>Uniq. Count</td>
                  <td>{this.props.page.statsUniqCount}</td>
                </tr>
                <tr>
                  <td>min</td>
                  <td>{this.props.page.statsMin}</td>
                </tr>
                <tr>
                  <td>max</td>
                  <td>{this.props.page.statsMax}</td>
                </tr>
                <tr>
                  <td>most freq val</td>
                  <td>{this.props.page.statsValMostFreq}</td>
                </tr>
                <tr>
                  <td>most freq num</td>
                  <td>{this.props.page.statsNumMostFreq}</td>
                </tr>
              </tbody>
            </Table>


    );


  }
});

module.exports = DDPageViewStatTable;
