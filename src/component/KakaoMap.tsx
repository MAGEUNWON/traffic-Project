import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

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

        var options = {
            center: new kakao.maps.LatLng(36.349318, 127.377361),
            level: 3,
        };
        mapRef.current = new kakao.maps.Map(mapElement.current, options);
    }, []);

    console.log(mapElement);

    return (
        <div
            className="map"
            ref={mapElement}
            style={{ width: "100%", minHeight: "100%" }}
        ></div>
    );
};

export default KakaoMap;
