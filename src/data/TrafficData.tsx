import { useState, useEffect } from 'react';
import axios from 'axios';

const TrafficData = () => {
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const url = 'https://openapi.its.go.kr:9443/vdsInfo?apiKey=75838fa1ad8b44f48ddd2da9fc72ee94&getType=json'
        const response = await axios.get(url);
        setDatas(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e: any) {
        setError(e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!datas) return null;

  // console.log(datas);
  // console.log(datas.body.items[0]);
  const data = datas.body.items;
  console.log(data);

  return (
    <>
      {data.map(item => (
        <ul key={item.vdsId}>
          <li>vdsId : {item.vdsId}</li>
          <li>linkIds : {item.linkIds}</li>
          <li>laneNo : {item.laneNo}</li>
          <li>colctedDate : {item.colctedDate}</li>
          <li>speed : {item.speed}</li>
          <li>volume : {item.volume}</li>
          <li>occupancy : {item.occupancy}</li>
        </ul>
      ))}
    </>
  );
}

export default TrafficData;