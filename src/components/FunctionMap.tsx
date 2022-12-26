import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FunctionSearch from "./FunctionSearch";

declare global {
  interface Window {
    kakao: any;
  }
}

const FunctionMap = ({ value, searchplace }: any) => {
  const { kakao } = window;
  const [mapData, setMapData] = useState();
  const [data, setData] = useState<any>([{}]);

  const getValue = useRef(value);
  getValue.current = value;

  let info: any = [];
  let markersave :any = [];

  useEffect(() => {
    const getJsonData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${value}`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getJsonData();
  }, [getValue.current]);

  // 지도 기본 설정 및 생성
  useEffect(() => {
    const mapContainer = document.getElementById("map"),
      mapOptions = {
        center: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409),
        level: 3,
      };
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    setMapData(map);
    FunctionSearch(searchplace, map);
  }, [getValue.current, searchplace]);

  type imgType = {
    [key: string]: string | Array<string>;
  };

  const imageSrc: imgType = {
    cctv: "/asset/cctv.png",
    accident: [
      "/asset/caution.png",
      "/asset/construction.png",
      "/asset/stop.png",
    ],
    safezone: "/asset/safezone.png",
    parkinglot: "/asset/parkinglot.png",
  };

  for (let i = 0; i < data.length; i++) {
    const imgSwitch = () => {
      switch (data[i]["incidenteTypeCd"]) {
        case "1":
          return imageSrc[value][0];
        case "2":
          return imageSrc[value][1];
        case "3":
          return imageSrc[value][2];
        default:
          return imageSrc[value];
      }
    };
    const imageSize = new kakao.maps.Size(22, 22);
    const markerImage = new kakao.maps.MarkerImage(imgSwitch(), imageSize);

    const marker = new kakao.maps.Marker({
      map: mapData,
      position: new kakao.maps.LatLng(
        data[i]["locationDataY"],
        data[i]["locationDataX"]
      ),
      image: markerImage,
    });

    markersave.push[marker]    

    let name = data[i].NAME;
    let url = data[i].URL;
    let xcode = data[i].locationDataX;
    let ycode = data[i].locationDataY;
  
    if(data[i].CCTVID){

    let infowindow = new kakao.maps.InfoWindow({
        position: new kakao.maps.LatLng(ycode, xcode),
        content: `<div style="padding:5px;">${name}</div><iframe width="330" height ="280" style="border:none" src = "${url}"></iframe><div style="font-size:5px;background-color:#333;color:#fff">경찰청(UTIC)(LIVE)제공</div>`,
        removable: true,
      });
      info.push(infowindow)


      const close = () => {
        for (let i = 0; i < info.length; i++) {
            info[i].close();
        }
    };
      kakao.maps.event.addListener(marker, "click", () => {      
        close()
        infowindow.open(mapData, marker); 
        
    }); 
    }


  }

  return <div id="map" style={{ width: "80vw", height: "100vh" }} />;
};

export default FunctionMap;
