import react,{useState,useEffect} from "react"
import axios from "axios"

const Its =()=>{
  const [datas,setDatas] = useState<string>('');
  const [loading,setLoaing] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(()=>{0
    const fetchData = async ()=>{
      setLoaing(true)
      
      try{
        const res = await axios.get(`http://127.0.0.1:5000/daejeon`);         
        setDatas(res.data);
        
    }catch(e:any){
      console.log(e)
    }
    setLoaing(false);
  }
  fetchData()
  
},[]);
console.log(datas)
const itsdata = datas
console.log(itsdata)
  
  return(
    <>
    
    </>
  );
}

export default Its;