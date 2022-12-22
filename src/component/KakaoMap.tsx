import React, { useRef, useEffect, useState, memo } from "react";
import axios from "axios";
import { createGlobalStyle } from "styled-components";

declare global {
    interface Window {
        kakao: any;
    }
}

const KakaoMap = () => {
    const mapRef = useRef<HTMLElement | null | any>(null);
    const mapElement = useRef<any>(null);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        //지도객체가 생성되지 않았거나 데이터가 빈값이면 리턴
        const { kakao } = window;

        if (!mapElement.current || !kakao) return;

        axios.get("http://localhost:8000/dot").then((value: any) => {
            const options = {
                center: new kakao.maps.LatLng(36.349318, 127.377361),
                level: 3,
            };
            mapRef.current = new kakao.maps.Map(mapElement.current, options);

            let line: any[] = [];
            let trafficLine: any[] = [];

            value.data.forEach((e: any) => {
                // console.log(e);
                line.push({
                    path: [
                        new kakao.maps.LatLng(e.node_Ycode, e.node_Xcode),

                        // e.BEGIN_NODE_YCODE,
                        // e.BEGIN_NODE_XCODE
                        // e.node_Ycode,
                        // e.node_Xcode,
                        // new kakao.maps.LatLng(e.node_Ycode, e.node_Xcode),
                        // // e.END_NODE_YCODE,
                        // // e.END_NODE_XCODE
                        // e.node_Ycode,
                        // e.node_Xcode,
                    ],
                    color: "blue",
                });
            });

            // 인포윈도우를 생성하고 지도에 표시합니다

            let polyline: any = [];
            let markerArr: any[] = [];
            let start = new kakao.maps.Marker({});
            let end = new kakao.maps.Marker({});
            let markerObject = [start, end];
            let pline: any = [];

            for (let i = 0; i < line.length; i++) {
                //i번째 정보를 가져옵니다.
                let item = line[i];
                // 지도에 표시할 선을 생성합니다
                polyline.push(
                    new kakao.maps.Polyline({
                        map: mapRef.current, //지도에 선을 표시합니다.
                        path: item.path, // 선을 구성하는 좌표배열 입니다
                        strokeWeight: 10, // 선의 두께 입니다
                        strokeColor: item.color, // 선의 색깔입니다
                        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: "solid", // 선의 스타일입니다
                    })
                );
                // check2
                kakao.maps.event.addListener(
                    polyline[i],
                    "click",
                    async function (e: any) {
                        polyline[i].setOptions({
                            strokeColor: "black",
                        });

                        let latlng = e.latLng;

                        if (markerArr.length === 0) {
                            markerArr.push(value.data[i]);
                            start.setPosition(latlng);
                            start.setMap(mapRef.current);
                        } else if (markerArr.length === 1) {
                            markerArr.push(value.data[i]);
                            end.setPosition(latlng);
                            end.setMap(mapRef.current);

                            const getData = await axios.post<any>(
                                "http://localhost:8000/directions",
                                {
                                    markerArr,
                                }
                            );
                            let path: any = [];
                            console.log(getData.data.finalData);

                            getData.data.finalData.filter(
                                (item: any, i: number, arr: any) => {
                                    console.log(item);
                                    if (arr.length - 1 === i) return false;
                                    path.push([
                                        new kakao.maps.LatLng(
                                            arr[i].node_Ycode,
                                            arr[i].node_Xcode
                                        ),
                                        new kakao.maps.LatLng(
                                            arr[i + 1].node_Ycode,
                                            arr[i + 1].node_Xcode
                                        ),
                                    ]);
                                }
                            );

                            path.unshift([
                                new kakao.maps.LatLng(
                                    markerArr[0].node_Ycode,
                                    markerArr[0].node_Xcode
                                ),
                                new kakao.maps.LatLng(
                                    getData.data.finalData[1].node_Ycode,
                                    getData.data.finalData[1].node_Xcode
                                ),
                            ]);

                            let infowindow = new kakao.maps.InfoWindow({
                                map: mapRef.current, // 인포윈도우가 표시될 지도
                                position: new kakao.maps.LatLng(
                                    markerArr[i].node_Ycode,
                                    markerArr[i].node_Xcode
                                ),
                                content: `<div>
                                    <p>교차로명칭: ${markerArr[i].node_name}</p>
                                    <p>위도: ${markerArr[i].node_Xcode}</p>
                                    <p>경도: ${markerArr[i].node_Ycode}</p>
                                    <p>노드ID: ${markerArr[i].node_id}</p>
                                    <p>노드유형: ${markerArr[i].node_type}</p>
                                    <p>회전제한유무:${markerArr[i].turn_p}</p>

                                    </div>`,
                                removable: true,
                            });
                            console.log(path);

                            let pathLine = path.map((el: any, i: number) => {
                                console.log(el);
                                let color = "black";
                                if (
                                    getData.data.trafficData[i]?.congestion ===
                                    1
                                ) {
                                    color = "green";
                                } else if (
                                    getData.data.trafficData[i]?.congestion ===
                                    2
                                ) {
                                    color = "Orange";
                                } else if (
                                    getData.data.trafficData[i]?.congestion ===
                                    3
                                ) {
                                    color = "red";
                                }

                                console.log(getData.data.trafficData);
                                console.log(i);
                                return new kakao.maps.Polyline({
                                    map: mapRef.current, //지도에 선을 표시합니다.
                                    path: el, // 선을 구성하는 좌표배열 입니다
                                    strokeWeight: 10, // 선의 두께 입니다
                                    strokeColor: color, // 선의 색깔입니다
                                    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                                    strokeStyle: "solid", // 선의 스타일입니다
                                });
                            });
                        } else if (markerArr.length > 1) {
                            pline.setMap(null);
                            end.setPosition(latlng);
                            end.setMap(mapRef.current);
                            markerArr.splice(1, 0, value.data[i]);

                            const getData = await axios.post<any>(
                                "http://localhost:8000/directions",
                                {
                                    markerArr,
                                }
                            );

                            let path = getData.data.finalData.map(
                                (item: any) => {
                                    return new kakao.maps.LatLng(
                                        item.node_Ycode,
                                        item.node_Xcode
                                    );
                                }
                            );
                            path.unshift(
                                new kakao.maps.LatLng(
                                    markerArr[0].node_Ycode,
                                    markerArr[0].node_Xcode
                                )
                            );
                            pline = new kakao.maps.Polyline({
                                map: mapRef.current, //지도에 선을 표시합니다.
                                path: path, // 선을 구성하는 좌표배열 입니다
                                strokeWeight: 10, // 선의 두께 입니다
                                strokeColor: "red", // 선의 색깔입니다
                                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                                strokeStyle: "solid", // 선의 스타일입니다
                            });
                        }

                        // console.log(start);

                        // end.setPosition(latlng);
                        // end.setMap(mapRef.current);
                    }
                );
            }

            markerObject.forEach((el, i) => {
                kakao.maps.event.addListener(el, "mouseover", (e: any) => {
                    let infowindow = new kakao.maps.InfoWindow({
                        map: mapRef.current, // 인포윈도우가 표시될 지도
                        position: new kakao.maps.LatLng(
                            markerArr[i].node_Ycode,
                            markerArr[i].node_Xcode
                        ),
                        content: `<div>
                            <p>교차로명칭: ${markerArr[i].node_name}</p>
                            <p>위도: ${markerArr[i].node_Xcode}</p>
                            <p>경도: ${markerArr[i].node_Ycode}</p>
                            <p>노드ID: ${markerArr[i].node_id}</p>
                            <p>노드유형: ${markerArr[i].node_type}</p>
                            <p>회전제한유무:${markerArr[i].turn_p}</p>
            
                            </div>`,
                        removable: true,
                    });

                    infowindow.open(mapRef.current);
                });
            });
        });

        // 지도에 선을 표시합니다
    }, []);
    return (
        <div
            className="map"
            ref={mapElement}
            style={{ width: "100%", minHeight: "100%" }}
        ></div>
    );
};

export default memo(KakaoMap);
