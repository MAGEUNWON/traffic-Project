import React, { useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import SectionTable from "./components/sectionTable";
import "./App.css";

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

const AppSet = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-itmes: center;
  justify-content: center;
`;

export default App;