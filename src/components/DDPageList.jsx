const React = require("react");
const _ = require("lodash");
const {
  ListGroup, ListGroupItem
} = require("react-bootstrap");

//const DDPageThumbNail = require("./DDPageThumbNail.jsx");

const Fluxxor = require("fluxxor");
const FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

let DDPageList = React.createClass({
  displayName: "DDPageList",
  propTypes: {
    pages: React.PropTypes.array
  },

  render: function() {
    let pages = this.props.pages;
    let pageThumbNails = _.map(pages, function(page){
      return  <ListGroupItem header={"page"+page}>description for page {page}</ListGroupItem>;
    });
    return (
      <div className={"DDPageThumbNail"}>
        <ListGroup>
          {pageThumbNails}
        </ListGroup>
      </div>
    );
  }
});

module.exports = DDPageList;
