import React, {useEffect} from "react";

declare global {
  interface Window{
    kakao: any;
  }
}

const Kakao = () =>{

  useEffect(()=>{
    let container = document.getElementById('map') as HTMLElement;
    let options = {
      center: new window.kakao.maps.LatLng(36.3514622, 127.3399813),
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);
  }, [])

  return (
    <div id = "map" style = {{width: "100vw", height: "100vh"}} />
  );
}

export default Kakao