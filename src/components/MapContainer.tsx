import React,{useEffect} from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapContainer = ({searchPlace}:any) =>{
  useEffect(()=>{

    const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

    //지도를 담을 DOM 영역
    let container = document.getElementById('map');
    //지도를 생성할 때 필요한 기본 옵션
    let options = {
      center : new window.kakao.maps.LatLng(33.450701, 126.570667),
      level : 3
    };

    let map = new window.kakao.maps.Map(container, options);

    
    
    const placesSearchCB = (data:any,status:any,pagination:any):any =>{
      if(status===window.kakao.maps.services.Status.OK){
        
        let bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0 ; i < data.length; i++){
          displayMaker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y,data[i].x));
        }
        map.setBounds(bounds)
      }
    }
    let ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchPlace,placesSearchCB);
    
    const displayMaker = (place:any):any =>{
      let maker = new window.kakao.maps.Marker({
        map:map,
        position : new window.kakao.maps.LatLng(place.y,place.x)
      });

      window.kakao.maps.event.addListener(maker,'click',()=>{
        infowindow.setContent('<div style="padding:5px; font-size:12px;">'+place.place_name + '</div>');
        infowindow.open(map,maker)
      })
    }

  },[searchPlace])
  return(
    <div id="map" style={{width : "100vw", height : "100vh"}}/>
  );
}

export default MapContainer;