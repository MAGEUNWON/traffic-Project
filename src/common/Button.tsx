import styled from "styled-components";
import { useState } from "react";
import CCTV from "@/components/CCTV";

const Button = ({ icon, name}: { icon: string; name: string;}) => {
  const [bringName,setBringName] = useState('');
  
  

  return (
    <>
      
      <ButtonWarp>  
        <div>        
          <img src={icon} alt="icon"></img>
          <p id="click">{name}</p>
        </div>      
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
