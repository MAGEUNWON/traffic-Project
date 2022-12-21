import React, { useRef, useEffect, useState, memo } from "react";
import axios from "axios";

declare global {
    interface Window {
        kakao: any;
    }
}

const test: string[] = [];
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
            let markerArr: object[] = [];

            let start = new kakao.maps.Marker({});
            let end = new kakao.maps.Marker({});

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

                kakao.maps.event.addListener(
                    polyline[i],
                    "click",
                    async function (e: any) {
                        polyline[i].setOptions({
                            strokeColor: "black",
                        });

                        console.log("클릭이베트확인");

                        let latlng = e.latLng;

                        if (markerArr.length === 0) {
                            markerArr.push(value.data[i]);
                            start.setPosition(latlng);
                            start.setMap(mapRef.current);
                        } else if (markerArr.length === 1) {
                            markerArr.push(value.data[i]);
                            end.setPosition(latlng);
                            end.setMap(mapRef.current);

                            const getData = await axios.post(
                                "http://localhost:8000/directions",
                                {
                                    markerArr,
                                }
                            );
                        } else if (markerArr.length > 1) {
                            end.setPosition(latlng);
                            end.setMap(mapRef.current);
                        }

                        console.log(markerArr);
                        // console.log(start);

                        // end.setPosition(latlng);
                        // end.setMap(mapRef.current);

                        let infowindow = new kakao.maps.InfoWindow({
                            map: mapRef.current, // 인포윈도우가 표시될 지도
                            position: new kakao.maps.LatLng(
                                item.path[0].Ma,
                                item.path[0].La
                            ),
                            content: `<div style="padding:5px;">
                            <p>교차로명칭: ${value.data[i].node_name}</p>
                            <p>위도: ${value.data[i].node_Xcode}</p>
                            <p>경도: ${value.data[i].node_Ycode}</p>
                            <p>노드ID: ${value.data[i].node_id}</p>
                            <p>노드유형: ${value.data[i].node_type}</p>
                            <p>회전제한유무:${value.data[i].turn_p}</p>

                            </div>`,
                            removable: true,
                        });
                        infowindow.open(mapRef.current);
                    }
                );
            }
            // value.data.forEach((e: any) => {
            //     var item = e;
            //     var polyline = new kakao.maps.Polyline({
            //         path: item, // 선을 구성하는 좌표배열 입니다
            //         strokeWeight: 5, // 선의 두께 입니다
            //         strokeColor: "#1F68F6", // 선의 색깔입니다
            //         strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            //         strokeStyle: "solid", // 선의 스타일입니다
            //     });
            // });

            // const linePath = [
            //     new kakao.maps.LatLng(36.33395949, 127.3719135),
            //     new kakao.maps.LatLng(36.33420867, 127.3720276),
            // ];

            // var circle = new kakao.maps.Circle({
            //     center: new kakao.maps.LatLng(36.33420867, 127.3727467), // 원의 중심좌표 입니다
            //     radius: 5, // 미터 단위의 원의 반지름입니다
            //     strokeWeight: 2, // 선의 두께입니다
            //     strokeColor: "#75B8FA", // 선의 색깔입니다
            //     strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            //     strokeStyle: "solid", // 선의 스타일 입니다
            //     fillColor: "#CFE7FF", // 채우기 색깔입니다
            //     fillOpacity: 0.7, // 채우기 불투명도 입니다
            // });

            // circle.setMap(mapRef.current);

            // var polyline = new kakao.maps.Polyline({
            //     path: line, // 선을 구성하는 좌표배열 입니다
            //     strokeWeight: 5, // 선의 두께 입니다
            //     strokeColor: "#1F68F6", // 선의 색깔입니다
            //     strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            //     strokeStyle: "solid", // 선의 스타일입니다
            // });

            // polyline.setMap(mapRef.current);
        });

        // 지도에 선을 표시합니다

        // const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
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
