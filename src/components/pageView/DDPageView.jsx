const React = require("react");
const C3Chart = require("c3-react");
const Select = require("react-select");
const _ = require("lodash");
const {
  Row, Col, Table
} = require("react-bootstrap");

const DDPageViewStatTable = require("./DDPageViewStatTable.jsx");
const DDPageViewControlPanel = require("./DDPageViewControlPanel.jsx");


let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageView = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageView",
  propTypes: {
    statInfo: React.PropTypes.object, //focused statInfo, detemined the content to be shown
    statInfos: React.PropTypes.array, //to pass as props to form selectors
    cols: React.PropTypes.array,  //carries col_data_type, to pass as props to form selectors
    params: React.PropTypes.object, //url params, params.id = focused statInfo.id
    misc: React.PropTypes.object  //carries chart type information
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.params.id !== this.props.params.id){
      console.log("call getStatInfo() from DDPageView when willReceive Props");
      this.getFlux().actions.DataActions.getStatInfo(nextProps.params.id);
    }
  },

  componentDidMount: function() {
    console.log("call getStatInfo() from DDPageView when componentDidMount");
    this.getFlux().actions.DataActions.getStatInfo(this.props.params.id);
  },

  handleChartTypeChange: function(value) {
    this.getFlux().actions.DataActions.updateChartType(value);
  },

// METHODS CALLED WHEN RENDER
//data preprocessor
  isStatInfoGrouperNumerical: function(statInfo) {
    let col = _.find(this.props.cols, (col)=>{
      return Number(col.id) === Number(statInfo.grouper.grouperId);
    });
    if(col){
      return (col.contentType === "FLOAT" || col.contentType === "INTEGER") ? true : false;
    }else{
      return false; //assume grouper(x-Axis) is not numerical
    }
  },

  numericalPreProcessor: function(statInfo) { //translate from label:[1000-2000] -> label:"1500"
    _.forEach(statInfo.stat.general.values, (category)=>{
      if(category.label instanceof Array){
        category.label = (category.label[0] + category.label[1]) / 2;
        //category.label = category.label[0].toString();
      }
    });
  },

  dataPreprocessor: function(statInfo) {
      //find NULL string and relplace
      let res = _.find(statInfo.stat.general.values, (category)=>{
        return category.label === "" || category.label === null;
      });
      if(res){
        res.label = "[NULL]";
      }

      //numerical preprocessor
      if(this.isStatInfoGrouperNumerical(statInfo)){
        this.numericalPreProcessor(statInfo);
      }
    return this.props.statInfo;
  },

  render: function() {
    if(this.props.statInfo === null){
      return <h3>no data available</h3>;
    }else{
      let statInfo = this.dataPreprocessor(this.props.statInfo);

      //Chart Options/Data initialization
      let data = [
        {
          key: "Count"
        }
      ];
      data[0].values = statInfo.stat.general.values;
      let chartOptions = {
        padding: {
          top: 20, bottom: 20, left: 40, right: 10
        },
        grid: {
          y: true
        },
        axisLabel: {
          x: statInfo.humanName,
          y: statInfo.measurement.aggregator
        }
      };
      if(statInfo.stat.general.values.length > 15){
        chartOptions.tick = {
          x: {
            culling: {
              max: statInfo.stat.general.values.length / 2
            },
            rotate: 30,
            multiline: false
          },
        };
      }
      if(statInfo.stat.general.values.length > 30){
        chartOptions.labels = false;
      }

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
              <DDPageViewControlPanel statInfo={this.props.statInfo} statInfos={this.props.statInfos} cols={this.props.cols}/>
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
                        options={chartOptions}/>
              <Row className={"zeroMarginRow"}>
                <Col>
                  <DDPageViewStatTable statInfo={this.props.statInfo} isNumerical={this.isStatInfoGrouperNumerical(this.props.statInfo)}/>
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
