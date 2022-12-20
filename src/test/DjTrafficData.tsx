import axios from 'axios';
import useAsync from '../components/useAsync';

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만듬
async function getDjTrafficData() {
  const response = await axios.get(
    `http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?ServiceKey=I85A3%2FsSJo0nHw8WV8QCKVFuvEvHx0rV7pUSOUGF3pz8aVlEud1y9T9X%2BlaxUxQbdobVT1ef%2B5%2B2SBTUQus86Q%3D%3D&numOfRows=20&pageNo=1`
    );

  return response.data;
}

function DjTrafficData() {
  const [state, refetch] = useAsync(getDjTrafficData, []);

  const { loading, data: datas, error } = state; // state.data 를 datas 키워드로 조회

  if (loading) return <div>로딩중입니다...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!datas) return null;

  const data = datas;
  console.log(data);

  return (
    <>
      <button onClick={refetch}>UPDATE</button>
      {/* {data.map(item => (

      ))} */}
    </>
  );
}

export default DjTrafficData;