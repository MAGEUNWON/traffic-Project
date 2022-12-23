import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import axios from "axios";
import "./App.css";

const App = () => {
  const [maptype, setMaptype] = useState<string>("traffic");
  const [parkingLot, setParkoingLot] = useState<any>([{}]);
  const [accidentData, setAccidentData] = useState<any>([{}]);
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/accident");
        console.log(response.data);
        setAccidentData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getparking = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/parkinglot");
        console.log(response.data);
        setParkoingLot(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    getparking();
  }, []);

  // const handleClick = (event:React.MouseEvent<HTMLElement>) => {
  //   "setOverlayMapTypeID('traffic')"
  // }
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   // event.currentTarget.value
  //   setMaptype(event.currentTarget.value);
  // };

  return (
    <>
      <AppSet>
        <Map parkingData={parkingLot} accidentData={accidentData}></Map>
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
