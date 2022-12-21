import React, { useState } from "react";
import styled from "styled-components";
import Button from "@/common/Button";
import Search from "@/common/Search";
import Button_R from "@/common/Button_R";
import Main from "@/common/main";

const button_item = [
  {
    src: "asset/icon_cctv.png",
    name: "CCTV",
  },
  {
    src: "asset/icon_conflagration.png",
    name: "돌발정보",
  },
  {
    src: "asset/icon_safe.png",
    name: "보호구역",
  },
  {
    src: "asset/icon_forecast.png",
    name: "날씨상황",
  },
  {
    src: "asset/icon_traffic.png",
    name: "교통상황",
  },
  {
    src: "asset/icon_parkinglot.png",
    name: "주차장",
  },
];

const SectionTable = () => {
  const [isCheck, setIsCheck] = useState<boolean>(true);
  console.log(isCheck);

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
          <Search placeholder="어디로 갈까요?"></Search>
        ) : (
          <>
            <Search placeholder="출발지 검색"></Search>{" "}
            <Search placeholder="도착지 검색"></Search>{" "}
          </>
        )}

        <Main></Main>

        <ButtonDiv>
          {button_item.map((value, index) => {
            return (
              <Button key={index} icon={value.src} name={value.name}></Button>
            );
          })}
          {/* <Button icon="asset/icon_cctv.png"></Button>
          <Button icon="asset/icon_conflagration.png"></Button>
          <Button icon="asset/icon_safe.png"></Button>
          <Button icon="asset/icon_forecast.png"></Button>
          <Button icon="asset/icon_traffic.png"></Button>
          <Button icon="asset/icon_parkinglot.png"></Button> */}
        </ButtonDiv>
      </SectionSet>
    </>
  );
};

const SectionSet = styled.section`
  width: 20vw;
  height: 99vh;
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

// const SearchSet = styled.input`
// margin-top: 3px;
// `

const ButtonDiv = styled.div`
  width: 218px;
  height: 190px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

// const MainSet = styled.main`
// width: 300px;
// height: 500px;
// background-color: #FFFFFF;
// `;

export default SectionTable;