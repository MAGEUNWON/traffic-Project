import React, { useEffect, useState, useRef } from "react";
//useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook. 기본적으로 렌더링되고 난 직후마다 실행.
//useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됨.
//특정 값이 변경 될 때만 호출하고 싶은 경우에는 useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 됨.
import styled from "styled-components";
import FunctionSearch from "./FunctionSearch";
import axios from "axios";
import "./Map.css";

declare global {
    interface Window {
        kakao: any;
    }
}
//리액트 쓸 때 전역으로 사용하기 위한 것. 컴포넌트 내부나 App.tsc에 kakao map을 선언해 줄것. 만들어 놓고 불러와서 사용하면 됨.

interface btnSet {
    value: string;
    con: string;
    [index: string]: string;
}

const Map = ({ searchplace }: any) => {
    const [mapTypes, SetMapTypes] = useState<string>("Roadmap"); //지도 타입 바뀌는 용도
    const [data, setData] = useState<any>([{}]); //api 담을 용도
    const [kakaoMap, setKakaoMap] = useState(); //map 밖에서 쓰려고 담는 용도
    const [areas, setArea] = useState<any>([{}]); // polygon 좌표 담는 용도
    const [DataDesc, setDataDesc] = useState<any>([{}]); // polygon 상세내용 담는 용도
    const [Larr, setLarr] = useState<any>([{}]);
    const [Ldesc, setLdesc] = useState<any>([{}]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        SetMapTypes(e.currentTarget.value);
    };

    const ref = useRef("");

    ref.current = mapTypes;

    useEffect(() => {
        // console.log(maptype)
        console.log("렌더링 완료"); //useEffect는 React.StrictMode가 적용된 개발환경에서는 콘솔이 두번씩 찍힘.

        let container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
        //카카오 객체가 window 하위 객체라는 것을 정의해야 하므로 window.kakao로 변경해야 함
        let options = {
            center: new window.kakao.maps.LatLng(36.3492506, 127.3776511),
            level: 3, //지도의 확대, 축소 정도
        };

        let map = new window.kakao.maps.Map(container, options);

        axios.get(`http://127.0.0.1:5000/hazard/polygon`).then((response) => {
            // console.log(response.data[0].ADDRESS_JIBUN);
            setData(response.data);
            // console.log(response.data[46].DATA_DESC) // POLYGON 상세 내용
            // console.log(response.data[46]); //POLYGON 좌표
            let DataDesc = response.data[46].DATA_DESC;
            let LoSlice = response.data[46].LOCATION_DATA.slice(
                9,
                response.data[46].LOCATION_DATA.length - 2
            );
            // console.log(a);
            let LoSplit = LoSlice.split(",");
            console.log(LoSplit); //polygon 46번째만 가져와서 배열에 넣음.

            let areas = [];
            let path = [];
            for (let j = 0; j < LoSplit.length; j++) {
                console.log(LoSplit[j]);
                let LoSplitTwo = LoSplit[j].split(" ");
                console.log(LoSplitTwo);
                path.push(LoSplitTwo);
            }
            console.log(path);
            // areas.push(path);
            console.log(path[0][1], path[0][0]); //polygon 46번째 좌표만 가져와서 배열에 넣고 46번째 배열들만 다시 배열에 담음

            for (let i = 0; i < path.length; i++) {
                areas.push(
                    new window.kakao.maps.LatLng(path[i][1], path[i][0])
                );
            }
            console.log(areas); //pa?
            setArea(areas); //areas usesStae에 담음.
            setDataDesc(DataDesc);
        });

        axios
            .get(`http://127.0.0.1:5000/hazard/line`)
            .then((response) => {
                let Data = response.data;
                let dataReplace: any = [];
                let dataSplit: any = [];
                let LData: any = [];
                let str = /[LINE()"]/gim;
                Data.forEach((value: any) => {
                    dataReplace.push(value.LOCATION_DATA.replace(str, ""));
                });
                dataReplace.forEach((value: any) => {
                    dataSplit.push(value.split(","));
                });
                dataSplit.forEach((value: any, index: any) => {
                    LData[index] = [];
                    for (let i = 0; i < value.length; i++) {
                        LData[index].push(value[i].split(" "));
                    }
                });
                console.log(LData);
                // console.log(LData[0][0][1], LData[0][0][0]);

                let Larr: any = [];

                for (let i = 0; i < LData.length; i++) {
                    // console.log(arr4[i]);
                    let arr: any = [];
                    let sLarr = LData[i];
                    // console.log(sLarr);
                    for (let j = 0; j < sLarr.length; j++) {
                        // console.log(sLarr[j][1], sLarr[j][0]);
                        arr.push(
                            new window.kakao.maps.LatLng(
                                sLarr[j][1],
                                sLarr[j][0]
                            )
                        );
                    }
                    // console.log(arr);
                    Larr.push(arr);
                    // linePath.push(new window.kakao.maps.LatLng(arr))
                    // sLarr.forEach((value: any, index: number) => {
                    //   console.log(value[i], index);
                    // });
                }
                console.log(Larr);

                setLarr(Larr);

                //------------------------DATA 상세 정보 구간 -----------------------
                let Ldesc = [];
                // console.log(Data[0].DATA_DESC);
                for (let k = 0; k < Data.length; k++) {
                    let Desc = Data[k].DATA_DESC;
                    console.log(Desc);
                    Ldesc.push(Desc);
                }
                // console.log(Ldesc[0]);

                setLdesc(Ldesc);
            })
            .catch((e) => console.log(e));

        let currentTypeId;
        let changeMapType;

        //--------------------------------- maptype에 따라 지도에 추가할 지도타입을 결정 ---------------------------------------

        if (ref.current === "Roadmap") {
            //로드뷰 도로정보 지도타입
            changeMapType = window.kakao.maps.MapTypeId.ROADMAP;
        } else if (ref.current === "Skyview") {
            //지형정보 지도타입
            changeMapType = window.kakao.maps.MapTypeId.HYBRID;
        } else if (ref.current === "roadview") {
            //지적편집도 지도타입
            changeMapType = window.kakao.maps.MapTypeId.ROADVIEW;
        }

        if (currentTypeId) {
            //이미 등록된 지도 타입이 있으면 제거
            map.removeOverlayMapTypeId(currentTypeId);
        }

        //maptype에 해당하는 지도타입을 지도에 추가
        map.addOverlayMapTypeId(changeMapType);

        //지도에 추가된 타입정보를 갱신
        currentTypeId = changeMapType;

        //지도에 현재 실시간 교통정보가 컬로로 표시되어 있는 라인 올림
        // map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC) //MapTypeId뒤에 TRAFFIC을 SKYVIEW 등으로 바꾸면 지도 형태가 바뀜, addOverlayMapTypeId는 removeOverlayMapTypeId로 바꾸면 추가한 지도타입 제거됨

        //마커가 표시될 위치
        // let markerPosition = new window.kakao.maps.LatLng(36.3492506, 127.3776511);
        //마커 생성
        // let marker = new window.kakao.maps.Marker({
        //   position: markerPosition,
        // });
        //마커가 지도 위에 표시되도록 설정
        // marker.setMap(map);
        setKakaoMap(() => map);

        FunctionSearch(searchplace, map);
    }, [mapTypes, searchplace]);

    const btnSet: btnSet[] = [
        { value: "Roadmap", con: "지도" },
        { value: "Skyview", con: "스카이뷰" },
        { value: "roadview", con: "로드뷰" },
    ];

    //-------------------------------- 여기부터 폴리건 부분 --------------------------------------------------
    useEffect(() => {
        // console.log(DataDesc)

        if (!kakaoMap) return; //이거 없어도 되나??

        let customOverlay = new window.kakao.maps.CustomOverlay({});
        // let infowindow = new window.kakao.maps.InfoWindow({ removable: true });

        let area = [];

        // 지도에 영역데이터를 폴리곤으로 표시
        for (let i = 0; i < areas.length; i++) {
            // console.log(areas[i].Ma, areas[i].La);
            area.push(new window.kakao.maps.LatLng(areas[i].Ma, areas[i].La));
        }
        // console.log(area[0].Ma, area[0].La);
        // console.log(area);

        // 다각형을 생성하고 이벤트를 등록하는 함수
        function dispalyArea(area: any, kakaoMap: any) {
            // 다각형을 생성
            let polygon = new window.kakao.maps.Polygon({
                path: area,
                strokeWeight: 30,
                strokeColor: "#004c80",
                strokeOpacity: 0.8,
                fillColor: "#004c80",
                fillOpacity: 0.7,
            });

            // console.log(polygon, "폴리건!");
            polygon.setMap(kakaoMap);

            // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경
            // 지역명을 표시하는 커스텀오버레이를 지도위에 표시
            window.kakao.maps.event.addListener(
                polygon,
                "mouseover",
                function (mouseEvent: any) {
                    polygon.setOptions({ fillColor: "#09f" });
                    customOverlay.setContent(
                        '<div class="area">' + DataDesc + "</div>"
                    );

                    customOverlay.setPosition(mouseEvent.latLng);
                    customOverlay.setMap(kakaoMap);
                }
            );

            // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경
            window.kakao.maps.event.addListener(
                polygon,
                "mousemove",
                function (mouseEvent: any) {
                    customOverlay.setPosition(mouseEvent.latLng);
                }
            );
        }
        dispalyArea(area, kakaoMap); // 얘도 없어도 나오나?
    }, [areas, kakaoMap]);
    //--------------------------------- 여기까지 폴리건 부분-------------------------

    //-----------------------LINE 부분---------------------------------------

    useEffect(() => {
        let customOverlay = new window.kakao.maps.CustomOverlay({});
        // let infowindow = new window.kakao.maps.InfoWindow({ removable: true });

        let linePath: any = [];

        for (let i = 0; i < Larr.length; i++) {
            // console.log(Larr[i]);
            let arr: any = [];
            let s = Larr[i];
            // console.log(s);
            for (let j = 0; j < s.length; j++) {
                // console.log(s[j]);
                arr.push(new window.kakao.maps.LatLng(s[j].Ma, s[j].La));
            }
            linePath.push(arr);
            // console.log(arr);
        }
        // console.log(linePath);
        // let test: any = [];
        function dispalyLine(linePath: any, kakaoMap: any) {
            // 얘도 kakaoMap 없어도 나오는건가?
            for (let i = 0; i < Ldesc.length; i++) {
                // console.log(i, "반복문 횟수!");

                var polyline = new window.kakao.maps.Polyline({
                    path: linePath[i], // 선을 구성하는 좌표배열
                    strokeWeight: 5, // 선의 두께
                    strokeColor: "red", // 선의 색깔
                    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명
                    strokeStyle: "solid", // 선의 스타일
                });
                // 지도에 선을 표시
                polyline.setMap(kakaoMap);

                const imageSize = new window.kakao.maps.Size(40, 40);
                const falling = "/asset/falling.png";
                const freezing = "/asset/freezing.png";
                const foggy = "/asset/foggy.png";
                const slope = "/asset/slope.png";
                const slippery = "/asset/slippery.png";
                const curve = "/asset/curve.png";
                const winding = "/asset/winding-road.png";

                const accidentMarker = new window.kakao.maps.Marker({
                    map: kakaoMap,
                    position: linePath[i][1], // 마커를 표시할 위치
                    image:
                        Ldesc[i] === "결빙구간"
                            ? new window.kakao.maps.MarkerImage(
                                  freezing,
                                  imageSize
                              )
                            : Ldesc[i] === "추락위험 구간"
                            ? new window.kakao.maps.MarkerImage(
                                  falling,
                                  imageSize
                              )
                            : Ldesc[i] === "급경사 구간"
                            ? new window.kakao.maps.MarkerImage(
                                  slope,
                                  imageSize
                              )
                            : Ldesc[i] === "급커브 구간"
                            ? new window.kakao.maps.MarkerImage(
                                  curve,
                                  imageSize
                              )
                            : Ldesc[i] === "고속도로 안개 다발구간"
                            ? new window.kakao.maps.MarkerImage(
                                  foggy,
                                  imageSize
                              )
                            : Ldesc[i] ===
                              "우로굽은도로구간 도로이탈 사고많은 곳 임"
                            ? new window.kakao.maps.MarkerImage(
                                  winding,
                                  imageSize
                              )
                            : new window.kakao.maps.MarkerImage(
                                  slippery,
                                  imageSize
                              ),
                });

                window.kakao.maps.event.addListener(
                    polyline,
                    "mouseover",
                    function (mouseEvent: any) {
                        polyline.setOptions({ fillColor: "#09f" });
                        // console.log(Ldesc.length);
                        // console.log(Ldesc[0]);
                        customOverlay.setContent(
                            "<div class = desc>" + Ldesc[i] + "</div>"
                        );
                        customOverlay.setPosition(mouseEvent.latLng);
                        customOverlay.setMap(kakaoMap);
                    }
                );
            }
        }
        dispalyLine(linePath, kakaoMap);
    }, [areas, kakaoMap]);

    console.log(Larr);
    console.log(Ldesc);
    // console.log(Larr[0]);

    return (
        <>
            <div id="map" style={{ width: "80vw", height: "100vh" }} />
            <ButtonSet>
                {btnSet.map((value, index) => {
                    return (
                        <Button
                            key={index}
                            value={value.value}
                            onClick={handleClick}
                        >
                            {value.con}
                        </Button>
                    );
                })}
            </ButtonSet>
        </>
    );
};

const ButtonSet = styled.div`
    display: flex;
    width: 200px;
    height: 30px;
    justify-content: space-evenly;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 5;
`;

const Button = styled.button`
    height: 25px;
    background-color: #1f68f6;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 13px;
    padding: 0 7px 0 7px;
    box-shadow: 0 2px 3px #00000050;
    &:hover {
        cursor: pointer;
        background-color: #fff;
        color: #1f68f6;
    }
`;

export default Map;
