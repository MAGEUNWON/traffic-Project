import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import FunctionMap from './FunctionMap';



const FunctionData = () => {
  const [data, setData] = useState<any>([{}]);

  useEffect(() => {
    const getJsonData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/safe`);
        setData(response.data);
      } catch(err) {
        console.log(err);
      }
    };
    getJsonData();
  }, []);
  
  return (
    <>
      <FunctionMap data={data} />
    </>
  );
} ;

export default FunctionData;