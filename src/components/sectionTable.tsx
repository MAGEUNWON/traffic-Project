import { useState } from "react";
import styled from "styled-components";
import Search from "@/common/Search";
import Button_R from "@/common/Button_R";
import Main from "@/common/main";


const SectionTable = () => {
  const [isCheck, setIsCheck] = useState<boolean>(true);

  return (
    <>
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
    </>
  );
};

const Button_RDiv = styled.div`
  width: 230px;
  height: 40px;
  display: flex;
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