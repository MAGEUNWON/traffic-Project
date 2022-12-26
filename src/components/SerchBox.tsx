import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { Search, SingleSearch } from "@/common/Search";
import Button_R from "@/common/Button_R";
import "./SerchBox.css";
import axios from "axios";

const SerchBox = ({ kakaoMap }: any) => {
    const [isCheck, setIsCheck] = useState<boolean>(true);
    const [inputText, setInputText] = useState("");
    const [searchplace, setSearchPlace] = useState("");
    const [address, setAddress] = useState<any>([]);
    const [trafficData, setTrafficData] = useState<any>([]);
    let polyline: any = [];

    useEffect(() => {
        console.log(polyline);

        if (isCheck) {
            polyline.map((el: any) => {
                console.log(el, "호호홓");
            });
        }
    }, [isCheck]);

    useEffect(() => {
        // ! 장소 검색
        interface placeType {
            place_name: string;
            road_address_name: string;
            address_name: string;
            phone: string;
            place_url: string;
        }

        let markers: any[] = [];
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        // 장소 검색 객체를 생성
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(searchplace, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data: any, status: any, pagination: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);

                // 페이지 번호를 표출합니다
                displayPagination(pagination);
            } else if (
                status === window.kakao.maps.services.Status.ZERO_RESULT
            ) {
                alert("검색 결과가 존재하지 않습니다.");
                return;
            } else if (status === window.kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
                return;
            }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places: string | any[]) {
            const listEl = document.getElementById("placesList"),
                menuEl = document.getElementById("menu_wrap"),
                fragment = document.createDocumentFragment(),
                bounds = new window.kakao.maps.LatLngBounds();

            // 검색 결과 목록에 추가된 항목들을 제거
            listEl && removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for (var i = 0; i < places.length; i++) {
                // 마커를 생성하고 지도에 표시합니다
                let placePosition = new window.kakao.maps.LatLng(
                        places[i].y,
                        places[i].x
                    ),
                    marker = addMarker(placePosition, i, undefined),
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시
                // mouseout 했을 때는 인포윈도우를 닫기
                (function (marker, title) {
                    window.kakao.maps.event.addListener(
                        marker,
                        "mouseover",
                        function () {
                            displayInfowindow(marker, title);
                        }
                    );

                    window.kakao.maps.event.addListener(
                        marker,
                        "mouseout",
                        function () {
                            infowindow.close();
                        }
                    );

                    itemEl.onmouseover = function () {
                        displayInfowindow(marker, title);
                    };

                    itemEl.onmouseout = function () {
                        infowindow.close();
                    };
                })(marker, places[i].place_name);

                fragment.appendChild(itemEl);
            }

            // 검색결과 항목들을 검색결과 목록 Element에 추가
            listEl && listEl.appendChild(fragment);
            if (menuEl) {
                menuEl.scrollTop = 0;
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            kakaoMap.setBounds(bounds);
        }

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index: number, places: placeType) {
            const el = document.createElement("li");

            let itemStr =
                '<span class="markerbg marker_' +
                (index + 1) +
                '"></span>' +
                '<div class="info">' +
                "   <h5>" +
                places.place_name +
                "</h5>";

            if (places.road_address_name) {
                itemStr +=
                    "    <span>" +
                    places.road_address_name +
                    "</span>" +
                    '   <span class="jibun gray">' +
                    places.address_name +
                    "</span>";
            } else {
                itemStr += "    <span>" + places.address_name + "</span>";
            }

            itemStr +=
                '  <span class="tel">' + places.phone + "</span>" + "</div>";
            el.innerHTML = itemStr;
            el.className = "item";

            return el;
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position: any, idx: number, title: undefined) {
            const imageSrc =
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
            const imageSize = new window.kakao.maps.Size(36, 37); // 마커 이미지의 크기
            const imgOptions = {
                spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            };
            const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imgOptions
            );
            const marker = new window.kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage,
            });

            marker.setMap(kakaoMap); // 지도 위에 마커를 표출합니다
            markers.push(marker); // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }
        // 검색결과 목록 하단에 페이지번호를 표시는 함수
        function displayPagination(pagination: {
            last: number;
            current: number;
            gotoPage: (arg0: number) => void;
        }) {
            const paginationEl = document.getElementById(
                "pagination"
            ) as HTMLElement;
            let fragment = document.createDocumentFragment();
            let i;

            // 기존에 추가된 페이지번호를 삭제
            while (paginationEl.hasChildNodes()) {
                paginationEl.lastChild &&
                    paginationEl.removeChild(paginationEl.lastChild);
            }
            for (i = 1; i <= pagination.last; i++) {
                const el = document.createElement("a") as HTMLAnchorElement;
                el.href = "#";
                el.innerHTML = i.toString();

                if (i === pagination.current) {
                    el.className = "on";
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        };
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }
        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
        // 인포윈도우에 장소명을 표시
        function displayInfowindow(marker: any, title: string) {
            const content =
                '<div style="padding:5px;z-index:1;" class="marker-title">' +
                title +
                "</div>";

            infowindow.setContent(content);
            infowindow.open(kakaoMap, marker);
        }
        // 검색결과 목록의 자식 Element를 제거하는 함수
        function removeAllChildNods(el: HTMLElement) {
            while (el.hasChildNodes()) {
                el.lastChild && el.removeChild(el.lastChild);
            }
        }
    }, [searchplace]);
    // 목적지 검색창에 입력하는 input창에 입력하면 input값을 inputText에 담기

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
            onClick: (kakaoMap: any) => {
                setIsCheck(() => true);

                // polygon.setMap(null);
            },
        },
        {
            icon: "/asset/icon_roadCar.png",
            contents: "길찾기",
            onClick: (kakaoMap: any) => {
                setIsCheck(false);

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
                                        let color = "black";
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

    console.log(trafficData);

    return (
        <MainBox>
            <div>
                {searchButton.map((item, index) => {
                    return (
                        <Button_R
                            key={index}
                            icon={item.icon}
                            contents={item.contents}
                            onClick={() => item.onClick(kakaoMap)}
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
                    <form
                        onSubmit={(e: any) => {
                            e.preventDefault();
                        }}
                    >
                        {["start", "end"].map((el, i) => {
                            return (
                                <div key={el}>
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

                                        {/* <div>평균속도:{el.speed}</div> */}
                                    </div>
                                );
                            })}
                        </SearchResult>
                    </form>
                )}
            </div>
        </MainBox>
    );
};

const TrafficWrap = styled.div`
    border-bottom: 1px solid #505050;
    padding: 10px;
    margin-bottom: 15px;
`;

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

export default SerchBox;
