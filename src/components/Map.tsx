import React, { useEffect, useState, useRef } from "react";
//useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook. 기본적으로 렌더링되고 난 직후마다 실행.
//useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됨.
//특정 값이 변경 될 때만 호출하고 싶은 경우에는 useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 됨.
import styled from "styled-components";
import "./Map.css";
import axios from "axios";
import { Hazard } from "./function";
import SectionTable from "./sectionTable";
// import Hazard from "./function";
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

const Map = ({ parkingData, accidentData }: any) => {
  const [mapTypes, SetMapTypes] = useState<string>("Roadmap"); //지도 타입 바뀌는 용도
  const [data, setData] = useState<any>([{}]); //api 담을 용도
  const [kakaoMap, setKakaoMap] = useState(); //map 밖에서 쓰려고 담는 용도
  const [polygonData, setPolygonData] = useState<any>([[]]);

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

    //axios로 도로별위험요소 api 불러옴. data usestate에 담아줌
    axios.get(`http://127.0.0.1:5000/hazard/polygon`).then((response) => {
      // console.log(response.data[0].ADDRESS_JIBUN);
      setPolygonData(response.data);
    });
    // console.log(data);

    let container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
    //카카오 객체가 window 하위 객체라는 것을 정의해야 하므로 window.kakao로 변경해야 함

    let options = {
      // center: new window.kakao.maps.LatLng(36.3492506, 127.3776511),
      // 대전 센터
      // center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      // 서울 센터
      center: new window.kakao.maps.LatLng(
        36.40865606700658,
        127.40238667286401
      ),
      // 위험지역
      level: 5, //지도의 확대, 축소 정도
    };

    let map = new window.kakao.maps.Map(container, options);
    setKakaoMap(map);

    // console.log(areas[0].path[0]); //La
    // for (let i = 0, len = areas.length; i < len; i++) {
    //   displayArea(areas[i]);
    // }

    // function displayArea(area: any) {
    //   let polygon = new window.kakao.maps.Polygon({
    //     map: map,
    //     path: area.path,
    //     strokeWeight: 2,
    //     strokeColor: "#004c80",
    //     strokeOpacity: 0.8,
    //     fillColor: "#fff",
    //     fillOpacity: 0.7,
    //   });

    //   window.kakao.maps.event.addListener(
    //     polygon,
    //     "mouseover",
    //     (mouseEvent: any) => {
    //       polygon.setOptions({ fillColor: "#09f" });
    //       customOverlay.setContent('<div class="area">' + area.name + "</div>");

    //       customOverlay.setPosition(mouseEvent.latLng);
    //       customOverlay.setMap(map);
    //     }
    //   );

    //   window.kakao.maps.event.addListener(
    //     polygon,
    //     "mousemove",
    //     (mouseEvent: any) => {
    //       customOverlay.setPosition(mouseEvent.latLng);
    //     }
    //   );

    //   window.kakao.maps.event.addListener(polygon, "mouseout", () => {
    //     polygon.setOptions({ fillColor: "#fff" });
    //     customOverlay.setMap(null);
    //   });

    //   window.kakao.maps.event.addListener(
    //     polygon,
    //     "click",
    //     (mouseEvent: any) => {
    //       var content =
    //         '<div class="info">' +
    //         '   <div class="title">' +
    //         area.name +
    //         "</div>" +
    //         '   <div class="size">총 면적 : 약 ' +
    //         Math.floor(polygon.getArea()) +
    //         " m<sup>2</sup></div>" +
    //         "</div>";

    //       infowindow.setContent(content);
    //       infowindow.setPosition(mouseEvent.latLng);
    //       infowindow.setMap(map);
    //     }
    //   );
    // }

    setKakaoMap(map); //map useEffect 밖에서 쓰려고 담은 것.

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
    let markerPosition = new window.kakao.maps.LatLng(
      36.40865606700658,
      127.40238667286401
    );
    //마커 생성

    console.log(markerPosition);
    let marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    //마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
  }, [mapTypes]);

  // console.log(polygonData);
  const polygonArr = [];
  console.log(polygonData);
  console.log(polygonData[0][0]);
  console.log(polygonData.length);
  for (let i = 0; i < polygonData.length; i++) {
    polygonArr.push(
      new window.kakao.maps.LatLng(polygonData[i][1], polygonData[i][0])
    );
  }
  console.log(polygonArr);

  const area: any[] = [
    new window.kakao.maps.LatLng(37.584651324803644, 126.88883849288884),
    new window.kakao.maps.LatLng(37.57082994377989, 126.9098094620638),
    new window.kakao.maps.LatLng(37.56510367293256, 126.92601582346325),
    new window.kakao.maps.LatLng(37.5633319104926, 126.92828128083327),
    new window.kakao.maps.LatLng(37.55884751347576, 126.92659242918415),
    new window.kakao.maps.LatLng(37.55675317809392, 126.93190919632814),
    new window.kakao.maps.LatLng(37.555098093384, 126.93685861757348),
    new window.kakao.maps.LatLng(37.55654562007193, 126.9413708153468),
    new window.kakao.maps.LatLng(37.557241466445234, 126.95913438471307),
    new window.kakao.maps.LatLng(37.55908394430372, 126.96163689468189),
    new window.kakao.maps.LatLng(37.55820141918588, 126.96305432966605),
    new window.kakao.maps.LatLng(37.554784413504734, 126.9617251098019),
    new window.kakao.maps.LatLng(37.548791603525764, 126.96371984820232),
    new window.kakao.maps.LatLng(37.54546318600178, 126.95790512689311),
    new window.kakao.maps.LatLng(37.54231338779177, 126.95817394011969),
    new window.kakao.maps.LatLng(37.539468942052544, 126.955731506394),
    new window.kakao.maps.LatLng(37.536292068277106, 126.95128907260018),
    new window.kakao.maps.LatLng(37.53569162926515, 126.94627494388307),
    new window.kakao.maps.LatLng(37.53377712226906, 126.94458373402794),
    new window.kakao.maps.LatLng(37.54135238063506, 126.93031191951576),
    new window.kakao.maps.LatLng(37.539036674424615, 126.9271006565075),
    new window.kakao.maps.LatLng(37.54143034750605, 126.9224138272872),
    new window.kakao.maps.LatLng(37.54141748538761, 126.90483000187002),
    new window.kakao.maps.LatLng(37.548015078285694, 126.89890097452322),
    new window.kakao.maps.LatLng(37.56300401736817, 126.86623824787709),
    new window.kakao.maps.LatLng(37.57178997971358, 126.85363039091744),
    new window.kakao.maps.LatLng(37.57379738998644, 126.85362646212587),
    new window.kakao.maps.LatLng(37.57747251471329, 126.864939928088),
    new window.kakao.maps.LatLng(37.5781913017327, 126.87625939970273),
    new window.kakao.maps.LatLng(37.57977132158497, 126.87767870371688),
    new window.kakao.maps.LatLng(37.584440882833654, 126.87653889183002),
    new window.kakao.maps.LatLng(37.59079311146897, 126.88205386700724),
    new window.kakao.maps.LatLng(37.584651324803644, 126.88883849288884),
  ];
  console.log(area);
  let polygon = new window.kakao.maps.Polygon({
    path: polygonArr, // 좌표배열
    strokeWeight: 2, // 선 두께
    strokeColor: "#39DE2A", // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
    fillColor: "#A2FF99", // 채우기 색깔입니다
    fillOpacity: 0.8, // 채우기 불투명도 입니다
  });

  polygon.setMap(kakaoMap);

  console.log(data);
  // console.log(kakaoMap);

  // let coordinates = [];
  // let desc = '';
  // let polygons = [];

  // const displayArea = (coordinates: any, desc: any) => {
  //   let path = [];
  //   let polygons = [];

  //   coordinates[0].forEach((coordinates: any) => {
  //     let polygon = {};
  //     polygon.x = coordinates[1];
  //     polygon.y = coordinates[0];
  //     polygons.push(polygon);
  //   });
  // };

  //지도 타입 바뀌는 props 값 정해 놓은 것.
  const btnSet: btnSet[] = [
    { value: "Roadmap", con: "지도" },
    { value: "Skyview", con: "스카이뷰" },
    { value: "roadview", con: "로드뷰" },
  ];

  // console.log(data); useEffect 밖에서 api 데이터 찍어야 나옴. 안에서는 null값 나옴
  // let position = [];
  // for (let i = 0; i < data.length; i++) {
  //   //api 데이터 빈 배열에 담아줌. 일단 필요어 없어서 주석처리함.
  //   // console.log(Object.keys(data[i]).length);
  //   // let content = {
  //   //   ADDRESS: data[i].ADDRESS_NEW,
  //   //   LINK_ID: data[i].LINK_ID,
  //   //   LOCATION_X: data[i].LOCATION_X,
  //   //   LOCATION_Y: data[i].LOCATION_Y,
  //   //   LOCATION_DATA: data[i].LOCATION_DATA,
  //   //   DATA_DESC: data[i].DATA_DESC,
  //   // };
  //   // position.push(content);
  //   // console.log(position);

  //   // 마커 이미지의 이미지 주소
  //   var imageSrc =
  //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  //   // 마커 이미지의 이미지 크기
  //   var imageSize = new window.kakao.maps.Size(35, 35);
  //   // 마커 이미지를 생성합니다
  //   var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
  //   // 마커를 생성합니다
  //   var marker = new window.kakao.maps.Marker({
  //     map: kakaoMap, // 마커를 표시할 지도
  //     position: new window.kakao.maps.LatLng(
  //       data[i].LOCATION_Y,
  //       data[i].LOCATION_X
  //     ), // 마커를 표시할 위치
  //     title: data[i].DATA_DESC, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
  //     image: markerImage, // 마커 이미지
  //   });
  // }
  // console.log(kakaoMap);
  // Hazard(data, kakaoMap);
  return (
    <>
      <SectionTable
        parkingData={parkingData}
        accidentData={accidentData}
        kakaoMap={kakaoMap}
        data={data}
      ></SectionTable>
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
  width: 200px;
  height: 30px;
  justify-content: space-evenly;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;
`;

const Button = styled.button`
  height: 25px;
  background-color: #1f68f6;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 13px;
  padding: 0 7px 0 7px;
  box-shadow: 0 2px 3px #00000050;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #1f68f6;
  }
`;

export default Map;
