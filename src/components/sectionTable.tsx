import React, { useState } from "react";
import styled from "styled-components";

import Search from "@/common/Search";
import Button_R from "@/common/Button_R";
import Main from "@/common/main";
import CCTV from "./CCTV";
import Map from "./Map";

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

const SectionTable = ({setData}:{setData: (data:string) => void}) => {
  const [isCheck, setIsCheck] = useState<boolean>(true);

  const getData =(e: React.MouseEvent<HTMLButtonElement>)=>{
    setData(e.currentTarget.value)  
    // console.log(e.currentTarget)  
  }

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
            <form>
              <PathButton>경로검색</PathButton>
            </form>
          </>
        )}

        <Main></Main>

        <ButtonDiv>
          {button_item.map((value: any, index: any) => {
            return (
              <button style={{width:"65px", height:"65px",backgroundColor: "#ffffff", border: "1px solid white",color: "#1f68f6",borderRadius: "0.5rem",cursor: "pointer"}}
              onClick={getData}
              key = {value.name}
              value = {value.name}
              >        
                <img key={value.src} src={value.src} alt="icon"></img>
                <p>{value.name}</p>               
              </button> 
              // <Button onClick={getData} key={index} icon={value.src} name={value.name} ></Button>
            );
            // 맵 함수로 버튼을 생성
            // 각 버튼을 클릭 시, 함수 실행
            // 함수가 실행되면 set을 통해 값 변경
            // 변경된 값을 상위 폴더로 이동(매개변수 필요)
            // 상위 폴더에서 동일한 usestate()작성해서 버튼에서 가지고 온 데이터 삽입
            // 삼항자를 이용하여 렌더링
          
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
  border 1px solid #1f68f6;
  border-radius: 0.5rem;
  margin-left: 11rem;
`;

const button1 = styled.button`
  width: 65px;
  height: 65px;
  background-color: #ffffff;
  border: 1px solid white;
  color: #1f68f6;
  border-radius: 0.5rem;
  cursor: pointer;
`

export default SectionTable;