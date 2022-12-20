import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./map.css";
declare global {
  interface Window {
    kakao: any;
  }
}

//const controlImg = "/img/control.png";
const Map = ({ accidentData, onclick }: any) => {
  const { kakao } = window;
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapData, setMapData] = useState();
  const [event, setEvent] = useState(true);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409),
      level: 7, //지도의 레벨(확대, 축소 정도)
    };
    // 기본 메인 지도 생성
    const map = new kakao.maps.Map(container, options);
    setMapData(map);
  }, []);

  console.log(accidentData);
  // 기본 센터 주소 마커 생성
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409),
  });

  marker.setMap(mapData);
  console.log(accidentData.length);
  console.log(accidentData[0]);
  console.log(accidentData[0].locationDataY);

  const OverlayBox = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  function markerEvent() {
    for (let i = 0; i < accidentData.length; i++) {
      // console.log("마커");
      let position = new kakao.maps.LatLng(
        accidentData[i].locationDataY,
        accidentData[i].locationDataX
      );
      const imageSize = new kakao.maps.Size(25, 25);
      const constructionSize = new kakao.maps.Size(20, 20);
      const constructionSrc = "/img/construction.png";
      const cautionSrc = "/img/caution.png";
      const stopSrc = "/img/stop.png";

      const accidentMarker = new kakao.maps.Marker({
        map: mapData,
        position: position, // 마커를 표시할 위치
        // image: new kakao.maps.MarkerImage(constructionSrc, imageSize),
        image: accidentData[i].incidentTitle?.includes("[공사]")
          ? new kakao.maps.MarkerImage(constructionSrc, constructionSize)
          : accidentData[i].incidentTitle?.includes("[사고]")
          ? new kakao.maps.MarkerImage(cautionSrc, imageSize)
          : new kakao.maps.MarkerImage(stopSrc, imageSize),
      });

      const content = `
      <div class="content-box">
        <span>${accidentData[i].addressJibun}</span>
        <span>${accidentData[i].incidentTitle}</span>
      </div>
    `;
      // 돌발 상황 정보 오버레이 생성
      const overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
      });

      // 돌발정보 마커에 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.
      kakao.maps.event.addListener(accidentMarker, "mouseover", function () {
        overlay.setMap(mapData);
      });

      // 돌발정보 마커를 마우스오버 하면, 해당 돌발 상황 정보 오버레이가 사라진다.
      kakao.maps.event.addListener(accidentMarker, "mouseout", function () {
        overlay.setMap(null);
      });

      // accidentMarker.addListener("click", function () {
      //   console.log("클릭이벤트");
      // });
    }
  }

  const divStyling = {
    width: "100%",
    height: "800px",
  };
  return (
    <>
      <button onClick={() => markerEvent()}>돌발상황</button>
      {accidentData === undefined ? <h1>로딩중입니다</h1> : null}
      <div ref={mapRef} style={divStyling}></div>
    </>
  );
};
export default Map;
