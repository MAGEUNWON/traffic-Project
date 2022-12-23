import styled from "styled-components";
import Button from "@/common/Button";
import SerchBox from "./SerchBox";

const SectionTable = ({ kakaoMap }: any) => {
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
const ButtonDiv = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px 0px 10px;
`;

export default SectionTable;
