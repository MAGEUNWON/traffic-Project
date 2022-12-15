import react,{useState,useEffect} from "react"
import axios from "axios"


interface ItsData {
  congestion: string
  endNodeID:string
  endNodeName:string
  linkCount:string
  linkID:string
  linkLength:string
  linkSqc:string
  roadName:string
  speed:string
  startNodeId:string
  startNodeName:string
  travelT:string
  udType:string
}


const Its =()=>{
  const [datas,setDatas] = useState<string>('');
  const [loading,setLoaing] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(()=>{0
    const fetchData = async ()=>{
      setLoaing(true)
      
      try{
        const res = await axios.get('http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?serviceKey=3mzcord3q5w6kIIDIkzfjbApi4SmCWPYnUpazaf4qx4Ro1qn44qKhG69pl3aydYWaJHhEDp0LxHvx1kEyF8o%2FA%3D%3D&pageNo=1&numOfRows=50')         
        setDatas(datas);
        
    }catch(e:any){
      console.log(e)
    }
    setLoaing(false);
  }
  fetchData()
  
},[]);
console.log(datas)

// const itsdata = datas  
//   return(
//     <>
    
//     </>
//   );
}

export default Its;