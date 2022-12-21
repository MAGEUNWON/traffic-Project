import {createRoot} from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(<App />);


// 리액트 18의 createRoot를 쓸 때 메소드가 원하는 파라미터 타입은 element | DocumentFragment이지만, document.getElementById는 HtmlElement거나 null을 반환한게 됨. 그러므로 as Element를 이용하여 유형을 정의해 주면 됨. 