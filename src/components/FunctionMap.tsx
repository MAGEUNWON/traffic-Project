import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FunctionSearch from "./FunctionSearch";

declare global {
    interface Window {
        kakao: any;
    }
}

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

const FunctionMap = ({ value, searchplace }: any) => {
    const { kakao } = window;
    const [mapData, setMapData] = useState();
    const [data, setData] = useState<any>([{}]);
    const [markerArr, setMarkerArr] = useState<any>([]);
    const [infoArr,setInfoArr] = useState<any>([]);

    const getValue = useRef(value);
    getValue.current = value;

    useEffect(() => {
        //마커를 지우기 위한 null값 지정 맵함수
        markerArr.map((el: any) => {
            el.setMap(null);
        });
        infoArr.map((el:any)=>{
            el.setMap(null);
        })



        let arr: any = [];
        let info: any = [];

        for (let i = 0; i < data.length; i++) {
            // 돌발 정보에 따른 이미지 스위칭
            const imgSwitch = () => {
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
            const markerImage = new kakao.maps.MarkerImage(
                imgSwitch(),
                imageSize
            );
            let column1: any;
            let column2: any;
            //각 데이터마다 컬럼값이 다르기 때문에 이를 해결하고자 만든 조건문
            if (data[i]["lat"]) {
                column1 = "lat";
                column2 = "lon";
            } else if (data[i]["locationDataX"]) {
                column1 = "locationDataY";
                column2 = "locationDataX";
            } else if (data[i]["XCODE"]) {
                column1 = "YCODE";
                column2 = "XCODE";
            }
            //마커 생성
            let marker = new kakao.maps.Marker({
                map: mapData,
                position: new kakao.maps.LatLng(
                    data[i][column1],
                    data[i][column2]
                ),
                image: markerImage,
            });
            //마커 초기화를 위한 마커 push
            arr.push(marker);

            //CCTV
            if (data[i].CCTVID) {
                let name = data[i].NAME;
                let url = data[i].URL;
                let xcode = data[i].locationDataX;
                let ycode = data[i].locationDataY;

                let iwCotent = `<div style="padding:5px;">${name}</div><iframe width="330" height ="280" style="border:none" src = "${url}"></iframe><div style="font-size:5px;background-color:#333;color:#fff">경찰청(UTIC)(LIVE)제공</div>`,
                    iwPosition = new kakao.maps.LatLng(ycode, xcode);

                let infowindow = new kakao.maps.InfoWindow({
                    position: iwPosition,
                    content: iwCotent,
                    removable: true,
                });
                info.push(infowindow)
                
                kakao.maps.event.addListener(marker, "click", () => {
                    infowindow.open(mapData, marker);
                });
            } else if (data[i].lat) {
                // 주차장
                const content = `
                <div style="
                background-color: aliceblue;
                box-sizing: border-box;
                padding: 10px;
                font-size: 7px;">
                  <span>${data[i].name}</span>
                </div>
              `;

                // 주차장 오버레이 생성
                const overlay = new window.kakao.maps.CustomOverlay({
                    position: new window.kakao.maps.LatLng(
                        data[i].lat,
                        data[i].lon
                    ),
                    content: content,
                });

                // 주차장 마커에 마우스오버하면, 해당 주차장 정보 오버레이가 보인다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );

                // 주차장 마커를 마우스오버 하면, 해당 주차장 정보 오버레이가 사라진다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
            } else if (data[i].GOV_NM) {

                //보호구역
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

              //보호구역 오버레이 설정
                const overlay = new window.kakao.maps.CustomOverlay({
                    position: new window.kakao.maps.LatLng(
                        data[i].locationDataY,
                        data[i].locationDataX
                    ),
                    content: content,
                });

                // 보호구역 마커에 마우스오버하면, 해당 보호구역 정보 오버레이가 보인다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );

                // 보호구역 마커를 마우스오버 하면, 해당 보호구역 정보 오버레이가 사라진다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
            } else if (data[i].addressJibunCd) {
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

              //돌발정보 오버레이 설정
                const overlay = new window.kakao.maps.CustomOverlay({
                    position: new window.kakao.maps.LatLng(
                        data[i].locationDataY,
                        data[i].locationDataX
                    ),
                    content: content,
                });

                // 돌발정보 마커를 마우스오버 하면, 해당 돌발정보 정보 오버레이가 나타난다.                
                kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );
                // 돌발정보 마커를 마우스오버 하면, 해당 돌발정보 정보 오버레이가 사라진다.
                kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
            }
        }

        setMarkerArr(arr);
        setInfoArr(info)
    }, [data]);
    //데이터 가져오기
    useEffect(() => {
        const getJsonData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/${value}`
                );
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getJsonData();
    }, [getValue.current]);

    // 지도 기본 설정 및 생성
    useEffect(() => {
        const mapContainer = document.getElementById("map");

        const map = new kakao.maps.Map(mapContainer, {
            center: new kakao.maps.LatLng(
                36.349286539618234,
                127.37768781658409
            ),
            level: 3,
        });

        setMapData(map);        
        FunctionSearch(searchplace, map);
    }, [searchplace]);

    return (
        <div
            id="map"
            className="test"
            style={{ width: "80vw", height: "100vh" }}
        />
    );
};

export default FunctionMap;
