import styled from "styled-components";

const Button = ({ icon, name }: { icon: string; name: string }) => {
  //cctv모양 만들기

  return (
    <ButtonWarp>
      <img src={icon} alt="icon" />
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
