import { useEffect, useRef } from "react";
//useRef는 저장공간 또는 DOM요소에 접근하기 위해 사용되는 Hook. 여기서 ref는 reference(참조)를 뜻함. useRef로 관리하는 값은 값이 변해도 화면이 렌더링 되지 않음. 
const Naver = () =>{
  // const mapElement = useRef(null);

  // useEffect(()=>{
  //   const {naver} = window;
  //   if(!mapElement.current || !naver) return;

  //   const location = new naver.maps.LatLng(36.3514622, 127.3399813);
  //   const mapOptions: naver.maps.MapOptions = {
  //     center : location,
  //     zoom: 17,
  //     zoomControl: true,
  //     zoomControlOptions: {
  //       position: naver.maps.Position.TOP_RIGHT,
  //     },
  //   };
  //   const map = new naver.maps.Map(mapElement.current, mapOptions);
  //   new naver.maps.Marker({
  //     position: location,
  //     map,
  //   });
  // },[]);

  // return<div ref = {mapElement} style = {{minHeight:'400px'}} />;

  useEffect(()=>{
    console.log("렌더링 완료")
    let map =null
    let marker = null
    const initMap = () =>{
      map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(36.3514622, 127.3399813),
        zoom: 13
      })

      marker = new naver.maps.Marker({
        position : new naver.maps.LatLng(36.3514622, 127.3399813),
        map: map
        // icon: {
        //   content: `
        //   <img alt = "marker" src={vectoricon} />
        //   `  
        //   }
      })
    }
    initMap()
  }, [])



  return(
    <div id = "map" style = {{width: "100vw", height: "100vh"}} />
    
  )
}

export default Naver;