import { useEffect, useState, useRef } from 'react';
import axios from 'axios';


declare global {
  interface Window {
    kakao: any;
  }
}

const FunctionMap = ({value}: any) => {
  const { kakao } = window;
  const [mapData, setMapData] = useState();
  const [data, setData] = useState<any>([{}]);

  const getValue = useRef(value);
  getValue.current = value;
  
  useEffect(() => {
    const getJsonData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${value}`);
        setData(response.data);
      } catch(err) {
        console.log(err);
      }
    };
    getJsonData();
  }, [getValue.current]);

  // 지도 기본 설정 및 생성
  useEffect(() => {
    const mapContainer = document.getElementById('map'), 
          mapOptions = { 
              center: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409), 
              level: 3 
          };
    const map = new kakao.maps.Map(mapContainer, mapOptions); 

    setMapData(map);
  }, [getValue.current]);

  type imgType = {
    [key: string]: string;
  }

  const imageSrc: imgType = {
    "cctv": "/asset/cctv.png",
    "safezone": "/asset/safezone.png",
    "parkinglot": "/asset/parkinglot.png",
  }

  for (let i = 0; i < data.length; i++) {

    const imageSize = new kakao.maps.Size(26, 31);
    const markerImage = new kakao.maps.MarkerImage(imageSrc[value], imageSize);

    const marker = new kakao.maps.Marker({
      map: mapData, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(data[i]['YCODE'], data[i]['XCODE']), // 마커를 표시할 위치
      // title: (`${data[i]['FCLTY_NM']}\n제한속도 : ${data[i]['MAX_SPD']}`), 
      // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
      image: markerImage // 마커 이미지
    });
  }

  return (
  <div id="map" style={{ width: "80vw", height: "100vh" }} />
  );
}

export default FunctionMap; 