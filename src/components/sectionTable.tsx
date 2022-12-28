import { useState, forwardRef } from "react";
import styled from "styled-components";
import { Search, SingleSearch } from "@/common/Search";
import Button_R from "@/common/Button_R";
import "./sectionTable.css";
import axios from "axios";

const SectionTable = forwardRef(({ setSearchPlace, mapRef }: any) => {
    const [isCheck, setIsCheck] = useState<boolean>(true);
    const [inputText, setInputText] = useState("");
    const [trafficData, setTrafficData] = useState<any>([]);
    const [address, setAddress] = useState<any>([]);
    let polyline: any = [];

    const onChangeWhere = (e: any) => {
        setInputText(e.target.value);
    };
    // inputeText에 값을 searchPlace에 값 받음
    const submitWhere = (e: any) => {
        e.preventDefault();
        setSearchPlace(inputText);
        setInputText("");
    };

    const searchButton = [
        {
            icon: "/asset/icon_search.png",
            contents: "검색",
            onClick: () => {
                setIsCheck(true);
                // polygon.setMap(null);
            },
        },
        {
            icon: "/asset/icon_roadCar.png",
            contents: "길찾기",
            onClick: () => {
                setIsCheck(false);

                //카카오 객체가 window 하위 객체라는 것을 정의해야 하므로 window.kakao로 변경해야 함

                let kakaoMap: any = new window.kakao.maps.Map(
                    window.document.getElementById("map"),
                    {
                        center: new window.kakao.maps.LatLng(
                            36.3492506,
                            127.3776511
                        ),
                        level: 3, //지도의 확대, 축소 정도
                    }
                );

                axios.get(`http://127.0.0.1:5000/dot`).then((response: any) => {
                    let line: any[] = [];

                    response.data.forEach((e: any) => {
                        // console.log(e);
                        line.push({
                            path: [
                                new window.kakao.maps.LatLng(
                                    e.node_Ycode,
                                    e.node_Xcode
                                ),
                            ],
                        });
                    });

                    let markerArr: any[] = [];
                    let start = new window.kakao.maps.Marker({});
                    let end = new window.kakao.maps.Marker({});
                    let pline: any = [];
                    let markerObject = [start, end];
                    let address: any[] = [];

                    for (let i = 0; i < line.length; i++) {
                        //i번째 정보를 가져옵니다.
                        let item = line[i];
                        // 지도에 표시할 선을 생성합니다
                        polyline.push(
                            new window.kakao.maps.Polyline({
                                map: kakaoMap, //지도에 선을 표시합니다.
                                path: item.path, // 선을 구성하는 좌표배열 입니다
                                strokeWeight: 10, // 선의 두께 입니다
                                strokeColor: item.color, // 선의 색깔입니다
                                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                                strokeStyle: "solid", // 선의 스타일입니다
                            })
                        );

                        window.kakao.maps.event.addListener(
                            polyline[i],
                            "click",
                            async function (e: any) {
                                polyline[i].setOptions({
                                    strokeColor: "black",
                                });

                                let latlng = e.latLng;

                                let geocoder =
                                    new window.kakao.maps.services.Geocoder();

                                let coord = new window.kakao.maps.LatLng(
                                    latlng.Ma,
                                    latlng.La
                                );

                                let callback = function (
                                    result: object[],
                                    status: string
                                ) {
                                    if (
                                        status ===
                                        window.kakao.maps.services.Status.OK
                                    ) {
                                        if (address.length === 2) {
                                            address.pop();
                                            address.push(...result);
                                            setAddress(() => {
                                                return { ...address };
                                            });
                                        } else if (address.length === 1) {
                                            address.push(...result);
                                            console.log(address);
                                            setAddress(() => {
                                                return { ...address };
                                            });
                                        } else {
                                            address.push(...result);
                                            setAddress(address);
                                        }
                                    }
                                };

                                geocoder.coord2Address(
                                    coord.getLng(),
                                    coord.getLat(),
                                    callback
                                );

                                if (markerArr.length === 0) {
                                    markerArr.push(response.data[i]);
                                    start.setPosition(latlng);
                                    start.setMap(kakaoMap);
                                } else if (markerArr.length === 1) {
                                    markerArr.push(response.data[i]);
                                    end.setPosition(latlng);
                                    end.setMap(kakaoMap);

                                    const getData = await axios.post<any>(
                                        "http://localhost:5000/directions",
                                        {
                                            markerArr,
                                        }
                                    );
                                    let path: any = [];
                                    let saveTraffic: any = {
                                        linkLength: 0,
                                        speed: 0,
                                        travelT: 0,
                                    };

                                    getData.data.trafficData.forEach(
                                        (el: any, i: any) => {
                                            if (el.linkLength !== "정보없음") {
                                                saveTraffic.linkLength +=
                                                    el.linkLength;
                                                saveTraffic.speed += el.speed;
                                                saveTraffic.travelT +=
                                                    el.travelT;
                                            }
                                        }
                                    );

                                    setTrafficData([saveTraffic]);

                                    getData.data.finalData.filter(
                                        (item: any, i: number, arr: any) => {
                                            if (arr.length - 1 === i)
                                                return false;
                                            path.push([
                                                new window.kakao.maps.LatLng(
                                                    arr[i].node_Ycode,
                                                    arr[i].node_Xcode
                                                ),
                                                new window.kakao.maps.LatLng(
                                                    arr[i + 1].node_Ycode,
                                                    arr[i + 1].node_Xcode
                                                ),
                                            ]);
                                        }
                                    );

                                    path.map((el: any, i: number) => {
                                        let color = "green";
                                        if (
                                            getData.data.trafficData[i]
                                                ?.congestion === 1
                                        ) {
                                            color = "green";
                                        } else if (
                                            getData.data.trafficData[i]
                                                ?.congestion === 2
                                        ) {
                                            color = "Orange";
                                        } else if (
                                            getData.data.trafficData[i]
                                                ?.congestion === 3
                                        ) {
                                            color = "red";
                                        }

                                        pline.push(
                                            new window.kakao.maps.Polyline({
                                                map: kakaoMap, //지도에 선을 표시합니다.
                                                path: el, // 선을 구성하는 좌표배열 입니다
                                                strokeWeight: 10, // 선의 두께 입니다
                                                strokeColor: color, // 선의 색깔입니다
                                                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                                                strokeStyle: "solid", // 선의 스타일입니다
                                            })
                                        );

                                        window.kakao.maps.event.addListener(
                                            pline[i],
                                            "click",
                                            (e: any) => {
                                                new window.kakao.maps.InfoWindow(
                                                    {
                                                        map: kakaoMap, // 인포윈도우가 표시될 지도
                                                        position:
                                                            new window.kakao.maps.LatLng(
                                                                e.latLng.Ma,
                                                                e.latLng.La
                                                            ),
                                                        content: `<div style='width:180px; height:auto'>
                                              <div>
                                                  <p>시작노드: ${getData.data.trafficData[i].startNodeName}</p>
                                                  <p>종료노드: ${getData.data.trafficData[i].endNodeName}</p>
                                                  <p>링크ID: ${getData.data.trafficData[i].linkID}</p>
                                                  <p>길이: ${getData.data.trafficData[i].linkLength}</p>
                                                  <p>도로이름: ${getData.data.trafficData[i].roadName}</p>
                                                  <p>속도: ${getData.data.trafficData[i].speed}</p>
                                                  <p>교통량: ${getData.data.trafficData[i].travelT}</p>
                                                  <p>방향: ${getData.data.trafficData[i].udType}</p>
                                              </div>`,
                                                        removable: true,
                                                    }
                                                );
                                            }
                                        );
                                    });
                                } else if (markerArr.length > 1) {
                                    pline.map((el: any, i: any) =>
                                        pline[i].setMap(null)
                                    );
                                    pline = [];

                                    end.setPosition(latlng);
                                    end.setMap(kakaoMap);
                                    markerArr.splice(1, 0, response.data[i]);

                                    const getData = await axios.post<any>(
                                        "http://localhost:5000/directions",
                                        {
                                            markerArr,
                                        }
                                    );

                                    let path: any = [];

                                    let saveTraffic: any = {
                                        linkLength: 0,
                                        speed: 0,
                                        travelT: 0,
                                    };
                                    setTrafficData([saveTraffic]);

                                    getData.data.trafficData.forEach(
                                        (el: any) => {
                                            if (el.linkLength !== "정보없음") {
                                                saveTraffic.linkLength +=
                                                    el.linkLength;
                                                saveTraffic.speed += el.speed;
                                                saveTraffic.travelT +=
                                                    el.travelT;
                                            }
                                        }
                                    );

                                    // 두번이상 클릭일떄
                                    getData.data.finalData.filter(
                                        (item: any, i: number, arr: any) => {
                                            if (arr.length - 1 === i)
                                                return false;
                                            path.push([
                                                new window.kakao.maps.LatLng(
                                                    arr[i].node_Ycode,
                                                    arr[i].node_Xcode
                                                ),
                                                new window.kakao.maps.LatLng(
                                                    arr[i + 1].node_Ycode,
                                                    arr[i + 1].node_Xcode
                                                ),
                                            ]);
                                        }
                                    );

                                    path.map((el: any, index: number) => {
                                        let color = "black";
                                        if (
                                            getData.data.trafficData[index]
                                                ?.congestion === 1
                                        ) {
                                            color = "green";
                                        } else if (
                                            getData.data.trafficData[index]
                                                ?.congestion === 2
                                        ) {
                                            color = "Orange";
                                        } else if (
                                            getData.data.trafficData[index]
                                                ?.congestion === 3
                                        ) {
                                            color = "red";
                                        }
                                        pline.push(
                                            new window.kakao.maps.Polyline({
                                                map: kakaoMap, //지도에 선을 표시합니다.
                                                path: el, // 선을 구성하는 좌표배열 입니다
                                                strokeWeight: 10, // 선의 두께 입니다
                                                strokeColor: color, // 선의 색깔입니다
                                                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                                                strokeStyle: "solid", // 선의 스타일입니다
                                            })
                                        );
                                    });
                                }

                                markerObject.forEach((el, i) => {
                                    window.kakao.maps.event.addListener(
                                        el,
                                        "click",
                                        (e: any) => {
                                            new window.kakao.maps.InfoWindow({
                                                map: kakaoMap, // 인포윈도우가 표시될 지도
                                                position:
                                                    new window.kakao.maps.LatLng(
                                                        markerArr[i].node_Ycode,
                                                        markerArr[i].node_Xcode
                                                    ),
                                                content: `<div style='width:180px; height:auto'>
                                                      <p>교차로명칭: ${markerArr[i].node_name}</p>
                                                      <p>위도: ${markerArr[i].node_Xcode}</p>
                                                      <p>경도: ${markerArr[i].node_Ycode}</p>
                                                      <p>노드ID: ${markerArr[i].node_id}</p>
                                                      <p>노드유형: ${markerArr[i].node_type}</p>
                                                      <p>회전제한유무:${markerArr[i].turn_p}</p>
                                                   </div>`,
                                                removable: true,
                                            });
                                        }
                                    );
                                });
                            }
                        );
                    }
                });
            },
        },
    ];

    return (
        <MainBox>
            <div>
                {searchButton.map((item, index) => {
                    return (
                        <Button_R
                            key={index}
                            icon={item.icon}
                            contents={item.contents}
                            onClick={item.onClick}
                        />
                    );
                })}
            </div>
            <div>
                {isCheck ? (
                    <>
                        <SingleSearch
                            onSubmit={submitWhere}
                            placeholder="어디로 갈까요?"
                            onChange={onChangeWhere}
                            value={inputText}
                        />
                        <SearchResult>
                            <div id="menu_wrap" className="scroll-wrapper">
                                <ul id="placesList"></ul>
                            </div>
                            <div id="pagination"></div>
                        </SearchResult>
                    </>
                ) : (
                    <>
                        {["start", "end"].map((el, i) => {
                            return (
                                <div key={i}>
                                    <Search
                                        address={address[i]}
                                        placeholder={
                                            el === "start"
                                                ? "출발지 검색"
                                                : "도착지 검색"
                                        }
                                    ></Search>
                                </div>
                            );
                        })}
                        <PathButton>경로검색</PathButton>
                        <SearchResult>
                            {trafficData.map((el: any, i: number) => {
                                return (
                                    <div key={i}>
                                        <TrafficWrap>
                                            <div>시간:{el.travelT}초</div>
                                            <div>
                                                전체길이:
                                                {Math.round(el.linkLength)}m
                                            </div>
                                        </TrafficWrap>
                                        <div>
                                            <TrafficButton>출발</TrafficButton>
                                            {address[0].address.address_name}
                                        </div>
                                        <div>
                                            <TrafficButton> 도착</TrafficButton>
                                            {address[1].address.address_name}
                                        </div>
                                    </div>
                                );
                            })}
                        </SearchResult>
                    </>
                )}
            </div>
        </MainBox>
    );
});

