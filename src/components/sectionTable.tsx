import { useState } from "react";
import styled from "styled-components";
import { Search, SingleSearch } from "@/common/Search";
import Button_R from "@/common/Button_R";
import "./sectionTable.css";

const SectionTable = ({ setSearchPlace }: any) => {
    const [isCheck, setIsCheck] = useState<boolean>(true);
    const [inputText, setInputText] = useState("");

    const onChangeWhere = (e: any) => {
        setInputText(e.target.value);
    };

    // inputeText에 값을 searchPlace에 값 받음
    const submitWhere = (e: any) => {
        e.preventDefault();
        setSearchPlace(inputText);
        setInputText("");
    };

    return (
        <MainBox>
            <div>
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
            </div>
            <div>
                {isCheck ? (
                    <>
                        <SingleSearch
                            onSubmit={submitWhere}
                            placeholder="어디로 갈까요?"
                            onChange={onChangeWhere}
                            value={inputText}
                        />
                        <SearchResult>
                            <div id="menu_wrap" className="scroll-wrapper">
                                <ul id="placesList"></ul>
                            </div>
                            <div id="pagination"></div>
                        </SearchResult>
                    </>
                ) : (
                    <>
                        <Search placeholder="출발지 검색"></Search>
                        <Search placeholder="도착지 검색"></Search>
                        <form>
                            <PathButton>경로검색</PathButton>
                        </form>
                        <SearchResult />
                    </>
                )}
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
    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const SearchResult = styled.div`
    width: 350px;
    height: 450px;
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
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
`;

const PathButton = styled.button`
    width: 60px;
    height: 22px;
    padding: 3px;
    margin-bottom: 7px;
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

export default SectionTable;
