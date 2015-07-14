const React = require("react");
const _ = require("lodash");
const Select = require("react-select");
const {
  Row, Col
} = require("react-bootstrap");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDControlPanelFilterForm = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDControlPanelFilterForm",
  propTypes: {
    filter: React.PropTypes.object.isRequired,
    colOptions: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    cols: React.PropTypes.array.isRequired
  },

  handleFilterColChange: function(index, value) {
    let col = _.find(this.props.cols, (col)=>{
      return Number(col.id) === Number(value);
    });
    this.getFlux().actions.PanelActions.updateFilterCol(index, col);  //col === undefined if not found
  },

  handleFilterWhereChange: function(index, value) {
    this.getFlux().actions.PanelActions.updateFilterWhere(index, value);
  },

  handleFilterValueChange: function(index, event) {
    console.log(typeof event);
    if(typeof event === "object"){
      this.getFlux().actions.PanelActions.updateFilterValue(index, event.target.value);
    }else if(typeof event === "string"){
      this.getFlux().actions.PanelActions.updateFilterValue(index, event);
    }
  },

  handleDeleteFilter: function(index){
    this.getFlux().actions.PanelActions.deleteFilter(index);
  },

  handleCreateFilter: function(){
    this.getFlux().actions.PanelActions.createFilter();
  },

  renderLabel: function() {
    if(this.props.index === 0){
      return (
        <Col xs={2}>
          <b>Filters</b>
          <a className={"anchor-cursor"} onClick={this.handleCreateFilter}>
            <i className={"fa fa-plus fa-fw"}></i>
          </a>
          <a className={"anchor-cursor"} onClick={this.handleDeleteFilter.bind(null, this.props.index)}>
            <i className={"fa fa-times fa-fw"}></i>
          </a>
        </Col>
      );
    }else{
      return (
        <Col xs={2}>
          <a className={"anchor-cursor"} onClick={this.handleDeleteFilter.bind(null, this.props.index)}>
            <i className={"fa fa-times fa-fw"}></i>
          </a>
        </Col>
      );
    }
  },

  render: function() {

    let col = _.find(this.props.cols, (col)=>{
      return Number(col.id) === Number(this.props.filter.colId);
    });


    let constraintsOptions = {
      numerical: [
        {label: ">", value: "gt"},
        {label: "<", value: "lt"},
        {label: "eq.", value: "eq"},
        {label: "not eq.", value: "not"}
      ],
      categorical: [
        {label: "eq.", value: "eq"},
        {label: "not eq.", value: "not"}
      ]
    };

    let filterOptionsForm = null;
    if(!col){
      filterOptionsForm = (<Col xs={5}/>);  //col is empty, show nothing
    }else if(col.contentType === "INTEGER" || col.contentType === "FLOAT"){ //col is numerical
      filterOptionsForm = (
        <div>
          <Col xs={2}>
            <Select
              value={this.props.filter ? this.props.filter.where : ""}
              placeholder="eq."
              options={constraintsOptions.numerical}
              onChange={this.handleFilterWhereChange.bind(null, this.props.index)}
              clearable={false}
            />
          </Col>
          <Col xs={3}>
            <input  style={{height:"38px"}} type='text' className='form-control'
                    defaultValue={this.props.filter ? this.props.filter.value : ""}
                    onBlur={this.handleFilterValueChange.bind(null, this.props.index)}
                    />
          </Col>
        </div>
      );
    }else{  //col is categorical
      filterOptionsForm = (
        <div>
          <Col xs={2}>
            <Select
              value={this.props.filter ? this.props.filter.where : ""}
              placeholder="eq."
              options={constraintsOptions.categorical}
              onChange={this.handleFilterWhereChange.bind(null, this.props.index)}
              clearable={false}
            />
          </Col>
          <Col xs={3}>
            <Select
              value={this.props.filter ? this.props.filter.value : ""}
              options={constraintsOptions.categorical}
              onChange={this.handleFilterValueChange.bind(null, this.props.index)}
              clearable={false}
            />
          </Col>
        </div>
      );
    }

    return (
          <Row style={{marginTop: "10px"}}>
            {this.renderLabel()}
            <Col xs={5}>
              <Select
                value={this.props.filter ? this.props.filter.humanName : ""}
                placeholder="請選擇 Column"
                name="form-field-name"
                options={this.props.colOptions}
                onChange={this.handleFilterColChange.bind(null, this.props.index)}
              />
            </Col>
            {filterOptionsForm}
          </Row>
    );
  }
});

module.exports = DDControlPanelFilterForm;
