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
  displayName: "DDControlPanelFilterForm",
  propTypes: {
    filter: React.PropTypes.object.isRequired,
    colOptions: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired
  },

  handleFilterChange: function(index, value) {
    console.log(index);
    console.log(value);
  },

  handleTargetChange: function(index, event) {
    console.log(index);
    console.log(event.target.value);
  },

  handleDeleteFilter: function(index){
    console.log(index);
  },

  handleCreateFilter: function(){
    console.log("add!");
  },

  renderLabel: function() {
    if(this.props.index === 0){
      return (
        <Col xs={2}>
          <b>Filters</b>
          <a className={"anchor-cursor"} onClick={this.handleCreateFilter}>
            <i className={"fa fa-plus fa-fw"}></i>
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
    let constraintsOptions = [
      {label: ">", value: "gt"},
      {label: "<", value: "lt"},
      {label: "eq.", value: "eq"},
      {label: "not eq.", value: "not"}
    ];

    return (
          <Row style={{marginTop: "10px"}}>
            {this.renderLabel()}
            <Col xs={5}>
              <Select
                value={this.props.filter ? this.props.filter.humanName : ""}
                placeholder="請選擇 Column"
                name="form-field-name"
                options={this.props.colOptions}
                onChange={this.handleFilterChange.bind(null, this.props.index)}
              />
            </Col>
            <Col xs={2}>
              <Select
                value={this.props.filter ? this.props.filter.where : ""}
                placeholder=">"
                options={constraintsOptions}
                onChange={this.logChange}
                clearable={false}
              />
            </Col>
            <Col xs={3}>
              <input  style={{height:"38px"}} type='text' className='form-control'
                      defaultValue={this.props.filter ? this.props.filter.target : ""}
                      onBlur={this.handleTargetChange.bind(null, this.props.index)}
                      />
            </Col>
          </Row>
    );
  }
});

module.exports = DDControlPanelFilterForm;
