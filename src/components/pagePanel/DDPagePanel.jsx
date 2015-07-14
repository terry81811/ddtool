const React = require("react");
const C3Chart = require("c3-react");
const _ = require("lodash");
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
    statInfo: React.PropTypes.object,
    cols: React.PropTypes.array
  },

  render: function() {
    let col = _.find(this.props.cols, (col)=>{
      return Number(col.id) === Number(this.props.statInfo.grouper.grouperId);
    });

    let isNumerical = false;  //assume grouper(x-Axis) is not numerical
    if(col){
      isNumerical = col.contentType === "FLOAT" || col.contentType === "INTEGER" ? true : false;
    }

    let data = [
      { key: "Count"}
    ];
    data[0].values = this.props.statInfo.stat.general.values;

    let options = {
      padding: {
        top: 20,
        bottom: 20,
        left: 40,
        right: 10
      },
      size: {
        width: 400,
        height: 150
      },
      labels: false,
      legend: false,
      tick: {
        max: 4,
      },
    };

    let statTable = null;

    if(isNumerical){
      statTable = ( //if data is numerical
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <td width={"50%"}>min</td>
              <td>{this.props.statInfo.stat.numerical.min[0]}</td>
            </tr>
            <tr>
              <td>max</td>
              <td>{this.props.statInfo.stat.numerical.max[0]}</td>
            </tr>
            <tr>
              <td>mean</td>
              <td>{Number(this.props.statInfo.stat.numerical.mean).toFixed(2)}</td>
            </tr>
            <tr>
              <td>std.</td>
              <td>{Number(this.props.statInfo.stat.numerical.std).toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      );
    }else{  //if data is categorical

      let max = _.max(this.props.statInfo.stat.general.values, function(category){
        return Number(category.value);
      });

      let min = _.min(this.props.statInfo.stat.general.values, function(category){
        return Number(category.value);
      });

      statTable = (
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <td width={"50%"}>min label</td>
              <td>{min.label === "" ? "NULL*" : min.label}</td>
            </tr>
            <tr>
              <td>min count</td><td>{min.value}</td>
            </tr>
            <tr>
              <td>max label</td><td>{max.label === "" ? "NULL*" : max.label}</td>
            </tr>
            <tr>
              <td>max count</td><td>{max.value}</td>
            </tr>
          </tbody>
        </Table>
      );
    }

    let numberOfRows = _.sum(this.props.statInfo.stat.general.values, function(category){
      return category.value;
    });

    let sum = numberOfRows;
    if(isNumerical){
      sum = Number(this.props.statInfo.stat.numerical.mean) * numberOfRows;
    }

    return (
      <Well className={"DDPagePanelWell"}>
        <Row>
          <Col md={10}>
            <h4>{this.props.statInfo.humanName}</h4>
          <Row>
            <Col md={3}>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td width={"50%"}>Type</td>
                    <td>{col ? col.contentType : null}</td>
                  </tr>
                  <tr>
                    <td># of Rows</td>
                    <td>{numberOfRows}</td>
                  </tr>
                  <tr>
                    <td>Sum</td>
                    <td>{Math.round(sum * 100) / 100}</td>
                  </tr>
                  <tr>
                    <td>組數</td>
                    <td>{this.props.statInfo.stat.general.values.length}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={3}>
              {statTable}
            </Col>
            <Col md={6}>

              <C3Chart  data={data}
                        type={"bar"}
                        options={options}/>
            </Col>
            </Row>
          </Col>

          <Col md={2}>
            <a href={"#/page/"+this.props.statInfo.id} className={"anchor-cursor pull-right"}>
              <i className={"fa fa-4x fa-angle-double-right fa-fw"}></i>
            </a>
          </Col>
        </Row>
      </Well>
    );
  }
});

module.exports = DDPagePanel;
