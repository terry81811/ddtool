const React = require("react");
const C3Chart = require("c3-react");
const Select = require("react-select");

const {
  Row, Col
} = require("react-bootstrap");

const DDPageViewStatTable = require("./DDPageViewStatTable.jsx");
const DDPageViewControlPanel = require("./DDPageViewControlPanel.jsx");


let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageView = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageView",
  propTypes: {
    cols: React.PropTypes.array,
    statInfo: React.PropTypes.object,
    statInfos: React.PropTypes.array,
    params: React.PropTypes.object,
    misc: React.PropTypes.object
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("willReceive");
    if(nextProps.params.id !== this.props.params.id){
      this.getFlux().actions.DataActions.getStatInfo(nextProps.params.id);
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.DataActions.getStatInfo(this.props.params.id);
    console.log("did mount");
  },

  handleChartTypeChange: function(value) {
    this.getFlux().actions.DataActions.updateChartType(value);
  },

  render: function() {

    if(this.props.statInfo === null){
      return <h3>no!</h3>;
    }else{

      let data = [
        {
          key: "Count"
        }
      ];
      data[0].values = this.props.statInfo.stat.general.values;

      let options = {
        padding: {
          top: 20,
          bottom: 20,
          left: 40,
          right: 10
        },
        grid: {
          y: true
        },
        axisLabel: {
          x: "Categories",
          y: "Count"
        }
      };

      let chartTypeOptions = [
        {label: "Bar Chart", value: "bar"},
        {label: "Pie Chart", value: "pie"},
        {label: "Line Chart", value: "line"}
      ];

      return (
        <div className={"DDPageView"}>
          <Row className={"zeroMarginRow"}>

            <h3>{this.props.statInfo.humanName}</h3>
            <Col md={6}>
              <DDPageViewControlPanel statInfo={this.props.statInfo} cols={this.props.pages}/>
            </Col>

            <Col md={6}>
              <Row className={"zeroMarginRow"}>
                <Col md={8}/>
                <Col md={4}>
                <Select
                  value={this.props.misc.chartType}
                  name="form-field-name"
                  options={chartTypeOptions}
                  onChange={this.handleChartTypeChange}
                  clearable={false}
                />
                </Col>
              </Row>
              <C3Chart  data={data}
                        type={this.props.misc.chartType}
                        options={options}/>
              <Row className={"zeroMarginRow"}>
                <Col>
                  <DDPageViewStatTable statInfo={this.props.statInfo}/>
                </Col>
              </Row>
            </Col>

          </Row>
        </div>

      );
    }

  }
});

module.exports = DDPageView;
