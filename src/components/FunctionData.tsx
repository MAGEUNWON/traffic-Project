import axios from 'axios';
import { useEffect, useState } from 'react';
import FunctionMap from './FunctionMap';
import Map from './Map';

const FunctionData = ({name}: any) => {
  const [data, setData] = useState<any>([{}]);

  console.log(name);

  useEffect(() => {
    const getJsonData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${name}`);
        setData(response.data);
        console.log(`http://localhost:5000/${name}`);
      } catch(err) {
        console.log(err);
      }
    };
    getJsonData();
  }, []);
  
  return (
    <>
      {!{data} ? (
        console.log("yes")
        // <Map />
      ) : (
        console.log("no")
        // <FunctionMap data={data} />
      )}
    </>
  );
} ;

export default FunctionData;