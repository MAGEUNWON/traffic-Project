import React, { useEffect, useState, useRef } from "react";
//useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook. 기본적으로 렌더링되고 난 직후마다 실행.
//useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됨.
//특정 값이 변경 될 때만 호출하고 싶은 경우에는 useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 됨.
import styled from "styled-components";
import axios from "axios";
import SectionTable from "./sectionTable";
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

const Map = ({ parkingData, accidentData, datas }: any) => {
    const [mapTypes, SetMapTypes] = useState<string>("Roadmap");
    const [data, setData] = useState(null);
    const [dot, setDot] = useState("");
    const [kakaoMap, setKakaoMap] = useState();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        SetMapTypes(e.currentTarget.value);
    };

    const ref = useRef("");

    ref.current = mapTypes;

    useEffect(() => {
        // console.log(maptype)
        //useEffect는 React.StrictMode가 적용된 개발환경에서는 콘솔이 두번씩 찍힘.

        let container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
        //카카오 객체가 window 하위 객체라는 것을 정의해야 하므로 window.kakao로 변경해야 함
        let options = {
            center: new window.kakao.maps.LatLng(36.3492506, 127.3776511),
            level: 3, //지도의 확대, 축소 정도
        };

        let map = new window.kakao.maps.Map(container, options);
        setKakaoMap(map);

        axios.get(`http://127.0.0.1:5000/hazard`).then((response) => {
            setData(response.data);
        });

        // axios.get(`http://127.0.0.1:5000/dot`).then((response: any) => {
        //     let line: any[] = [];

        //     response.data.forEach((e: any) => {
        //         // console.log(e);
        //         line.push({
        //             path: [
        //                 new window.kakao.maps.LatLng(
        //                     e.node_Ycode,
        //                     e.node_Xcode
        //                 ),
        //             ],
        //         });
        //     });

        //     let polyline: any = [];
        //     let markerArr: any[] = [];
        //     let start = new window.kakao.maps.Marker({});
        //     let end = new window.kakao.maps.Marker({});
        //     let pline: any = [];
        //     let markerObject = [start, end];

        //     for (let i = 0; i < line.length; i++) {
        //         //i번째 정보를 가져옵니다.
        //         let item = line[i];
        //         // 지도에 표시할 선을 생성합니다
        //         polyline.push(
        //             new window.kakao.maps.Polyline({
        //                 map: map, //지도에 선을 표시합니다.
        //                 path: item.path, // 선을 구성하는 좌표배열 입니다
        //                 strokeWeight: 10, // 선의 두께 입니다
        //                 strokeColor: item.color, // 선의 색깔입니다
        //                 strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //                 strokeStyle: "solid", // 선의 스타일입니다
        //             })
        //         );

        //         window.kakao.maps.event.addListener(
        //             polyline[i],
        //             "click",
        //             async function (e: any) {
        //                 polyline[i].setOptions({
        //                     strokeColor: "black",
        //                 });

        //                 let latlng = e.latLng;

        //                 if (markerArr.length === 0) {
        //                     markerArr.push(response.data[i]);
        //                     start.setPosition(latlng);
        //                     start.setMap(map);
        //                 } else if (markerArr.length === 1) {
        //                     markerArr.push(response.data[i]);
        //                     end.setPosition(latlng);
        //                     end.setMap(map);

        //                     const getData = await axios.post<any>(
        //                         "http://localhost:5000/directions",
        //                         {
        //                             markerArr,
        //                         }
        //                     );
        //                     let path: any = [];

        //                     getData.data.finalData.filter(
        //                         (item: any, i: number, arr: any) => {
        //                             if (arr.length - 1 === i) return false;
        //                             path.push([
        //                                 new window.kakao.maps.LatLng(
        //                                     arr[i].node_Ycode,
        //                                     arr[i].node_Xcode
        //                                 ),
        //                                 new window.kakao.maps.LatLng(
        //                                     arr[i + 1].node_Ycode,
        //                                     arr[i + 1].node_Xcode
        //                                 ),
        //                             ]);
        //                         }
        //                     );

        //                     path.map((el: any, i: number) => {
        //                         let color = "black";
        //                         if (
        //                             getData.data.trafficData[i]?.congestion ===
        //                             1
        //                         ) {
        //                             color = "green";
        //                         } else if (
        //                             getData.data.trafficData[i]?.congestion ===
        //                             2
        //                         ) {
        //                             color = "Orange";
        //                         } else if (
        //                             getData.data.trafficData[i]?.congestion ===
        //                             3
        //                         ) {
        //                             color = "red";
        //                         }

        //                         pline.push(
        //                             new window.kakao.maps.Polyline({
        //                                 map: map, //지도에 선을 표시합니다.
        //                                 path: el, // 선을 구성하는 좌표배열 입니다
        //                                 strokeWeight: 10, // 선의 두께 입니다
        //                                 strokeColor: color, // 선의 색깔입니다
        //                                 strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //                                 strokeStyle: "solid", // 선의 스타일입니다
        //                             })
        //                         );

        //                         window.kakao.maps.event.addListener(
        //                             pline[i],
        //                             "click",
        //                             (e: any) => {
        //                                 console.log(getData.data.trafficData);
        //                                 new window.kakao.maps.InfoWindow({
        //                                     map: map, // 인포윈도우가 표시될 지도
        //                                     position:
        //                                         new window.kakao.maps.LatLng(
        //                                             e.latLng.Ma,
        //                                             e.latLng.La
        //                                         ),
        //                                     content: `<div style='width:180px; height:auto'>
        //                                         <div>
        //                                             <p>시작노드: ${getData.data.trafficData[i].startNodeName}</p>
        //                                             <p>종료노드: ${getData.data.trafficData[i].endNodeName}</p>
        //                                             <p>링크ID: ${getData.data.trafficData[i].linkID}</p>
        //                                             <p>길이: ${getData.data.trafficData[i].linkLength}</p>
        //                                             <p>도로이름: ${getData.data.trafficData[i].roadName}</p>
        //                                             <p>속도: ${getData.data.trafficData[i].speed}</p>
        //                                             <p>교통량: ${getData.data.trafficData[i].travelT}</p>
        //                                             <p>방향: ${getData.data.trafficData[i].udType}</p>
        //                                         </div>`,
        //                                     removable: true,
        //                                 });
        //                             }
        //                         );
        //                     });
        //                 } else if (markerArr.length > 1) {
        //                     pline.map((el: any, i: any) =>
        //                         pline[i].setMap(null)
        //                     );
        //                     pline = [];

        //                     end.setPosition(latlng);
        //                     end.setMap(map);
        //                     markerArr.splice(1, 0, response.data[i]);

        //                     const getData = await axios.post<any>(
        //                         "http://localhost:5000/directions",
        //                         {
        //                             markerArr,
        //                         }
        //                     );

        //                     let path: any = [];

        //                     getData.data.finalData.filter(
        //                         (item: any, i: number, arr: any) => {
        //                             if (arr.length - 1 === i) return false;
        //                             path.push([
        //                                 new window.kakao.maps.LatLng(
        //                                     arr[i].node_Ycode,
        //                                     arr[i].node_Xcode
        //                                 ),
        //                                 new window.kakao.maps.LatLng(
        //                                     arr[i + 1].node_Ycode,
        //                                     arr[i + 1].node_Xcode
        //                                 ),
        //                             ]);
        //                         }
        //                     );

        //                     path.map((el: any, index: number) => {
        //                         let color = "black";
        //                         if (
        //                             getData.data.trafficData[index]
        //                                 ?.congestion === 1
        //                         ) {
        //                             color = "green";
        //                         } else if (
        //                             getData.data.trafficData[index]
        //                                 ?.congestion === 2
        //                         ) {
        //                             color = "Orange";
        //                         } else if (
        //                             getData.data.trafficData[index]
        //                                 ?.congestion === 3
        //                         ) {
        //                             color = "red";
        //                         }
        //                         pline.push(
        //                             new window.kakao.maps.Polyline({
        //                                 map: map, //지도에 선을 표시합니다.
        //                                 path: el, // 선을 구성하는 좌표배열 입니다
        //                                 strokeWeight: 10, // 선의 두께 입니다
        //                                 strokeColor: color, // 선의 색깔입니다
        //                                 strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //                                 strokeStyle: "solid", // 선의 스타일입니다
        //                             })
        //                         );
        //                         window.kakao.maps.event.addListener(
        //                             pline[index],
        //                             "click",
        //                             (e: any) => {
        //                                 new window.kakao.maps.InfoWindow({
        //                                     map: map, // 인포윈도우가 표시될 지도
        //                                     position:
        //                                         new window.kakao.maps.LatLng(
        //                                             e.latLng.Ma,
        //                                             e.latLng.La
        //                                         ),

        //                                     content: `<div style='width:180px; height:auto'>
        //                                         <div>
        //                                             <p>시작노드: ${getData.data.trafficData[i].startNodeName}</p>
        //                                             <p>종료노드: ${getData.data.trafficData[i].endNodeName}</p>
        //                                             <p>링크ID: ${getData.data.trafficData[i].linkID}</p>
        //                                             <p>길이: ${getData.data.trafficData[i].linkLength}</p>
        //                                             <p>도로이름: ${getData.data.trafficData[i].roadName}</p>
        //                                             <p>속도: ${getData.data.trafficData[i].speed}</p>
        //                                             <p>교통량: ${getData.data.trafficData[i].travelT}</p>
        //                                             <p>방향: ${getData.data.trafficData[i].udType}</p>
        //                                         </div>`,

        //                                     removable: true,
        //                                 });
        //                             }
        //                         );
        //                     });
        //                 }

        //                 markerObject.forEach((el, i) => {
        //                     window.kakao.maps.event.addListener(
        //                         el,
        //                         "click",
        //                         (e: any) => {
        //                             new window.kakao.maps.InfoWindow({
        //                                 map: map, // 인포윈도우가 표시될 지도
        //                                 position: new window.kakao.maps.LatLng(
        //                                     markerArr[i].node_Ycode,
        //                                     markerArr[i].node_Xcode
        //                                 ),
        //                                 content: `<div style='width:180px; height:auto'>
        //                                                 <p>교차로명칭: ${markerArr[i].node_name}</p>
        //                                                 <p>위도: ${markerArr[i].node_Xcode}</p>
        //                                                 <p>경도: ${markerArr[i].node_Ycode}</p>
        //                                                 <p>노드ID: ${markerArr[i].node_id}</p>
        //                                                 <p>노드유형: ${markerArr[i].node_type}</p>
        //                                                 <p>회전제한유무:${markerArr[i].turn_p}</p>
        //                                              </div>`,
        //                                 removable: true,
        //                             });
        //                         }
        //                     );
        //                 });
        //             }
        //         );
        //     }
        // });

        // let mapTypeControl = new window.kakao.maps.mapTypeControl();
        // map.addControl(mapTypeControl, window.kakao.maps.ControlPosiiton.TOPRIGHT);

        // maptype === 'traffic'?  window.kakao.maps.MapTypeId.TRAFFIC:null
        // maptype === 'roadview'?  window.kakao.maps.MapTypeId.ROADVIEEW:null
        // maptype === 'use_district'?  window.kakao.maps.MapTypeId.USE_DISTRICT:null

        //버튼 클릭하면 호출 (clickEvent)
        let currentTypeId;
        let changeMapType;

        //maptype에 따라 지도에 추가할 지도타입을 결정

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
        let markerPosition = new window.kakao.maps.LatLng(
            36.3492506,
            127.3776511
        );
        //마커 생성
        let marker = new window.kakao.maps.Marker({
            position: markerPosition,
        });
        //마커가 지도 위에 표시되도록 설정
        marker.setMap(map);
    }, [mapTypes]);

    const btnSet: btnSet[] = [
        { value: "Roadmap", con: "지도" },
        { value: "Skyview", con: "스카이뷰" },
        { value: "roadview", con: "로드뷰" },
    ];

    return (
        <>
            <SectionTable
                parkingData={parkingData}
                accidentData={accidentData}
                datas={datas}
                map={kakaoMap}
            />
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
    width: 250px;
    height: 30px;
    justify-content: space-evenly;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 5;
`;

const Button = styled.button`
    width: 60px;
    height: 50px;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 0.5rem;
`;

export default Map;
