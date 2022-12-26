import styled from "styled-components";

const Button_R = ({
  icon,
  contents,
  onClick,
}: {
  icon: string;
  contents: string;
  onClick: () => void;
}) => {
  //여기다가 검색 디자인 만들기(검색 모양만 만들면 됨)

  return (
    <Button_RWrap onClick={onClick}>
      <img src={icon} alt="icon"></img>
      <p>{contents}</p>
    </Button_RWrap>
  );
};

const Button_RWrap = styled.div`
<<<<<<< HEAD
  width: 100px;
  height: 30px;
  padding: 8px;
  background-color: #f8f8f8;
  color: #1f68f6;
  border: 1px solid #f8f8f8;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 0 6px #1f68f625;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 6px #1f68f650;
  }
=======
width: 100px;
height: 30px;
background-color: #F8F8F8;
color: #1F68F6;
border: 1px solid #F8F8F8;
border-radius: 1rem;
display: flex;
align-items:center;
justify-content: space-evenly;
font-weight: bold;
>>>>>>> 048f0b5241683e1ad712fc421008c74cbf827989
`;

export default Button_R;
