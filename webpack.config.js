var env = process.env.WEBPACK_ENV || "dev";
var entry;

if (env === "dev") {
  entry = [
    "webpack-dev-server/client?http://localhost:3001",
    "webpack/hot/dev-server",
    "./src/Index.jsx"
  ];
} else {
  entry = [
    "./src/Index.jsx"
  ];
}

var config = {
  entry: entry,
  output: {
    path: "./build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }, // use ! to chain loaders
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }, // use ! to chain loaders
      { test: /\.(ttf|eot|png|jpg|woff2|woff|svg)($|\?)/, loader: "url-loader?limit=100000" },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader?stage=0&optional=runtime"] },
    ]
  }
};

module.exports = config;
