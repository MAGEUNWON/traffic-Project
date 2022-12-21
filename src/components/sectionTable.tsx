import styled from "styled-components";
import Button from "@/common/Button";
import Search from "@/common/Search";
import Button_R from "@/common/Button_R";
import Main from "@/common/main";
import { useEffect, useState } from "react";
import axios from "axios";

const SectionTable = ({ markerEvent, prac }: any) => {
  const [check, setCheck] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/accident");
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const button_item = [
    {
      src: "asset/icon_cctv.png",
      name: "CCTV",
      onClick: () => markerEvent(data),
    },
    {
      src: "asset/icon_conflagration.png",
      name: "돌발정보",
      onClick: () => prac(),
    },
    {
      src: "asset/icon_safe.png",
      name: "보호구역",
      onClick: () => prac(),
    },
    {
      src: "asset/icon_forecast.png",
      name: "날씨상황",
      onClick: () => prac(),
    },
    {
      src: "asset/icon_traffic.png",
      name: "교통상황",
      onClick: () => prac(),
    },
    {
      src: "asset/icon_parkinglot.png",
      name: "주차장",
      onClick: () => prac(),
    },
  ];
  return (
    <>
      <SectionSet>
        <Button_RDiv>
          <Button_R
            icon="/asset/icon_search.png"
            contents="검색"
            onClick={() => {
              setCheck(true);
            }}
          ></Button_R>
          <Button_R
            icon="/asset/icon_roadCar.png"
            contents="길찾기"
            onClick={() => {
              setCheck(false);
            }}
          ></Button_R>
        </Button_RDiv>
        {check ? (
          <>
            <Search placeholder="어디로 갈까요?"></Search>
          </>
        ) : (
          <>
            <Search placeholder="출발지 검색"></Search>
            <Search placeholder="목적지 검색"></Search>
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
  width: 425px;
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
