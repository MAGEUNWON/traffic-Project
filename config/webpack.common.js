const HtmlWebpackPlugin = require("html-webpack-plugin");
// 웹팩에서 실행해서 나오는 결과물을 확인하기 위해서는 html 파일을 수동으로 작성해야 함. babel-loader에서 chunkhash를 사용하면 파일의 내용이 수정될 때마다 파일 이름이 변경되도록 할 수 있음. 이런 옵션 때문에 파일의 내용이 변경될 때마다 html 파일의 내용도 수정해야 함. 이러한 작업을 자동으로 하는 플러그인이 html-webpack-plugin임.(html 파일에 javascript 번들을 자동으로 묶어 줌)
const path = require("path");
const webpack = require("webpack");
// const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
// BundleAnalyzer는 Bundle 최적화 용도로 사용

module.exports = {
  entry:`${path.resolve(__dirname, "../src")}/index.tsx`,
  // entry는 애플리케이션이 실행되며 webpack이 번들링을 시작하는 곳. webpack은 entry point가 의존하는 다른 모듈과 라이브러리들을 찾아냄
  module: {
    rules: [
      // loader는 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 HTML, CSS등 웹 자원들을 변환할 수 있도록 도와줌. 자주 사용되는 로더는 babel, css, style, file-loader 등이 있음.
        // 기본적으로 webpack은 자바스크립트 및 JSON 파일만 해석 가능함. 하지만 loader를 사용하면 webpack이 다른 포맷의 파일을 처리하고 이를 앱에서 사용할 수 있는 모듈로 변환 할 수 있음.
      {
        test: /\.(ts|tsx|js|jsx)$/,
        // loader를 적용시킬 파일 유형 명시(정규 표현식 사용)
        use: "babel-loader",
        // 해당 파일에 적용할 loader 명시
        exclude: /node_modules/,
        // loader를 배제시킬 파일 명시
      },
    ],
  },
  plugins: [
    // webpack으로 변환한 파일에 추가적인 기능을 제공할 수 있음. 플러그인은 해당 결과물의 형태를 바꿔 주는 역할을 수행. 예를 들어 번들된 JS를 난독화 한다던가 특정 텍스트를 추출하는 용도로 사용할 수 있음. 
    // 분리된 css, js 파일들을 각각 html에 link 자동화
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    // 이 설정을 해놔야 App.tsx에서 import React from 'react'를 생략할 수 있음. 
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    // 번들링 할 파일 확장자
  },
};