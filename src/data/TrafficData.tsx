import axios from 'axios';
import useAsync from './useAsync';

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만듬
async function getTrafficData() {
  const response = await axios.get(
    `https://openapi.its.go.kr:9443/vdsInfo?apiKey=75838fa1ad8b44f48ddd2da9fc72ee94&getType=json`
    // `http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?ServiceKey=I85A3/sSJo0nHw8WV8QCKVFuvEvHx0rV7pUSOUGF3pz8aVlEud1y9T9X+laxUxQbdobVT1ef+5+2SBTUQus86Q==&numOfRows=20&pageNo=1`
    );

  return response.data;
}

function TrafficData() {
  const [state, refetch] = useAsync(getTrafficData, []);

  const { loading, data: datas, error } = state; // state.data 를 datas 키워드로 조회

  if (loading) return <div>로딩중입니다...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!datas) return null;

  const data = datas.body.items;
  // const data = datas;
  // console.log(data);

  return (
    <>
      <button onClick={refetch}>UPDATE</button>
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