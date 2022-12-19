import { useEffect, useRef, useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ accidentData }: any) => {
  const { kakao } = window;
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapData, setMapData] = useState();
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

  // 기본 센터 주소 마커 생성
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409),
  });

  marker.setMap(mapData);
  console.log(accidentData.length);
  console.log(accidentData[0]);
  console.log(accidentData[0].locationDataY);

  for (let i = 0; i < accidentData.length; i++) {
    // console.log("마커");
    console.log(accidentData[i]);
    const imageSize = new kakao.maps.Size(24, 35);
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const accidentMarker = new kakao.maps.Marker({
      map: mapData,
      position: new kakao.maps.LatLng(
        accidentData[i].locationDataY,
        accidentData[i].locationDataX
      ), // 마커를 표시할 위치
      image: markerImage,
    });
  }

  const divStyling = {
    width: "100%",
    height: "800px",
  };
  return (
    <>
      {accidentData === undefined ? <h1>로딩중입니다</h1> : null}
      <div ref={mapRef} style={divStyling}></div>
    </>
  );
};
export default Map;
