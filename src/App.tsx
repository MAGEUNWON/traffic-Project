import React, { useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import SectionTable from "./components/sectionTable";
import "./App.css";
import CCTV from "./components/CCTV";

const App = () => {
  const [maptype, setMaptype] = useState<string>("traffic");

  // const handleClick = (event:React.MouseEvent<HTMLElement>) => {
  //   "setOverlayMapTypeID('traffic')"
  // }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.currentTarget.value
    setMaptype(event.currentTarget.value);
  };
  // const [bringName,setBringName] = useState('');
  const [data, setData] = useState('Map')

  const getData = (e:string) => {
    setData(e)
    // console.log(e)
    // console.log(data)
  }
  // console.log(getData)

  return (
    <>
      <AppSet>
        <SectionTable setData={getData}/>
        {
          data === 'Map' ? (
            <Map/>
          ): data === 'CCTV' ? (
            <CCTV/>
          ) :
          null
        }      
      </AppSet>
    </>
  );
};

const AppSet = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-itmes: center;
  justify-content: center;
`;

export default App;