const React = require("react");
const C3Chart = require("c3-react");

const {
  Row, Col,
  Input
} = require("react-bootstrap");

const DDPageViewStatTable = require("./DDPageViewStatTable.jsx");
const DDPageViewControlPanel = require("./DDPageViewControlPanel.jsx");


let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageView = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageView",
  propTypes: {
    page: React.PropTypes.object,
    pages: React.PropTypes.array,
    params: React.PropTypes.object
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("willReceive");
    if(nextProps.params.id !== this.props.params.id){
      this.getFlux().actions.DataActions.getColInfo(nextProps.params.id);
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.DataActions.getColInfo(this.props.params.id);
    console.log("did mount");
  },

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
      grid: {
        y: true
      },
      axisLabel: {
        x: "x軸",
        y: "y軸"
      }
    };

    if(this.props.page === null){
      return <h3>no!</h3>;
    }else{
      return (
        <div className={"DDPageView"}>
          <Row className={"zeroMarginRow"}>
            <h3>{this.props.page.humanName}</h3>
            <Col md={6}>
              <Row className={"zeroMarginRow"}>
                <Input  style={{width:"25%"}}
                        className={"pull-right"}
                        type='select' placeholder='select chart type'>
                  <option value='select'>barChart</option>
                  <option value='pie'>pieChart</option>
                  <option value='line'>lineChart</option>
                </Input>
              </Row>
              <C3Chart  data={data}
                        type={"bar"}
                        options={options}/>
            </Col>
            <Col md={6}>
              <Row className={"zeroMarginRow"}>
                <Col>
                  <DDPageViewStatTable page={this.props.page}/>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className={"zeroMarginRow"}>
            <DDPageViewControlPanel page={this.props.page}/>
          </Row>
        </div>

      );
    }

  }
});

module.exports = DDPageView;
