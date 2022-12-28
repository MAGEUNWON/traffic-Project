import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import FunctionMap from "./components/FunctionMap";
import SectionTable from "./components/sectionTable";
import FunctionBtn from "./components/FunctionBtn";
import Map from "./components/Map";

import "./App.css";

const App = () => {
    const [maptype, setMaptype] = useState<string>("traffic");
    const [value, setValue] = useState<string>("");
    const [searchplace, setSearchPlace] = useState("");

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
                <SectionTable setSearchPlace={setSearchPlace} />
                <FunctionBtn handlebuttonClick={handleChangeValue} />
            </section>
            {value === "" ? (
                <Map searchplace={searchplace} />
            ) : (
                <FunctionMap value={value} searchplace={searchplace} />
            )}
        </AppSet>
    );
};

{
    /* <div>
    <section>
        <div></div>
        <div></div>
    </section>

    <div>1</div>
    <div>2</div>
</div>; */
}

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
