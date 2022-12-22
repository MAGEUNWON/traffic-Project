import React, { useEffect, useState, useRef } from "react";
//useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook. 기본적으로 렌더링되고 난 직후마다 실행.
//useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됨.
//특정 값이 변경 될 때만 호출하고 싶은 경우에는 useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 됨.
import styled from "styled-components";
import axios from "axios";

declare global {
  interface Window {
    kakao: any;
  }
}
//리액트 쓸 때 전역으로 사용하기 위한 것. 컴포넌트 내부나 App.tsc에 kakao map을 선언해 줄것. 만들어 놓고 불러와서 사용하면 됨.

interface btnSet {
  value: string;
  con: string;
  [index: string]: string;
}

const Map = () => {
  const [mapTypes, SetMapTypes] = useState<string>("Roadmap");
  const [data, setData] = useState(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    SetMapTypes(e.currentTarget.value);
  };

  const ref = useRef("");

  ref.current = mapTypes;

  useEffect(() => {
    // console.log(maptype)
    console.log("렌더링 완료"); //useEffect는 React.StrictMode가 적용된 개발환경에서는 콘솔이 두번씩 찍힘.

    // axios.get(`http://127.0.0.1:5000/hazard`).then((response) => {
    //   console.log(response.data);
    //   setData(response.data);
    // });

    let container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
    //카카오 객체가 window 하위 객체라는 것을 정의해야 하므로 window.kakao로 변경해야 함
    let options = {
      center: new window.kakao.maps.LatLng(36.3492506, 127.3776511),
      level: 3, //지도의 확대, 축소 정도
    };

    let map = new window.kakao.maps.Map(container, options);

    // let mapTypeControl = new window.kakao.maps.mapTypeControl();
    // map.addControl(mapTypeControl, window.kakao.maps.ControlPosiiton.TOPRIGHT);

    // maptype === 'traffic'?  window.kakao.maps.MapTypeId.TRAFFIC:null
    // maptype === 'roadview'?  window.kakao.maps.MapTypeId.ROADVIEEW:null
    // maptype === 'use_district'?  window.kakao.maps.MapTypeId.USE_DISTRICT:null

    //버튼 클릭하면 호출 (clickEvent)
    let currentTypeId;
    let changeMapType;

    //maptype에 따라 지도에 추가할 지도타입을 결정

    if (ref.current === "Roadmap") {
      //로드뷰 도로정보 지도타입
      changeMapType = window.kakao.maps.MapTypeId.ROADMAP;
    } else if (ref.current === "Skyview") {
      //지형정보 지도타입
      changeMapType = window.kakao.maps.MapTypeId.HYBRID;
    } else if (ref.current === "roadview") {
      //지적편집도 지도타입
      changeMapType = window.kakao.maps.MapTypeId.ROADVIEW;
    }

    if (currentTypeId) {
      //이미 등록된 지도 타입이 있으면 제거
      map.removeOverlayMapTypeId(currentTypeId);
    }

    //maptype에 해당하는 지도타입을 지도에 추가
    map.addOverlayMapTypeId(changeMapType);

    //지도에 추가된 타입정보를 갱신
    currentTypeId = changeMapType;

    //지도에 현재 실시간 교통정보가 컬로로 표시되어 있는 라인 올림
    // map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC) //MapTypeId뒤에 TRAFFIC을 SKYVIEW 등으로 바꾸면 지도 형태가 바뀜, addOverlayMapTypeId는 removeOverlayMapTypeId로 바꾸면 추가한 지도타입 제거됨

    //마커가 표시될 위치
    let markerPosition = new window.kakao.maps.LatLng(36.3492506, 127.3776511);
    //마커 생성
    let marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    //마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
  }, [mapTypes]);

  console.log(data);

  const btnSet: btnSet[] = [
    { value: "Roadmap", con: "지도" },
    { value: "Skyview", con: "스카이뷰" },
    { value: "roadview", con: "로드뷰" },
  ];

  return (
    <>
      <div id="map" style={{ width: "80vw", height: "100vh" }} />
      <ButtonSet>
        {btnSet.map((value, index) => {
          return (
            <Button key={index} value={value.value} onClick={handleClick}>
              {value.con}
            </Button>
          );
        })}
      </ButtonSet>
    </>
  );
};

const ButtonSet = styled.div`
  display: flex;
  width: 250px;
  height: 30px;
  justify-content: space-evenly;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;
`;

const Button = styled.button`
  width: 60px;
  height: 50px;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

export default Map;