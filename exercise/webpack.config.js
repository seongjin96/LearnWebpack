var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'production',
  // webpack 변환 대상파일의 경로
  entry: './src/main.js',
  // 변환 대상파일의 정보를 담는 속성
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',  // cdn 배포 시 cdn 주소에 포함될 수 있게끔 속성을 정의할 수 있는 곳
    filename: 'build.js'
  },
  // loader의 속성을 정의할 수 있는 곳
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // javascript의 최신 문법들을 쵣한 많은 브라우저가 호환할 수 있게끔 변환해주는 도구
        exclude: /node_modules/ // 라이브러리와 관계되는 파일들이 들어가 있기 때문에 변환할 필요가 없어 배제
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  // 웹팩으로 파일 간의 연관관계를 해석해나갈때 파일의 해석 방식을 정의할 수 있는 곳
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // vue$ 표시가 들어가는 것은 해당 파일로 해석을 하겠다는 별칭
    },
    extensions: ['*', '.js', '.vue', '.json'] // ex> import {} from './math.js' => import {} from './math : 확장자(.js)를 붙이지 않아도 명시해주는 속성
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

// webpack 버전 4부터는 구성할 필요 없음
// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }