const React = require("react");
const _ = require("lodash");
const {
  Table,
  TabbedArea, TabPane,
  DropdownButton, MenuItem,
  Nav, NavItem
} = require("react-bootstrap");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageViewStatTable = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageViewStatTable",
  propTypes: {
    statInfo: React.PropTypes.object,
    isNumerical: React.PropTypes.bool,
  },

  getInitialState: function(){
    return {
      activeKey: 1,
      sortBy: "label",
      sortingMethod: "acs"
    };
  },

  calculateStat: {
    total: function(stat) {
      return _.sum(stat.values, function(o){
        return o.value;
      });
    },
//    topItems: function(stat, num) {
//      num = num < stat.values.length ? num : stat.values.length;
//      let sorted = _.sortBy(stat.values, "value");
//      let top = _.takeRight(sorted, num).reverse();
//      let last = _.take(sorted, num);
//      let zipped = _.zip(top, last);
//      return zipped;
//    },
  },

  renderNumericalStat: function(statInfo, num) {
    num = num < statInfo.stat.numerical.min.length ? num : statInfo.stat.numerical.min.length;
    let total = this.calculateStat.total(statInfo.stat.general);
    let topItems = _.takeRight(statInfo.stat.numerical.max.sort(), num).reverse();
    let lastItems = _.take(statInfo.stat.numerical.min.sort(), num);

    return (
      <Table striped bordered condensed hover id={"statTable"}>
        <tbody>
          <tr>
            <td>資料筆數</td><td>{total}</td>
          </tr>
          <tr>
            <td>加總</td><td>{statInfo.stat.numerical.mean * total}</td>
          </tr>
          <tr>
            <td>平均</td><td>{Number(statInfo.stat.numerical.mean).toFixed(2)}</td>
          </tr>
          <tr>
            <td>標準差</td><td>{Number(statInfo.stat.numerical.std).toFixed(2)}</td>
          </tr>
          <tr>
            <td>
              <DropdownButton title={"最大 "+ topItems.length +" 筆"}>
                <MenuItem eventKey='1'>5</MenuItem>
                <MenuItem eventKey='2'>4</MenuItem>
              </DropdownButton>
            </td>
            <td>{topItems.join(", ")}</td>
          </tr>
          <tr>
            <td>最小 5 筆</td><td> {lastItems.join(", ")}</td>
          </tr>
        </tbody>
      </Table>
    );
  },

  renderRawContent: function(statInfo) {
    let total = this.calculateStat.total(statInfo.stat.general);
    let values = _.sortBy(statInfo.stat.general.values, this.state.sortBy);
    if(this.state.sortingMethod === "desc"){
      values = values.reverse();
    }
    let statRows = _.map(values, function(row, key){
      return (
        <tr key={key}>
          <td>{row.label}</td>
          <td>{row.value}</td>
          <td>{(row.value / total * 100).toFixed(2)}%</td>
        </tr>
      );
    });

    return (
      <Table id={"rawDataTable"} striped bordered condensed hover>
        <tbody>
          <tr>
            <td>Label Name</td><td>Count</td><td>%</td>
          </tr>
          {statRows}
          <tr className={"info"}>
            <td width="40%">Total Count</td>
            <td width="30%">{total}</td>
            <td width="30%">100%</td>
          </tr>
        </tbody>
      </Table>
      );
  },

  handleCopyTableContent: function() {
    let el = null;
    if(this.props.isNumerical && this.state.activeKey === 2){ //if statInfo is numerical && focused on statTable
      el = document.getElementById("statTable");
    }else{
      el = document.getElementById("rawDataTable");
    }

    let body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(el);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(el);
          sel.addRange(range);
        }
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
    }
    document.execCommand("copy");
    sel.removeAllRanges();
    alert("已經複製到剪貼簿");
    this.handleSelectTab(this.state.activeKey);
  },

  handleSelectTab: function(key) {
    this.setState({
      activeKey: key
    });
  },

  handleSorting: function(by, method) {
    this.setState({
      sortBy: by,
      sortingMethod: method
    });
    this.handleSelectTab(this.state.activeKey);
  },

  render: function() {

    let copyTableButton = (
      <NavItem className={"pull-right"} onClick={this.handleCopyTableContent}>
        <i className="fa fa-clipboard"></i>
      </NavItem>
    );
    let sortingDropdown = (
      <DropdownButton title="sort by" className={"pull-right"} >
        <MenuItem onClick={this.handleSorting.bind(null, "label", "asc")}><i className="fa fa-sort-alpha-asc"> Label Name </i></MenuItem>
        <MenuItem onClick={this.handleSorting.bind(null, "label", "desc")}><i className="fa fa-sort-alpha-desc"> Label Name </i></MenuItem>
        <MenuItem onClick={this.handleSorting.bind(null, "value", "asc")}><i className="fa fa-sort-numeric-asc"> Value </i></MenuItem>
        <MenuItem onClick={this.handleSorting.bind(null, "value", "desc")}><i className="fa fa-sort-numeric-desc"> Value </i></MenuItem>
      </DropdownButton>
    );

    if(this.props.isNumerical){
      return (
        <div>
          <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelectTab}>
            <NavItem eventKey={1}>原始資料</NavItem>
            <NavItem eventKey={2}>敘述統計</NavItem>
            {copyTableButton}
            {sortingDropdown}
          </Nav>
          <TabbedArea activeKey={this.state.activeKey}>
            <TabPane eventKey={1}>{this.renderRawContent(this.props.statInfo)}</TabPane>
            <TabPane eventKey={2}>{this.renderNumericalStat(this.props.statInfo, 5)}</TabPane>
          </TabbedArea>
        </div>
      );
    }else{
      return (
        <div>
          <Nav bsStyle="tabs" activeKey={1}>
            <NavItem eventKey={1}>原始資料</NavItem>
            {copyTableButton}
            {sortingDropdown}
          </Nav>
          <TabbedArea defaultActiveKey={1} activeKey={1}>
            <TabPane eventKey={1} >{this.renderRawContent(this.props.statInfo)}</TabPane>
          </TabbedArea>
        </div>

      );
    }
  }
});

module.exports = DDPageViewStatTable;
