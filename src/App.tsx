import React from "react";
import MapContainer from './components/MapContainer'

declare global {
  interface Window {
    kakao: any;
  }
}

const App = () =>{
  return (
    <div className="root">
      <MapContainer/>
    </div>
  )
}

export default App;