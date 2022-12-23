import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import "./App.css";
import axios from "axios";

const App = () => {
    const [maptype, setMaptype] = useState<string>("traffic");
    const [parkingLot, setParkoingLot] = useState<any>([{}]);
    const [accidentData, setAccidentData] = useState<any>([{}]);
    const [datas, setDatas] = useState<any>("");

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axios.get(
                    "http://127.0.0.1:5000/accident" // 돌발
                );
                setAccidentData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        const getparking = async () => {
            try {
                let response = await axios.get(
                    "http://127.0.0.1:5000/parkinglot" // 주차장
                );
                setParkoingLot(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/cctv`);
                setDatas(res.data);
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchData();
        getData();
        getparking();
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
                <Map
                    parkingData={parkingLot}
                    accidentData={accidentData}
                    datas={datas}
                ></Map>
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
