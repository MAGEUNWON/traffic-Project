import Map from "./Map"
import CCTV from "./Cctv"
import React, { useState } from "react"
import Button from "@/common/Button"

const Board = () => {
  const [asv, setAsv] = useState<any>(true);
  
  if(asv === true){
    return(<Map></Map>)
  } else {
    return(<CCTV></CCTV>)
  }
}

export default Board