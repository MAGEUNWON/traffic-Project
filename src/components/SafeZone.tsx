import { useEffect, useState } from 'react';
import axios from 'axios';


declare global {
  interface Window {
    kakao: any;
  }
}

const SafeZone = () => {
  const { kakao } = window;
  const [mapData, setMapData] = useState();
  const [data, setData] = useState<any>([{}]);

  useEffect(() => {
    const getJsonData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/safezone`);
        setData(response.data);
      } catch(err) {
        console.log(err);
      }
    };
    getJsonData();
  }, []);

  // 지도 기본 설정 및 생성
  useEffect(() => {
    const mapContainer = document.getElementById('map'), 
          mapOptions = { 
              center: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409), 
              level: 3 
          };
    const map = new kakao.maps.Map(mapContainer, mapOptions); 

    setMapData(map);
  }, [])

  const imageSrc = "/asset/icon_safe.png";

  for (let i = 0; i < data.length; i++) {

    const imageSize = new kakao.maps.Size(30, 30);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new kakao.maps.Marker({
      map: mapData, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(data[i]['Y'], data[i]['X']), // 마커를 표시할 위치
      title: (`${data[i]['FCLTY_NM']}\n제한속도 : ${data[i]['MAX_SPD']}`), // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
      image: markerImage // 마커 이미지
    });

  }

  return (
  <div id="map" style={{ width: "80vw", height: "100vh" }} />
  );
}

export default SafeZone; 