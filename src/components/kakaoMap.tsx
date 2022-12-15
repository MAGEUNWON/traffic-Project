import React, {useEffect} from "react";
//useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook. 기본적으로 렌더링되고 난 직후마다 실행.
//useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됨.
//특정 값이 변경 될 때만 호출하고 싶은 경우에는 useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 됨. 

declare global {
  interface Window{
    kakao: any;
  }
}
//리액트 쓸 때 전역으로 사용하기 위한 것. 컴포넌트 내부나 App.tsc에 kakao map을 선언해 줄것. 만들어 놓고 불러와서 사용하면 됨. 

const Kakao = ({maptype}:{maptype:any}) =>{
  useEffect(()=>{
    // console.log(maptype)
    console.log("렌더링 완료") //useEffect는 React.StrictMode가 적용된 개발환경에서는 콘솔이 두번씩 찍힘. 
    let container = document.getElementById('map') as HTMLElement;  //지도를 담을 영역의 DOM 레퍼런스
    //카카오 객체가 window 하위 객체라는 것을 정의해야 하므로 window.kakao로 변경해야 함
    let options = {
      center: new window.kakao.maps.LatLng(36.3514622, 127.3399813),
      level: 3 //지도의 확대, 축소 정도
    };

    let map = new window.kakao.maps.Map(container, options);

    // maptype === 'traffic'?  window.kakao.maps.MapTypeId.TRAFFIC:null
    // maptype === 'roadview'?  window.kakao.maps.MapTypeId.ROADVIEEW:null
    // maptype === 'use_district'?  window.kakao.maps.MapTypeId.USE_DISTRICT:null

    //버튼 클릭하면 호출 (clickEvent)
      let currentTypeId;
      let changeMapType;
      
      //maptype에 따라 지도에 추가할 지도타입을 결정
      if(maptype === 'traffic'){ //교통정보 지도타입
        changeMapType = window.kakao.maps.MapTypeId.TRAFFIC;
      } else if(maptype === 'roadview'){ //로드뷰 도로정보 지도타입
        changeMapType = window.kakao.maps.MapTypeId.ROADVIEW;
      } else if(maptype === 'terrain') { //지형정보 지도타입
        changeMapType = window.kakao.maps.MapTypeId.TERRAIN;
      } else if(maptype === 'use_district'){ //지적편집도 지도타입
        changeMapType = window.kakao.maps.MapTypeId.USE_DISTRICT;
      }

      if(currentTypeId){ //이미 등록된 지도 타입이 있으면 제거
        map.removeOverlayMapTypeId(currentTypeId);
      }

      //maptype에 해당하는 지도타입을 지도에 추가
      map.addOverlayMapTypeId(changeMapType); 

      //지도에 추가된 타입정보를 갱신
      currentTypeId = changeMapType;

    //지도에 현재 실시간 교통정보가 컬로로 표시되어 있는 라인 올림
    // map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC) //MapTypeId뒤에 TRAFFIC을 SKYVIEW 등으로 바꾸면 지도 형태가 바뀜, addOverlayMapTypeId는 removeOverlayMapTypeId로 바꾸면 추가한 지도타입 제거됨

    //마커가 표시될 위치
    let markerPosition = new window.kakao.maps.LatLng(36.3514622, 127.3399813);
    //마커 생성
    let marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    //마커가 지도 위에 표시되도록 설정
    marker.setMap(map)

    

  }, [maptype])


  return (
    <>
    <div id = "map" style = {{width: "70vw", height: "70vh"}} /> 
    </>
  );
}

export default Kakao