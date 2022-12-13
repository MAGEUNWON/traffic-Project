const {merge} = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development", //개발모드
  devtool: "inline-source-map",
  // devtool은 개발을 용이하게 하기 위해 소스맵을 제공하는 옵션. 옵션이 많음. (eval, eval-source-map, cheap-module-eval-source-map, inline-source-map, cheap-module-source-map 등등)
  // 개발용은 수정이 빈번하고 디버깅을 해야하기 때문에 용량보다 빌드 시간, 로그, 디버깅이 중요함. 
  // 로그, 디버깅, 번들링 타임을 고려하면 개발용은 inline-source-map옵션을 사용하고 webpack-dev-server 명령어를 사용하는게 가장 좋음. 
  devServer: {
    open: false,
    hot: true, //테스트 구동과 동시에 기본페이지가 오픈됨
    compress: true,
    port: 3000,
    historyApiFallback: true, //다중 엔트리 일 때 시작시 기본 사용할 페이지를 지정해 줄 수 있음. 
    liveReload: true,
  },
  // 얘는 devtool 속성을 추가한 것. 그 다음, chrome의 개발자 도구 설정에서 Enable source maps를 활성화 해주어야 함. 오류가 난 js링크 클릭하면 원본 소스로 확인 가능. 
  output: {
    // output 속성은 번들 결과물의 경로를 설정하고 이름을 지정하는 옵션 등을 추가할 수 있음. (번들링 결과물 설정)
    // entry 설정은 항상 프로젝트 디렉터리 내부이기 때문에 상대 경로로 하는 반면에 output 설정은 항상 프로젝트 디렉터리 내부라는 보장이 없으므로 절대 경로로 함. 
    filename: "[name].[contenthash].js", //번들파일 이름
    publicPath: "/", //웹팩 미들웨어 장소, 얜 앞에 . 없어야됨 ./하면 에러
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i, //scss, sass, css templating
        use: ["style-loader", "css-loader", "sass-loader"],
        // use에 선언된 가장 오른쪽의 로더가 먼저 실행(오른쪽에서 왼쪽 순으로) sass 파일을 읽어 css로 넘김. css 파일을 읽음. css 파일을 sytle태그로 만들어 head에 넣어줌 
      },
    ],
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

// style-loader 는 dev 환경에서 사용하길 추천. 얘는 injects CSS into DOM using multiple 하기에 css 파일을 추출하는 것보다 빠름. 

// npm run dev 하면 develop파일 실행, 서버를 띄우려면 dev를 써야함. 
// package.json의 scripts 에서 dev 말고 start하면 npm run start 하면 됨
// npm run build 하면 prod 파일 실행