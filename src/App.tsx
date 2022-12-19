import React from "react";
import MapContainer from './components/MapContainer'




declare global {
  interface Window {
    kakao: any;
  }
}

const App = () =>{
  return (

    ////카카오
    <div className="root">
      <MapContainer/>
    </div>
    // <div className="root">
    //   <Its/>
    // </div>
  )
}

export default App;