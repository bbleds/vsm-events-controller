module.exports = {
  // tells wp where to start processing code
  entry: './admin/app/app.jsx',
  // tells wp where to put output
  output: {
    // path to folder -- __dirname is a node variable for current directory
    path: __dirname,
    // output file name
    filename: './admin/public/bundle.js'
  },
  // takes an extensions array - this is a list of extensions that we want to process
  resolve:{
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  // specify our loaders
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        // tell what we want babel loader to do with our files
        query:{
          // this is built into babel -- run them through this process
          presets: ['react', 'es2015', 'stage-0']
        },
        // run the above processes on the following files
        test: /\.jsx?$/,
        //specify which folders we dont want to have parsed
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
}
