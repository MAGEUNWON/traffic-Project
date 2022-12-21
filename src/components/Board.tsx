import Map from "./Map"
import CCTV from "./CCTV"
import React, { useState } from "react"
import Button from "@/common/Button"

const Board = () => {
  const [content, setContent] = useState<any>(true);

  const handleClickButton = (e:any) => {
    const { name } = e.target;
    setContent(name);
  };

  const selectComponent = {
    first: <Map />,
    second: <CCTV />,
  };

  console.log(content)
  
  // if(asv === true){
  //   return(<Map></Map>)
  // } else {
  //   return(<CCTV></CCTV>)
  // }
}

export default Board