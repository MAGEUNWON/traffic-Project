import React from "react";
import MapContainer from './components/MapContainer'
import Search from './components/Search'
import Navermap from './components/NaverMapContainer'


declare global {
  interface Window {
    kakao: any;
  }
}

const App = () =>{
  return (
    //네이버
    <div className="root">
      <Navermap/>
    </div>
    ////카카오
    // <div className="root">
    //   <Search/>
    // </div>
  )
}

export default App;