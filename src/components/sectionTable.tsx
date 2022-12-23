import React, { useState } from "react";
import styled from "styled-components";
import Button from "@/common/Button";
import SerchBox from "./SerchBox";
import Button_R from "@/common/Button_R";
import Main from "@/common/main";
import { parkingEvent, markerEvent, cctvFc } from "@/components/buttonFuction";

const SectionTable = ({ parkingData, accidentData, datas, map }: any) => {
    const [isCheck, setIsCheck] = useState<boolean>(true);

    const button_item = [
        {
            src: "asset/icon_cctv.png",
            name: "CCTV",
            onClick: () => {
                cctvFc(datas, map);
            },
        },
        {
            src: "asset/icon_conflagration.png",
            name: "돌발정보",
            onClick: () => {
                markerEvent(accidentData, map);
            },
        },
        {
            src: "asset/icon_safe.png",
            name: "보호구역",
            onClick: () => {
                console.log("보호구역");
            },
        },
        {
            src: "asset/icon_forecast.png",
            name: "날씨상황",
            onClick: () => {
                console.log("날씨상황");
            },
        },
        {
            src: "asset/icon_traffic.png",
            name: "교통상황",
            onClick: () => {
                console.log("교통상황");
            },
        },
        {
            src: "asset/icon_parkinglot.png",
            name: "주차장",
            onClick: () => {
                console.log("주차장");
                parkingEvent(parkingData, map);
            },
        },
    ];

    return (
        <>
            <SectionSet>
                <SerchBox kakaoMap={map}></SerchBox>

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

                {/* {isCheck ? (
                    <Search placeholder="어디로 갈까요?"></Search>
                ) : (
                    <form
                        onSubmit={(e: any) => {
                            e.preventDefault();
                            console.log(e.target[0].value);
                            console.log(e.target[1].value);
                            let ps = new window.kakao.maps.services.Places();

                            // 키워드로 장소를 검색합니다
                            ps.keywordSearch(e.target[0].value, placesSearchCB);

                            function placesSearchCB(
                                data: any,
                                status: any,
                                pagination: any
                            ) {
                                if (status === "OK") {
                                    console.log(data);
                                    data.map((el: any) => {
                                        console.log(el);
                                    });
                                }
                            }
                        }}
                    >
                        {["start", "end"].map((el, i) => {
                            return (
                                <div key={i}>
                                    <Search
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
                    </form>
                )} */}
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

export default SectionTable;
