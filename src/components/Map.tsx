import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ data }: any) => {
  const { kakao } = window;
  const [mapData, setMapData] = useState();

  // 지도 기본 설정 및 생성
  useEffect(() => {
    const mapContainer = document.getElementById('map'), 
          mapOptions = { 
              center: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409), 
              level: 3 
          };
    const map = new kakao.maps.Map(mapContainer, mapOptions); 
    
    // 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 
    // 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록
    kakao.maps.event.addListener(map, 'bounds_changed', function() {

      const bounds = map.getBounds();
      const swLatlng = bounds.getSouthWest();
      const neLatlng = bounds.getNorthEast();

      const range = [swLatlng, neLatlng]; 
      console.log(range);
    });

    setMapData(map);

  }, [])

  type imgType = {
    [key: string]: string;
  }

  const imageSrc: imgType = {
    '1': "/img/child.png",
    '2': "/img/old.png",
    '3': "/img/handicapped.png",
  };

  for (let i = 0; i < data.length; i++) {
    const index = data[i].시설종류;
    const imageSize = new kakao.maps.Size(30, 30);
    const markerImage = new kakao.maps.MarkerImage(imageSrc[index], imageSize);
    const marker = new kakao.maps.Marker({
      map: mapData, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(data[i].위도, data[i].경도), // 마커를 표시할 위치
      title: (`${data[i].대상시설명}\n제한속도 : ${data[i].제한속도}`), // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
      image: markerImage // 마커 이미지
    });
  }

  return (
    <>
      <h1>Map</h1>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
}

export default Map; 