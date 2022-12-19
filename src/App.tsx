import React, { useState } from "react";
import Kakao from "./components/kakaoMap";
// import Naver from "./components/naverMap";


const App = () =>{
  const [maptype,setMaptype] = useState<string>('traffic')

  // const handleClick = (event:React.MouseEvent<HTMLElement>) => {
  //   "setOverlayMapTypeID('traffic')"
  // }
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
    // event.currentTarget.value
    setMaptype(event.currentTarget.value)
  }

  return (
    
      <>
        <Kakao maptype={maptype}></Kakao>  
        <div className = "button">
          <button value="traffic" onClick={handleClick}>도로교통정보 보기</button>
          <button value="roadview" onClick={handleClick}>로드뷰 도로정보 보기</button>
          <button value="terrain" onClick={handleClick}>지형정보 보기</button>
          <button value="use_district" onClick={handleClick}>지적편집도 보기</button>
        </div>

      </>
    
    
  );
}

// const App = () =>{
//   return (
//     <div className="root">
//       <Naver></Naver>
//     </div>
    
//   );
// }

export default App;


