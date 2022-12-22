import styled from "styled-components";

const Button = ({
  icon,
  name,
  onClick,
}: {
  icon: string;
  name: string;
  onClick: () => void;
}) => {
  return (
    <>
      <ButtonWarp onClick={onClick}>
        <img src={icon} alt="icon"></img>
        <p>{name}</p>
      </ButtonWarp>
    </>
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
