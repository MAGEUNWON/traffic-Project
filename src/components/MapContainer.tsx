import React,{useEffect} from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapContainer = () =>{
  useEffect(()=>{

    //지도를 담을 DOM 영역
    let container = document.getElementById('map') as Element;
    //지도를 생성할 때 필요한 기본 옵션
    let options = {
      center : new window.kakao.maps.LatLng(33.450701, 126.570667),
      level : 3
    };

    let map = new window.kakao.maps.Map(container, options);
  },[])
  return(
    <div id="map" style={{width : "100vw", height : "100vh"}}/>
  );
}

export default MapContainer;