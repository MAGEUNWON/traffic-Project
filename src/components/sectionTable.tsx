import styled from "styled-components";
import Button from "@/common/Button";
import Search from "@/common/Search";
import Button_R from "@/common/Button_R";
import Main from "@/common/main";

const SectionTable = () => {



  return (
    <>
    
      <SectionSet>

        <Button_RDiv>
          <Button_R icon="/asset/icon_search.png" contents="검색"></Button_R>
          <Button_R icon="/asset/icon_roadCar.png" contents="길찾기"></Button_R>
        </Button_RDiv>

        <Search></Search> 

        <Main></Main>

        <ButtonDiv>
          <Button icon="asset/icon_cctv.png"></Button>
          <Button icon="asset/icon_conflagration.png"></Button>
          <Button icon="asset/icon_safe.png"></Button>
          <Button icon="asset/icon_forecast.png"></Button>
          <Button icon="asset/icon_traffic.png"></Button>
          <Button icon="asset/icon_parkinglot.png"></Button>
        </ButtonDiv>

      </SectionSet>
    
    </>
  );
};

const SectionSet = styled.section`
width: 20vw;
height: 99vh;
background-color: #E7E7E7;
display: flex;
flex-direction: column;
align-items:center;
justify-content: space-evenly;
`;

const Button_RDiv = styled.div`
width: 230px;
height: 40px;
display: flex;
align-items:center;
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
align-items:center;
justify-content: space-around;
`

// const MainSet = styled.main`
// width: 300px;
// height: 500px;
// background-color: #FFFFFF;
// `;

export default SectionTable;