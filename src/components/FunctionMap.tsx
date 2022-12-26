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
    }

    return <div id="map" style={{ width: "80vw", height: "100vh" }} />;
};

export default FunctionMap;
