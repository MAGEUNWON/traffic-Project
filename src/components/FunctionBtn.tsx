import { useState } from "react";
import styled from "styled-components";
import Button from "@/common/Button";

const button_item = [
    {
        src: "asset/icon_cctv.png",
        name: "CCTV",
        url: "cctv",
    },
    {
        src: "asset/icon_conflagration.png",
        name: "돌발정보",
        url: "accident",
    },
    {
        src: "asset/icon_safe.png",
        name: "보호구역",
        url: "safezone",
    },
    {
        src: "asset/icon_forecast.png",
        name: "위험구역",
        url: "hazard",
    },
    {
        src: "asset/icon_traffic.png",
        name: "교통상황",
        url: "traffic",
    },
    {
        src: "asset/icon_parkinglot.png",
        name: "주차장",
        url: "parkinglot",
    },
];

const FunctionBtn = ({ handlebuttonClick }: any) => {
    const [activeId, setActiveId] = useState<number>();

    const handleClick = (value: string) => {
        handlebuttonClick(value);
    };

    return (
        <ButtonDiv>
            {button_item.map((value, index) => {
                return (
                    <Button
                        key={index}
                        icon={value.src}
                        name={value.name}
                        active={activeId === index}
                        onClick={() => {
                            setActiveId(index);
                            handleClick(value.url);
                        }}
                    ></Button>
                );
            })}
        </ButtonDiv>
    );
};

const ButtonDiv = styled.div`
    width: 218px;
    height: 190px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`;

export default FunctionBtn;
