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

    const getValue = useRef(value);
    getValue.current = value;

    useEffect(() => {
        markerArr.map((el: any) => {
            el.setMap(null);
        });

        let arr: any = [];

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
            const markerImage = new kakao.maps.MarkerImage(
                imgSwitch(),
                imageSize
            );
            let column1: any;
            let column2: any;

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

            let marker = new kakao.maps.Marker({
                map: mapData,
                position: new kakao.maps.LatLng(
                    data[i][column1],
                    data[i][column2]
                ),
                image: markerImage,
            });

            arr.push(marker);

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

                kakao.maps.event.addListener(marker, "click", () => {
                    infowindow.open(mapData, marker);
                });
            } else if (data[i].lat) {
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

                // 돌발정보 마커에 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.
                window.kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );

                // 돌발정보 마커를 마우스오버 하면, 해당 돌발 상황 정보 오버레이가 사라진다.
                window.kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
            } else if (data[i].GOV_NM) {
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
                const overlay = new window.kakao.maps.CustomOverlay({
                    position: new window.kakao.maps.LatLng(
                        data[i].locationDataY,
                        data[i].locationDataX
                    ),
                    content: content,
                });

                // 돌발정보 마커에 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.
                window.kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );

                // 돌발정보 마커를 마우스오버 하면, 해당 돌발 상황 정보 오버레이가 사라진다.
                window.kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
            } else if (data[i].addressJibunCd) {
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
                const overlay = new window.kakao.maps.CustomOverlay({
                    position: new window.kakao.maps.LatLng(
                        data[i].locationDataY,
                        data[i].locationDataX
                    ),
                    content: content,
                });

                window.kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    function () {
                        overlay.setMap(mapData);
                    }
                );

                window.kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    function () {
                        overlay.setMap(null);
                    }
                );
            }
        }

        setMarkerArr(arr);
    }, [data]);

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
        const mapContainer = document.getElementById("map"),
            mapOptions = {
                center: new kakao.maps.LatLng(
                    36.349286539618234,
                    127.37768781658409
                ),
                level: 3,
            };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        setMapData(map);
        FunctionSearch(searchplace, map);
    }, [searchplace]);

    return <div id="map" style={{ width: "80vw", height: "100vh" }} />;
};

export default FunctionMap;