const MainBox = styled.div`
    width: 400px;
    height: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 10px 0 10px;
    & > div:nth-child(1) {
        width: 230px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const SearchResult = styled.div`
    width: 350px;
    height: 450px;
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    box-shadow: 0 4px 4px #00000025;
    & > div:nth-child(1) {
        width: 320px;
        height: 430px;
        margin-top: 10px;
        padding: 5px;
        overflow-y: auto;
        background: rgba(255, 255, 255);
        font-size: 12px;
    }
`;

const PathButton = styled.button`
    width: 60px;
    height: 22px;
    padding: 3px;
    margin-bottom: 7px;
    background-color: #1f68f6;
    color: #ffffff;
    border: 1px solid #1f68f6;
    border-radius: 0.5rem;
    margin-left: 11rem;
    font-size: 10px;
    box-sizing: 0px 4px 4px #00000050;
    &:hover {
        cursor: pointer;
        background-color: #ffffff;
        color: #1f68f6;
    }
`;

const TrafficWrap = styled.div`
    border-bottom: 1px solid #505050;
    padding: 10px;
    margin-bottom: 15px;
`;

const TrafficButton = styled.button`
    width: 60px;
    height: 22px;
    padding: 3px;
    margin-bottom: 7px;
    background-color: #1f68f6;
    color: #ffffff;
    border: 1px solid #1f68f6;
    border-radius: 0.5rem;
    margin-right: 5px;
    font-size: 12px;
    box-sizing: 0px 4px 4px #00000050;
    &:hover {
        cursor: pointer;
        background-color: #ffffff;
        color: #1f68f6;
    }
`;

export default SectionTable;
