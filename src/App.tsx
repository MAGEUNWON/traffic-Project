import React from "react";
import MapContainer from './components/MapContainer'
import Search from './components/Search'

declare global {
  interface Window {
    kakao: any;
  }
}

const App = () =>{
  return (
    <div className="root">
      <Search/>
    </div>
  )
}

export default App;