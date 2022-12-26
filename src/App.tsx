import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import FunctionMap from "./components/FunctionMap";
import SectionTable from "./components/sectionTable";
import FunctionBtn from "./components/FunctionBtn";
import "./App.css";

const App = () => {
    const [maptype, setMaptype] = useState<string>("traffic");
    const [value, setValue] = useState<string>("");
    const [searchplace, setSearchPlace] = useState("");
    const mapRef = useRef();

    useEffect(() => {
        let container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
        //카카오 객체가 window 하위 객체라는 것을 정의해야 하므로 window.kakao로 변경해야 함
        let options = {
            center: new window.kakao.maps.LatLng(36.3492506, 127.3776511),
            level: 3, //지도의 확대, 축소 정도
        };

        let map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;
    }, []);

    const handleChangeValue = (value: string) => {
        setValue(value);
    };

    // const handleClick = (event:React.MouseEvent<HTMLElement>) => {
    //   "setOverlayMapTypeID('traffic')"
    // }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // event.currentTarget.value
        setMaptype(event.currentTarget.value);
    };

    return (
        <AppSet>
            <section>
                <SectionTable setSearchPlace={setSearchPlace} mapRef={mapRef} />
                <FunctionBtn handlebuttonClick={handleChangeValue} />
            </section>
            {value === "" ? (
                <Map searchplace={searchplace} mapRef={mapRef} />
            ) : (
                <FunctionMap value={value} searchplace={searchplace} />
            )}
        </AppSet>
    );
};

const AppSet = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    & > section {
        width: 420px;
        height: 100vh;
        background-color: #e7e7e7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
`;

export default App;
