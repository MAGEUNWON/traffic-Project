import react,{useState,useEffect} from "react"
import axios from "axios"


interface ItsData {
  linkID : string;
  roadName : string;
  startNodeId : string;
  startNodeName : string;
  endNodeID : string;
  endNodeName : string;
}


const Its =()=>{
  const [datas,setDatas] = useState<string>('');
  const [loading,setLoaing] = useState(false);
  useEffect(()=>{0
    const fetchData = async ()=>{
      setLoaing(true)
      try{
        const res = await axios.get(
        'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?serviceKey=3mzcord3q5w6kIIDIkzfjbApi4SmCWPYnUpazaf4qx4Ro1qn44qKhG69pl3aydYWaJHhEDp0LxHvx1kEyF8o%2FA%3D%3D&pageNo=1&numOfRows=20'
        );
        setDatas(res.data);
        
    }catch(e:any){
      console.log(e)
    }
    setLoaing(false);
  }
  fetchData()
},[]);
console.log(datas)
// const itsdata = datas.body.items
  
//   return(
//     <>
//     {itsdata.map(item=> (
//       <ul key={item.linkID}>
//         <li>linkID : {item.linkID}</li>
//       </ul>
//     ))}
//     </>
//   );
}

export default Its;