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
  return (
    <>
      <Button_RWrap onClick={onClick}>
        <img src={icon} alt="icon"></img>
        <p>{contents}</p>
      </Button_RWrap>
    </>
  );
};

const Button_RWrap = styled.div`
width: 100px;
height: 30px;
background-color: #F8F8F8;
color: #1F68F6;
border 1px solid #F8F8F8;
border-radius: 1rem;
display: flex;
align-items:center;
justify-content: space-evenly;
font-weight: bold;
`;

export default Button_R;
