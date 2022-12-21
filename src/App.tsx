import React, { useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import SectionTable from "./components/sectionTable";
import "./App.css";
// import Naver from "./components/naverMap";

const App = () => {
  const [maptype, setMaptype] = useState<string>("traffic");

  // const handleClick = (event:React.MouseEvent<HTMLElement>) => {
  //   "setOverlayMapTypeID('traffic')"
  // }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.currentTarget.value
    setMaptype(event.currentTarget.value);
  };

  return (
    <>
      <AppSet>
        <SectionTable></SectionTable>
        <Map></Map>
      </AppSet>
    </>
  );
};

{
  /* <div className = "button">
          <button value="traffic" onClick={handleClick}>도로교통정보 보기</button>
          <button value="roadview" onClick={handleClick}>로드뷰 도로정보 보기</button>
          <button value="terrain" onClick={handleClick}>지형정보 보기</button>
          <button value="use_district" onClick={handleClick}>지적편집도 보기</button>
        </div> */
}

const AppSet = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-itmes: center;
  justify-content: center;
`;

export default App;
