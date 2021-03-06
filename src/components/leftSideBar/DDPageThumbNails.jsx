const React = require("react");
const _ = require("lodash");
const {
  ListGroup, ListGroupItem
} = require("react-bootstrap");

let DDPageThumbNails = React.createClass({
  displayName: "DDPageThumbNails",
  propTypes: {
    pages: React.PropTypes.array
  },

  render: function() {
    let pages = this.props.pages;
    let pageThumbNails = _.map(pages, function(page, key){
      return  <ListGroupItem href={"#/page/"+page.id} key={key} header={page.humanName}><span className={"disabledColor"}>2015-01-01 00:00 </span></ListGroupItem>;
    });
    return (
      <div className={"DDPageThumbNails"}>
        <ListGroup>
          {pageThumbNails}
        </ListGroup>
      </div>
    );
  }
});

module.exports = DDPageThumbNails;
