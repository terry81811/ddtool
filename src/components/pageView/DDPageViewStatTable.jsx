const React = require("react");
const _ = require("lodash");

const {
  Table,
  TabbedArea, TabPane,
  DropdownButton, MenuItem
} = require("react-bootstrap");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageViewStatTable = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageViewStatTable",
  propTypes: {
    statInfo: React.PropTypes.object,
  },

  calculateStat: {
    total: function(stat) {
      return _.sum(stat.values, function(o){
        return o.value;
      });
    },
    topItems: function(stat, num) {
      num = num < stat.values.length ? num : stat.values.length;
      let sorted = _.sortBy(stat.values, "value");
      let top = _.takeRight(sorted, num).reverse();
      let last = _.take(sorted, num);
      let zipped = _.zip(top, last);
      return zipped;
    },
  },

  renderStatTopItems: function(statInfo, num) {
    let total = this.calculateStat.total(statInfo.stat.general);
    let topItems = this.calculateStat.topItems(statInfo.stat.general, num);
    let statRows = _.map(topItems, function(topItem, key){
        console.log(topItem[0].value / 2000);

      return (
        <tr key={key}>
          <td>{topItem[0].label}</td>
          <td>{topItem[0].value}</td>
          <td>{(topItem[0].value / total * 100).toFixed(2)}%</td>
          <td>{topItem[1].label}</td>
          <td>{topItem[1].value}</td>
          <td>{(topItem[1].value / total * 100).toFixed(2)}%</td>
        </tr>
      );
    });

    return (
      <Table striped bordered condensed hover>
        <tr>
          <td width="20%">
              <DropdownButton title={"Top "+ statRows.length}>
                <MenuItem eventKey='1'>5</MenuItem>
                <MenuItem eventKey='2'>4</MenuItem>
              </DropdownButton>
          </td>
          <td>Count</td><td>%</td>
          <td width="20%">
            Last {statRows.length}
          </td>
          <td>Count</td><td>%</td>
        </tr>
        {statRows}
      </Table>
    );
  },

  renderNumericalStat: function(statInfo, num) {
    num = num < statInfo.stat.numerical.min.length ? num : statInfo.stat.numerical.min.length;
    let total = this.calculateStat.total(statInfo.stat.general);
    let topItems = _.takeRight(statInfo.stat.numerical.max.sort(), num).reverse();
    let lastItems = _.take(statInfo.stat.numerical.min.sort(), num);

    return (
      <Table striped bordered condensed hover>
        <tr>
          <td>Rows Count</td><td>{total}</td>
        </tr>
        <tr>
          <td>Sum.</td><td>{statInfo.stat.numerical.sum}</td>
        </tr>
        <tr>
          <td>Avg.</td><td>{statInfo.stat.numerical.mean}</td>
        </tr>
        <tr>
          <td>Std.</td><td>{statInfo.stat.numerical.std}</td>
        </tr>
        <tr>
          <td>MAX 5</td><td>{topItems.join(", ")}</td>
        </tr>
        <tr>
          <td>min 5</td><td>{lastItems.join(", ")}</td>
        </tr>

      </Table>
    );
  },

  renderRawContent: function(statInfo) {
    let total = this.calculateStat.total(statInfo.stat.general);
    let statRows = _.map(statInfo.stat.general.values, function(row, key){
      return (
        <tr key={key}>
          <td>{row.label}</td>
          <td>{row.value}</td>
          <td>{(row.value / total * 100).toFixed(2)}%</td>
        </tr>
      );
    });

    return (
      <Table striped bordered condensed hover>
        <tr>
          <td>Label Name</td><td>Count</td><td>%</td>
        </tr>
        {statRows}
        <tr className={"info"}>
          <td width="40%">Total Count</td>
          <td width="30%">{total}</td>
          <td width="30%">100%</td>
        </tr>
      </Table>
      );
  },

  isGrouperNumerical: function(statInfo) {
    return _.contains(["interger", "float"], statInfo.grouper.type);
  },

  render: function() {
    if(this.isGrouperNumerical(this.props.statInfo)){
      return (
        <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab='統計表格'>{this.renderRawContent(this.props.statInfo)}</TabPane>
          <TabPane eventKey={2} tab='統計資訊'>{this.renderNumericalStat(this.props.statInfo, 5)}</TabPane>
        </TabbedArea>
      );
    }else{
      return (
        <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab='統計表格'>{this.renderRawContent(this.props.statInfo)}</TabPane>
          <TabPane eventKey={2} tab='Max/Min'>{this.renderStatTopItems(this.props.statInfo, 5)}</TabPane>
        </TabbedArea>
      );
    }
  }
});

module.exports = DDPageViewStatTable;
