module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'react-input-slider.js',
    library: 'InputSlider',
    publicPath: "/builds/",
  },
  externals: {
    "react": "React"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }
    ]
  },
  devtool: "source-map"
};