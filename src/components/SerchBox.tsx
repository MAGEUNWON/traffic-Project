import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { Search, SingleSearch } from "@/common/Search";
import Button_R from "@/common/Button_R";
import "./SerchBox.css";

const SerchBox = ({ kakaoMap }: any) => {
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const [inputText, setInputText] = useState("");
  const [searchplace, setSearchPlace] = useState("");
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
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
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
          window.kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          window.kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

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
      // let itemStr = `
      //     <div class="info">
      //       <span class="marker marker_${index + 1}">
      //         ${index + 1}
      //       </span>
      //       <a href="${places.place_url}">
      //         <h5 class="info-item place-name">${places.place_name}</h5>
      //         ${
      //           places.road_address_name
      //             ? `<span class="info-item road-address-name">
      //               ${places.road_address_name}
      //              </span>
      //              <span class="info-item address-name">
      //            	 ${places.address_name}
      //          	   </span>`
      //             : `<span class="info-item address-name">
      //        	     ${places.address_name}
      //             </span>`
      //         }
      //         <span class="info-item tel">
      //           ${places.phone}
      //         </span>
      //       </a>
      //     </div>
      //     `;

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

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";
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
      const paginationEl = document.getElementById("pagination") as HTMLElement;
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
      onClick: () => {
        setIsCheck(true);
      },
    },
    {
      icon: "/asset/icon_roadCar.png",
      contents: "길찾기",
      onClick: () => {
        setIsCheck(false);
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
          <SingleSearch
            onSubmit={submitWhere}
            placeholder="어디로 갈까요?"
            onChange={onChangeWhere}
            value={inputText}
          />
        ) : (
          <>
            <Search placeholder="출발지 검색"></Search>
            <Search placeholder="도착지 검색"></Search>
            <form>
              <PathButton>경로검색</PathButton>
            </form>
          </>
        )}
      </div>

      <div>
        <div id="menu_wrap" className="scroll-wrapper">
          <ul id="placesList"></ul>
        </div>
        <div id="pagination"></div>
      </div>
    </MainBox>
  );
};

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
  & > div:nth-child(3) {
    width: 350px;
    height: 450px;
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
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
  }
`;

const PathButton = styled.button`
  width: 60px;
  height: 22px;
  padding: 3px 5px 3px 5px;
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

export default SerchBox;
