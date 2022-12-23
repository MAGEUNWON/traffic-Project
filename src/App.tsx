import { useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import FunctionMap from "./components/FunctionMap";
import SectionTable from "./components/sectionTable";
import FunctionBtn from "./components/FunctionBtn";
import "./App.css";


const App = () => {
  const [maptype, setMaptype] = useState<string>("traffic");
  const [value, setValue] = useState<string>("");
  
  const handleChangeValue = (value: string) => {
    setValue(value);
  } 

  // const handleClick = (event:React.MouseEvent<HTMLElement>) => {
  //   "setOverlayMapTypeID('traffic')"
  // }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.currentTarget.value
    setMaptype(event.currentTarget.value);
  };

  return (
    <AppSet>
      <SectionSet>
        <SectionTable />
        <FunctionBtn handlebuttonClick={handleChangeValue}/>
      </SectionSet>
      {value === "" ? (
        <Map />
      ) : (
        <FunctionMap value={value} />
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
`;

const SectionSet = styled.section`
  width: 20vw;
  height: 100vh;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default App;