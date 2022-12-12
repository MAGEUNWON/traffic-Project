import React, { useRef, useEffect } from "react";

const Map = () => {
    const mapElement = useRef(null);

    useEffect(() => {
        const { naver } = window;

        if (!mapElement.current || !naver) return;

        const mapOptions: any = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
            },
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);
        console.log(mapElement);
    }, []);

    return (
        <div ref={mapElement} style={{ width: "400px", minHeight: "400px" }} />
    );
};

export default Map;
