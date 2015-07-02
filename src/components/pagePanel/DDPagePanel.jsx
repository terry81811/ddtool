const React = require("react");
const {
  Row, Col,
  Well, Table
} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDPagePanel = React.createClass({
  displayName: "DDPagePanel",
  propTypes: {
    page: React.PropTypes.object
  },

  render: function() {
    return (
      <Well className={"DDPagePanelWell"}>
        <Row>
          <Col md={8}>
            <h4>{this.props.page.humanName}</h4>
          <Row>
            <Col md={4}>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td width={"50%"}>Type</td>
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
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td width={"50%"}>min</td>
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
            </Col>

            </Row>
          </Col>

          <Col md={4}>
            <a href={"#/page/"+this.props.page.id} className={"anchor-cursor pull-right"}>
              <i className={"fa fa-4x fa-angle-double-right fa-fw"}></i>
            </a>
          </Col>
        </Row>
      </Well>
    );
  }
});

module.exports = DDPagePanel;
