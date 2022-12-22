import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import "./App.css";
import axios from "axios";

const App = () => {
  const [maptype, setMaptype] = useState<string>("traffic");
  const [parkingLot, setParkoingLot] = useState<any>([{}]);
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get("http://127.0.0.1:5000/parkinglot");
        setParkoingLot(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
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
        <Map parkingData={parkingLot}></Map>
      </AppSet>
    </>
  );
};

const AppSet = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
