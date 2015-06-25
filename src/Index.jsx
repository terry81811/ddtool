require("./assets/stylesheet.css");

let React = require("react");
let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

// Flux
let flux = new Fluxxor.Flux();
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

const DDWrapper = require("./components/DDWrapper.jsx");


let Index = React.createClass({
  displayName: "Index",
  mixins: [FluxMixin],

  render: function() {
    return (
      <DDWrapper />
    );
  }
});

React.render(<Index flux={flux}/>, document.getElementById("container"));
