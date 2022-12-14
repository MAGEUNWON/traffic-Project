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
        'https://openapi.its.go.kr:9443/trafficInfo?apiKey=test&type=all&minX=126.800000&maxX=127.890000&minY=34.900000&maxY=35.100000&getType=json'
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
// const itsdata = datas.body.items;
  
  return(
    <>
    {/* {itsdata.map(item=> (
      <ul key={item.linkID}>
        <li>linkID : {item.linkID}</li>
      </ul>
    ))} */}
    </>
  );
}

export default Its;