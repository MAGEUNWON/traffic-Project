import styled from "styled-components";



const Button = ({icon}:{icon:string}) =>{
  //cctv모양 만들기 
  
  
  
  return (
    <>
      <ButtonWarp>        
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