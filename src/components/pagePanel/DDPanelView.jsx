const React = require("react");
const _ = require("lodash");
const {
  Row, Col
} = require("react-bootstrap");

const DDPagePanel = require("./DDPagePanel.jsx");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React);

let DDPanelView = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPanelView",
  propTypes: {
    cols: React.PropTypes.array,
    statInfos: React.PropTypes.array
  },

  componentDidMount: function() {
    this.getFlux().actions.DataActions.clearStatInfo();  //no need to keep focused statInfo here, flush it!
  },

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

  numericalPreProcessor: function(statInfo) {
    _.forEach(statInfo.stat.general.values, (category)=>{
      if(category.label instanceof Array){
//        category.label = (category.label[0] + category.label[1]) / 2;
        category.label = category.label[0];
      }
    });
  },

  dataPreprocessor: function() {
    _.forEach(this.props.statInfos, (statInfo)=>{

      //find NULL string
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
    });
    return this.props.statInfos;
  },

  render: function() {
    let statInfos = this.dataPreprocessor();
    let PagePanels = _.map(statInfos, (statInfo, key) => {
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
