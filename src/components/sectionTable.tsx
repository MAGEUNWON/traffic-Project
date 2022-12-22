import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@/common/Button";
import { Search, SingleSearch } from "@/common/Search";
import Button_R from "@/common/Button_R";
import Main from "@/common/main";

const SectionTable = ({ kakaoMap }: any) => {
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const [inputText, setInputText] = useState("");
  const [searchplace, setSearchPlace] = useState("");

  const button_item = [
    {
      src: "asset/icon_cctv.png",
      name: "CCTV",
      onClick: () => {
        console.log("클릭");
      },
    },
    {
      src: "asset/icon_conflagration.png",
      name: "돌발정보",
      onClick: () => {
        console.log("클릭");
      },
    },
    {
      src: "asset/icon_safe.png",
      name: "보호구역",
      onClick: () => {
        console.log("클릭");
      },
    },
    {
      src: "asset/icon_forecast.png",
      name: "날씨상황",
      onClick: () => {
        console.log("클릭");
      },
    },
    {
      src: "asset/icon_traffic.png",
      name: "교통상황",
      onClick: () => {
        console.log("클릭");
      },
    },
    {
      src: "asset/icon_parkinglot.png",
      name: "주차장",
      onClick: () => {
        console.log("클릭");
      },
    },
  ];

  const onChangeWhere = (e: any) => {
    setInputText(e.target.value);
  };

  const submitWhere = (e: any) => {
    e.preventDefault();
    setSearchPlace(inputText);
    setInputText("");
  };
  console.log(inputText);
  useEffect(() => {
    var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    // 장소 검색 객체를 생성
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchplace, placesSearchCB);
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        kakaoMap.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: any) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new window.kakao.maps.Marker({
        map: kakaoMap,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(kakaoMap, marker);
      });
    }
  }, []);

  return (
    <>
      <SectionSet>
        <Button_RDiv>
          <Button_R
            icon="/asset/icon_search.png"
            contents="검색"
            onClick={() => {
              setIsCheck(true);
            }}
          ></Button_R>
          <Button_R
            icon="/asset/icon_search.png"
            contents="길찾기"
            onClick={() => {
              setIsCheck(false);
            }}
          ></Button_R>
        </Button_RDiv>

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

        <Main></Main>

        <ButtonDiv>
          {button_item.map((value, index) => {
            return (
              <Button
                key={index}
                icon={value.src}
                name={value.name}
                onClick={value.onClick}
              ></Button>
            );
          })}
        </ButtonDiv>
      </SectionSet>
    </>
  );
};

const SectionSet = styled.section`
  width: 20vw;
  height: 100vh;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Button_RDiv = styled.div`
  width: 230px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ButtonDiv = styled.div`
  width: 218px;
  height: 190px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const PathButton = styled.button`
  width: 70px;
  height: 25px;
  background-color: #1f68f6;
  color: #ffffff;
  border: 1px solid #1f68f6;
  border-radius: 0.5rem;
  margin-left: 11rem;
`;

export default SectionTable;
