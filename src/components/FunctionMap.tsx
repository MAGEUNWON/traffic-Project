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
  const [markerArr, setMarkerArr] = useState<any>([]);

  const getValue = useRef(value);
  getValue.current = value;

  let info: any = [];
  let markersave :any = [];

  useEffect(() => {
    //데이터 가져오기
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
    const mapContainer = document.getElementById("map")
    const map = new kakao.maps.Map(mapContainer, {
      center: new kakao.maps.LatLng(36.349286539618234, 127.37768781658409),
      level: 3,
    });;

    setMapData(map);
    FunctionSearch(searchplace, map);
  }, [searchplace]);

  useEffect(()=>{
    // 돌발상황에 따른 이미지 스위칭
    markerArr.map((el: any) => {
      el.setMap(null);
  });
    
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
      //CCTV
      const imgSwitch = () => {
        console.log(data[i])
        switch (data[i]["incidenteTypeCd"]) {
          case "1":
            return imageSrc[value][0];
          case "2":
            return imageSrc[value][1];
          case "5":
            return imageSrc[value][2];
          default:
            return imageSrc[value];
        }
      };
      const imageSize = new kakao.maps.Size(22, 22);
      const markerImage = new kakao.maps.MarkerImage(imgSwitch(), imageSize);
      let column1: any;
      let column2: any;
  
      //정보에 따른 컬럼값 구분
      if (data[i]['lat']) {
        column1 = 'lat';
        column2 = 'lon';
      } else if (data[i]['locationDataX']) {
        column1 = 'locationDataY';
        column2 = 'locationDataX';
      } else if (data[i]['XCODE']) {
        column1 = 'YCODE';
        column2 = 'XCODE';
      }
      //마커 생성
      const marker = new kakao.maps.Marker({
        map: mapData,
        position: new kakao.maps.LatLng(
          data[i][column1], data[i][column2]
        ),
        image: markerImage,
      });
  
      //나중에 마커를 지우기 위해 빈 배열에 반복문을 통하여 마커 추가
      markersave.push(marker)    
  
      if(data[i].CCTVID){
      
      //CCTV DB 정보
      let name = data[i].NAME;
      let url = data[i].URL;
      let xcode = data[i].locationDataX;
      let ycode = data[i].locationDataY;
    
      //infowindow 설정
      let infowindow = new kakao.maps.InfoWindow({
          position: new kakao.maps.LatLng(ycode, xcode),
          content: `<div style="padding:5px;">${name}</div><iframe width="330" height ="280" style="border:none" src = "${url}"></iframe><div style="font-size:5px;background-color:#333;color:#fff">경찰청(UTIC)(LIVE)제공</div>`,
          removable: true,
        });
        info.push(infowindow)
  
        //infowindow 닫기 위한 close함수
        const close = () => {
          for (let i = 0; i < info.length; i++) {
              info[i].close();
          }
      };
      //클릭 이벤트
        kakao.maps.event.addListener(marker, "click", () => {      
          close()
          infowindow.open(mapData, marker);         
      }); 
      }else if (data[i].incidenteTypeCd){
        //돌발정보
          const content = `
          <div style="
          background-color: aliceblue;
          box-sizing: border-box;
          padding: 10px;
          font-size: 7px;">
            <div>돌발정보: ${data[i]["incidentTitle"]}</div>
            <div>도로차수: ${data[i]["lane"]}</div>
          </div>
        `;
        //마우스 오버레이 설정
          const overlay = new kakao.maps.CustomOverlay({
              position: new kakao.maps.LatLng(
                  data[i].locationDataY,
                  data[i].locationDataX
              ),
              content: content,
          });

          // 돌발정보 마커 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.          
          kakao.maps.event.addListener(
              marker,
              "mouseover",
              function () {
                  overlay.setMap(mapData);
              }
          );
          // 돌발정보 마커 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다. 
          kakao.maps.event.addListener(
              marker,
              "mouseout",
              function () {
                  overlay.setMap(null);
              }
          );            
          
      } else if(data[i].SNCT_SEQ) {
        //안전구역
        const content = `
                <div style="
                background-color: aliceblue;
                box-sizing: border-box;
                padding: 10px;
                font-size: 7px;">
                  <div>제한속도: ${data[i]["MAX_SPD"]}</div>
                  <div>시설명: ${data[i]["LADDR"]}</div>
                </div>
              `;
              
              //오버레이 설정
                const overlay = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(
                        data[i].locationDataY,
                        data[i].locationDataX
                    ),
                    content: content,
                });

                // 안전구역 마커 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );

                // 안전구역 마커 마우스오버 하면, 해당 돌발 상황 정보 오버레이가 사라진다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
      }else if(data[i].lat){
        //주차장
        const content = `
                <div style="
                background-color: aliceblue;
                box-sizing: border-box;
                padding: 10px;
                font-size: 7px;">
                  <span>${data[i].name}</span>
                </div>
              `;

                // 주차장 오버레이 설정
                const overlay = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(
                        data[i].lat,
                        data[i].lon
                    ),
                    content: content,
                });

                // 주차장 마커에 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );

                // 주차장 마커를 마우스오버 하면, 해당 돌발 상황 정보 오버레이가 사라진다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
      }
    }
    //버튼을 클릭할때마다 마커를 초기화하여 기존에 생성된 마커들 삭제
    setMarkerArr(markersave);
  },[data])
  //useEffect를 사용하여 data가 바뀔때 동작하도록 설정


  return(
    <div id="map" style={{ width: "80vw", height: "100vh" }}/>

  ) 
};

export default FunctionMap;
