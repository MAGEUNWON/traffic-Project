const {merge} = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css 파일을 추출해주는 플러그인. HTML에 css를 알아서 link 해줌
// 이건 prod환경에서 사용 추천. css 파일을 추출하게 되면 css파일과 js파일을 parallel load(한꺼번에 출력으로 싣는 것) 할 수 있어 사용자가 페이지를 빠르게 load 할 수 있음. (dev 환경은 style-loader 추천)
// import MiniCssExtractPlugin from "mini-css-extract-plugin";

const TerserPlugin = require("terser-webpack-plugin");
// 자동으로 최적화적용. 번들 사이즈 줄임
// import TerserPlugin from "terser-webpack-plugin";

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// import CssMinimizerPlugin from "css-minimizer-webpack-plugin"

module.exports = merge(common, {
  mode: "production", //배포 모드
  devtool: "cheap-module-source-map",
  // 소스 맵(source map) 이라고함. 소스 맵은 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능. 
  // 배포용은 수정하면서 작업하는게 아니기 때문에 빌드 시간, 로그, 디버깅보다 용량이 제일 중요 
  // 때문에 용량이 가장 작은 cheap-module-source-map 옵션을 사용하고 webpack 명령어를 사용하는게 가장 좋음
  output: {
    filename: "[name].[contenthash].js", //번들파일 이름
    path: path.resolve(__dirname, "../dist"), //빌드되는 파일이 만들어지는 위치, __dirname: 현재 디렉토리
    publicPath:"./", // 얜 앞에 . 있어야함. / 얘만 쓰면 렌더링이 안됨
    clean: true,
  },
  // 로더 설정
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i, //loader를 적용시킬 파일 정규식 명시
        use: [ //사용할 loader
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
    },
    // 이렇게 설정해 두면 엔트리 포인트가 상당히 줄어듬
  },
  performance: {
    // performance는 webpack이 정해진 파일 제한을 초과하는 에셋과 엔트리 포인트에 대해 알릴 방법을 제어할 수 있음. 에셋이 250kb 초과할 때 기준
    hints: false,
    // 힌트를 켜거나 끔. 힌트가 발견되는 wepback에 오류나 경고를 표시하도록함. 250kb를 초과하는 에셋이 생성된 경우. 
    maxEntrypointSize: 512000,
    // 엔트리 포인트는 특정 항목의 초기 로드 시간 동안 사용될 모든 에셋을 나타냄. webpack이 최대 엔트리 포인트 크기(단위:bytes)를 기준으로 성능 힌트를 내보낼 시기를 제어함. 
    maxAssetSize: 512000, 
    // 에셋은 webpack에서 내보낸 파일. 이 옵션은 webpack이 개별 에셋 크기(단위 :bytes)를 기준으로 성능 힌트를 내보낼 시기를 제어함. 
  },
});


// loader의 문법 : module이라는 키를 사용하는데 이는 loader의 배열인 rules라 불리는 다른 속성을 구성하고 있음. 우리가 모듈로 취급하길 원하는 각각의 파일은 rules 배열에 객체로 추가해야 함. 모든 객체는 두개의 속성으로 구성되어 있음. 
// 하나는 test로 파일의 타입을 정함.
// 다른 하나는 use로 loader로 이루어진 배열임. use에 정의된 loader는 오른쪽부터 왼쪽으로 불러옴. loader를 정의할 때 순서는 중요함. 

// css-loader는 css 파일을 불러오는데 사용. style-loader는 DOM에서 스타일 시트를 불러오는데 사용. sass-loader는 sass파일을 import해 불러오기 위해 사용

// 웹팩에서 사용되는 모드는 개발(development)와 생산(production)이 있음. 
// 개발 모드에서는 더 줄이는 작없이 없음. 웹팩은 단순히 모든 js코드를 쓰고 브라우저에서 읽어서 어플리케이션을 빠르게 reload함.
// 생산모드에 웹팩은 많은 최적화를 적용. terser-webpack-plugin을 통해 자동으로 최적화를 적용하고 번들 사이즈를 줄임. 또한 production을 위해 process.env.NODE_ENV 와 같은 환경 변수 설정을 통해 퍼포먼스를 향상시키
// 생산모드에서 웹팩을 사용하기 위해서는 package.json에 다른 스크립트를 추가함. 

// 최적화 -코드 분리는 큰 번들을 피하기 위한 최적화 기법. 의존의 중복 역시 피함. 사용자가 버튼을 클릭하거나, 라우트가 변경되거나 등등의 동작을 할 때 원하는 코드의 조각을 불러옴. 이 코드 조각은 덩어리(chunk)라는 이름으로 불림
// 웹팩에는 어플리케이션의 초기 번들 크기는 244kb 이하로 해야된다는 제한이 있음. 웹팩에서 코드 분리를 하기 위한 방법은 3가지가 있음.
// 1. 여러개의 엔트리 포인트를 갖음
// 2. optimization.splitChunks 사용
// 3. 동적 import
// 1번은 작은 프로젝트에서 잘 작동하지만 복잡하거나 큰 프로젝트에서는 그렇지 않음. 
// 3번은 조건에 따라 코드를 불러옴. 이러한 접근법은 React와 Vue에서 널리 사용됨. 우리는 사용자 인터랙션에 기반해 코드를 불러오거나 route 변경에 따라 불러옴. 

// clean-webpack-plugin은 웹팩을 실행할 때마다 기존에 있던 번들 파일을 깔끔히 지우고 싶은 경우에 사용. 쓰려면 일단 설치. 

// 소스 맵은  배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능. 보통 서버에 배포를 할 때 성능 최적화를 위해 HTML, CSS, JS 같은 웹 자원들을 압축함. 만약 이런 압축하여 배포한 파일에서 에러가 나면 소스 맵을 이용해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인하여 디버깅 할 수 있음. 