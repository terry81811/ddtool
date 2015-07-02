const React = require("react");
const C3Chart = require("c3-react");
const _ = require("lodash");

const {
  Row, Col,
  Table
} = require("react-bootstrap");

let DDPageView = React.createClass({
  displayName: "DDPageView",
  propTypes: {
    pages: React.PropTypes.array,
    params: React.PropTypes.object
  },

  getInitialState: function() {
    return ({page: null});
  },

//  componentDidMount: function() {
//    let _this = this;
//    let pageIndex = _.findIndex(this.props.pages, function(page) {
//      return page.id == _this.props.params.id;
//    });
//    let page = this.props.pages[pageIndex];
//    console.log(_this.props.params.id);
//    console.log(this.props.pages);
//    console.log(pageIndex);
//    console.log(page);
//    this.setState({page: page});
//  },

  render: function() {
    let data = [
      {
        key: "dataSource1",
        values: [
          {label: "A", value: 3},
          {label: "B", value: 4}
        ]
      },
      {
        key: "dataSource2",
        values: [
          {label: "X", value: 7},
          {label: "Y", value: 8}
        ]
      }
    ];

    let options = {
      padding: {
        top: 20,
        bottom: 20,
        left: 40,
        right: 10
      },
      size: {
        width: 400,
        height: 320
      },
      grid: {
        y: true
      },
      axisLabel: {
        x: "x軸",
        y: "y軸"
      },
      onClick: function(d) {
        let categories = this.categories();
        console.log(d);
        console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
      }
    };

    let _this = this;
    let pageIndex = _.findIndex(this.props.pages, function(page) {
      return page.id == _this.props.params.id;
    });
    let page = this.props.pages[pageIndex];


    return (
      <Row>
      <h3>{page.humanName}</h3>
        <Col md={4}>
          <C3Chart  data={data}
                    type={"bar"}
                    options={options}/>
        </Col>
        <Col md={3}>
          <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <td>Type</td>
                <td>{page.contentType}</td>
              </tr>
              <tr>
                <td>True</td>
                <td>{page.statsTrueCount}</td>
              </tr>
              <tr>
                <td>False</td>
                <td>{page.statsFalseCount}</td>
              </tr>
              <tr>
                <td>Uniq. Count</td>
                <td>{page.statsUniqCount}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={3}>
          <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <td>min</td>
                <td>{page.statsMin}</td>
              </tr>
              <tr>
                <td>max</td>
                <td>{page.statsMax}</td>
              </tr>
              <tr>
                <td>most freq val</td>
                <td>{page.statsValMostFreq}</td>
              </tr>
              <tr>
                <td>most freq num</td>
                <td>{page.statsNumMostFreq}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

    );
  }
});

module.exports = DDPageView;
