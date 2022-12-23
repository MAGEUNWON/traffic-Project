import styled from "styled-components";
import Button from "@/common/Button";
import SerchBox from "./SerchBox";
import { parkingEvent, markerEvent } from "@/components/buttonFuction";
import { useState } from "react";
import { Hazard } from "./function";

const SectionTable = ({ parkingData, accidentData, kakaoMap, data }: any) => {
  const [isCheck, setIsCheck] = useState<boolean>(true);
  console.log(isCheck);

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
        markerEvent(accidentData, kakaoMap);
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
        console.log(data);
        console.log(kakaoMap);
        Hazard(data, kakaoMap);
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
        parkingEvent(parkingData, kakaoMap);
      },
    },
  ];

  return (
    <>
      <SectionSet>
        <SerchBox kakaoMap={kakaoMap}></SerchBox>

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
  width: 400px;
  height: 100vh;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10px 0 10px;
`;

// const Button_RDiv = styled.div`
//   width: 230px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
// `;

const ButtonDiv = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px 0px 10px;
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
