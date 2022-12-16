import React,{useEffect} from "react";
//카카오 버전
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
    //지도를 생성!
    let map = new window.kakao.maps.Map(container, options);

    
    //키워드 검색이 완료됐을때 호출되는 콜백 함수
    const placesSearchCB = (data:any,status:any,pagination:any):any =>{
      if(status===window.kakao.maps.services.Status.OK){
        
        //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 
        // latLngBounds 객체에 좌표를 추가한다.
        let bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0 ; i < data.length; i++){
          displayMaker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y,data[i].x));
        }
        //검색된 장소 위치를 기준으로 지도 위치를 재설정
        map.setBounds(bounds)
      }
    }
    //장소 검색 객체를 생성
    let ps = new window.kakao.maps.services.Places();
    // search.tsx에서 입력된 키워드를 검색
    ps.keywordSearch(searchPlace,placesSearchCB);
    

    // 마커 생성
    const displayMaker = (place:any):any =>{
      //마커를 생성하고 지도에 출력
      let maker = new window.kakao.maps.Marker({
        map:map,
        position : new window.kakao.maps.LatLng(place.y,place.x)
      });
      // 마커에 클릭 이벤트를 추가
      window.kakao.maps.event.addListener(maker,'click',()=>{
        // 마커를 클릭하면 장소명이 인포윈도우에 출력된다.
        infowindow.setContent('<iframe width="500" height ="300" src = "http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=GVjHkAH6NW3wdeJs3xypMhq52MGhEen3IP85ShkXpZ5dkKm81mXBfHzyduE0BFv&cctvid=E07002&cctvName=%25EA%25B0%2580%25EC%259E%25A5%25EA%25B5%2590%25EC%2598%25A4%25EA%25B1%25B0%25EB%25A6%25AC&kind=E&cctvip=118&cctvch=null&id=CCTV15&cctvpasswd=null&cctvport=null"/>');        
        infowindow.open(map,maker)
      })
    }

  },[searchPlace])
  return(
    <div id="map" style={{width : "100vw", height : "100vh"}}>
      
    </div>
  );
}

export default MapContainer;