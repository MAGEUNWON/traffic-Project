// cctv, 돌발정보, 보호구역, 주차장 버튼 디자인
import styled from "styled-components";

const Button = ({
  active,
  icon,
  name,
  onClick,
}: {
  active: boolean;
  icon: string;
  name: string;
  onClick: () => void;
}) => {
  const activeStyle = {
    backgroundColor: "#1f68f6",
    color: "#ffffff",
  };
  const style = {
    cursor: "pointer",
  };
  return (
    <ButtonWarp
      style={active ? { ...style, ...activeStyle } : style}
      onClick={onClick}
    >
      <img src={icon} alt="icon"></img>
      <p>{name}</p>
    </ButtonWarp>
  );
};

const ButtonWarp = styled.button`
  width: 65px;
  height: 65px;
  background-color: #ffffff;
  border: 1px solid white;
  color: #1f68f6;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export default Button;
