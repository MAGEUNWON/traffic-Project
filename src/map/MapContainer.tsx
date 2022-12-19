import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const kakao = window.kakao;

const MapContainer = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map'), 
          mapOptions = { 
              center: new kakao.maps.LatLng(33.450701, 126.570667), 
              level: 3 
          };
    const map = new kakao.maps.Map(mapContainer, mapOptions); 

    // 마커 표시할 위치와 title 객체 배열 생성
    const positions = [
      {
        title: '카카오', 
        latlng: new kakao.maps.LatLng(33.450705, 126.570677)
      },
      {
        title: '생태연못', 
        latlng: new kakao.maps.LatLng(33.450936, 126.569477)
      },
      {
          title: '텃밭', 
          latlng: new kakao.maps.LatLng(33.450879, 126.569940)
      },
      {
          title: '근린공원',
          latlng: new kakao.maps.LatLng(33.451393, 126.570738)
      }
    ];

    const imageSrc = "../public/img/childrencrossing.png";

    for (let i = 0; i < positions.length; i++) {
      const imageSize = new kakao.maps.Size(24,35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
        image: markerImage // 마커 이미지
      });
    }
  }, [])

  return (
    <>
      <h1>Map</h1>
      <div id="map" style={{ width: "50vw", height: "50vh" }} />
    </>
  );
}

export default MapContainer; 