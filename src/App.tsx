import React from "react";
import CCTV from './components/MapContainer'




declare global {
  interface Window {
    kakao: any;
  }
}

const App = () =>{
  return (

    //카카오
    <div className="root">
      <CCTV/>
    </div>
    // <div className="root">
    //   <Its/>
    // </div>
  )
}

export default App;