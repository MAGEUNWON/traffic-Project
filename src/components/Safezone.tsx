import axios from 'axios';
import { useEffect, useState } from 'react';
import Map from './Map';

const Safezone = () => {
  const [data, setData] = useState<any>([{}]);
  useEffect(() => {
    const getJsonData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/safe');
        setData(response.data);
      } catch(err) {
        console.log(err);
      }
    };
    getJsonData();
  }, []);
  
  return (
    <>
      {/* <button onClick={setData}>button</button> */}
      <Map data={data} />
    </>
  );
} ;

export default Safezone;