import styled from "styled-components";
import { useState } from "react";



const Button = ({icon}:{icon:string}) =>{
  //cctv모양 만들기 
  const [content, setContent] = useState<any>(true);

  const handleClickButton = (e:any) => {
    const { name } = e.target;
    setContent(name);
  };
  
  console.log(content)
  
  return (
    <>
      <ButtonWarp>
          <div onClick={handleClickButton}></div>  
          <img src={icon} alt='icon'></img>        
      </ButtonWarp>
    </>
    
  );
}

const ButtonWarp = styled.button`
width: 55px;
height: 55px;
background-color: #FFFFFF;
border-radius: 0.5rem;
`;



export default Button;