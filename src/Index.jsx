require("./assets/stylesheet.css");
require("c3-react/node_modules/c3/c3.min.css");

let React = require("react");
let Router = require("react-router");
let { Route, DefaultRoute, RouteHandler } = Router;

const {
  Row, Col
} = require("react-bootstrap");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

const DDLeftSideBar = require("./components/leftSideBar/DDLeftSideBar.jsx");
const DDPanelView = require("./components/pagePanel/DDPanelView.jsx");
const DDPageView = require("./components/pageView/DDPageView.jsx");

// Initialize Fluxxor
// Stores
let DataStore = require("./stores/DataStore");
let stores = {
  DataStore: new DataStore()
};

// Actions
let DataActions = require("./actions/DataActions");
let actions = {
  DataActions: DataActions
};

// Flux
let flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

let Index = React.createClass({
  displayName: "Index",
  mixins: [FluxMixin, StoreWatchMixin("DataStore")],

  getStateFromFlux: function() {
    let flux = this.getFlux();
    return {
      DataStore: flux.store("DataStore").getState(),
    };
  },

  componentDidMount: function() {
    this.getFlux().actions.DataActions.getAllColInfos();
  },

  render: function() {
    let pages = this.state.DataStore.colInfos;
    return (
      <Row className={"DDWrapper"}>
        <Col md={2}>
          <DDLeftSideBar pages={pages}/>
        </Col>
        <Col md={10}>
          <RouteHandler pages={pages}/>
        </Col>
      </Row>
    );
  }
});

let routes = (
  <Route name="index" path="/" handler={Index}>
    <Route name="panel" path="/panel" handler={DDPanelView}/>
    <Route name="page" path="/page/:id" handler={DDPageView}/>
    <DefaultRoute handler={DDPanelView}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler flux={flux}/>, document.getElementById("container"));
});
