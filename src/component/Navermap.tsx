import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const NaverMap = () => {
    const mapRef = useRef<HTMLElement | null | any>(null);
    const mapElement = useRef<any>(null);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const { naver } = window;
        let num = 1;

        if (!mapElement.current || !naver) return;

        let trafficLayer = new naver.maps.TrafficLayer({
            interval: 300000, // 5분마다 새로고침 (최소값 5분)
        });

        const mapOptions: any = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
                position: naver.maps.Position.RIGHT_CENTER,
            },
        };

        mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);

        // naver.maps.Event.addListener(
        //     mapRef.current,
        //     "trafficLayer_changed",
        //     (test) => {
        //         console.log(test);
        //     }
        // );

        var locationBtnHtml = "<button>cctv</button>";

        var customControl = new naver.maps.CustomControl(locationBtnHtml, {
            position: naver.maps.Position.TOP_RIGHT,
        });

        naver.maps.Event.once(mapRef.current, "init", function () {
            trafficLayer.setMap(mapRef.current);
            customControl.setMap(mapRef.current);

            naver.maps.Event.addDOMListener(
                customControl.getElement(),
                "click",
                function () {
                    // mapRef.current.setCenter(
                    //     new naver.maps.LatLng(37.3595953, 127.1053971)
                    // );
                }
            );
        });

        naver.maps.Event.addListener(
            mapRef.current,
            "click",
            async function (e) {
                axios
                    .get(`http://localhost:8000/test?type=${num}`)
                    .then((value) => {
                        setData(value.data.test);
                        console.log("클릭");
                    });

                // testSet(e.coord);
            }
        );
    }, []);

    useEffect(() => {
        //지도객체가 생성되지 않았거나 데이터가 빈값이면 리턴
        if (!mapElement.current || data.length === 0) {
            return;
        }
        console.log(mapElement);

        new naver.maps.Marker({
            //마커가 표시 될 지도
            map: mapRef.current,
            //마커가 표시 될 위치
            position: new naver.maps.LatLng(36.3487, 127.3769),
            //마커에 hover시 나타날 title
            title: "Unary Spot!!",
        });
    }, [mapElement, data]);

    return (
        <div
            className="map"
            ref={mapElement}
            style={{ width: "100%", minHeight: "500px" }}
        ></div>
    );
};

export default NaverMap;
