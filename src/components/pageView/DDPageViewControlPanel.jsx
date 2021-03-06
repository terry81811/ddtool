const React = require("react");
const _ = require("lodash");
const {
  Row, Col,
  Well, Button, ButtonToolbar
} = require("react-bootstrap");

const Select = require("react-select");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

const DDControlPanelFilterForm = require("./DDControlPanelFilterForm.jsx");

let DDPageViewControlPanel = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PanelStore")],
  displayName: "DDPageViewControlPanel",
  propTypes: {
    cols: React.PropTypes.array,  //for form selector options
    statInfo: React.PropTypes.object, //for initial form inputs
  },

  getStateFromFlux: function() {
    let flux = this.getFlux();
    return {
      PanelStore: flux.store("PanelStore").getState(),  //get form inpts from stats, apart from selected statInfo props
    };
  },

  componentWillReceiveProps: function(nextProps) {  //should do this because we can assess the page directly by url
    if(nextProps.statInfo && nextProps.statInfo.id !== this.props.statInfo.id){
      this.getFlux().actions.PanelActions.setInitialValues(nextProps.statInfo);
    }
  },

  changeHandler: {
    measurement: function(o) {
      let col = _.find(this.props.cols, (col)=>{
        return Number(col.id) === Number(o);
      });
      this.getFlux().actions.PanelActions.updateMeasurement(col); //col === undefined if not found
    },
    aggregator: function(o) {
      this.getFlux().actions.PanelActions.updateAggregator(o);
    }
  },

  whereMapping: function(where){
    let mapping = {
      lt: "<",
      gt: ">",
      eq: "=",
      not: "!="
    };
    return mapping[where];
  },

  render: function() {

    let formOptions = { //keep rendering-purpose material in render()
      aggregators: [
        {label: "count", value: "count"},
        {label: "distinctCount", value: "distinctCount"},
        {label: "sum", value: "sum"},
        {label: "avg", value: "avg"},
        {label: "max", value: "max"},
        {label: "min", value: "min"}
      ],
      columns: _.map(this.props.cols, function(col){
        return {value: col.id, label: col.humanName};
      }),
    };

    let filtersRows = _.map(this.state.PanelStore.filters, (filter, key)=>{
      return <DDControlPanelFilterForm key={key} index={key} filter={filter} cols={this.props.cols} colOptions={formOptions.columns}/>;
    });

    let filterDesc = _.map(this.state.PanelStore.filters, (filter, key)=>{
      return <span key={key}><br/>Where {filter.humanName} {this.whereMapping(filter.where)} {filter.value}</span>;
    });

    return (
      <div>
        <Well>
          <code><span>Select {this.state.PanelStore.aggregator}
            ("{this.state.PanelStore.measurement ? this.state.PanelStore.measurement.humanName : ""}")
            Group By {this.props.statInfo.humanName}</span>
          {filterDesc}
          </code>

        </Well>
        <form className='form-horizontal'>
          <Row>
            <Col xs={2}><b>Measurement</b></Col>
            <Col xs={5}>
              <Select
                value={this.state.PanelStore.measurement ? this.state.PanelStore.measurement.humanName : ""}
                placeholder="請選擇 Column"
                name="form-field-name"
                options={formOptions.columns}
                onChange={this.changeHandler.measurement.bind(this)}
              />
            </Col>
            <Col xs={5}>
              <Select
                value={this.state.PanelStore.aggregator}
                placeholder="請選擇 aggregators"
                options={formOptions.aggregators}
                onChange={this.changeHandler.aggregator.bind(this)}
              />
            </Col>
          </Row>

          {filtersRows}

          <ButtonToolbar className={"pull-right"} style={{marginTop: "10px"}}>
            <Button bsStyle={"danger"}><i className={"fa fa-times fa-fw"}></i> Reset</Button>
            <Button bsStyle={"primary"}><i className={"fa fa-play fa-fw"}></i> Run</Button>
          </ButtonToolbar>
        </form>
      </div>

    );


  }
});

module.exports = DDPageViewControlPanel;
