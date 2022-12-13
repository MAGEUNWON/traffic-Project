import React,{useEffect} from "react";
//네이버 버전
const {naver} = window;


const NaverMap =()=>{
  //랜더링 오류가 생겨서 useEffect를 사용하여 해결
  useEffect(()=>{
    //지도 설정 하는 곳
    const mapOptions ={
      center : new naver.maps.LatLng(37.3595704,127.105399),
      zoom :10,
    };
    const map = new naver.maps.Map("map",mapOptions);

  },[])
  //리턴으로 div를 반환
  return(
    <div id="map" style={{width : "100vw", height : "100vh"}}/>
  );
  
}

export default NaverMap
