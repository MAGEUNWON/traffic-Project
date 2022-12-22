export const Hazard = (data: any, map: any) => {
  for (let i = 0; i < data.length; i++) {
    //api 데이터 빈 배열에 담아줌. 일단 필요 없어서 주석처리함.
    // console.log(Object.keys(data[i]).length);
    // let content = {
    //   ADDRESS: data[i].ADDRESS_NEW,
    //   LINK_ID: data[i].LINK_ID,s
    //   LOCATION_X: data[i].LOCATION_X,
    //   LOCATION_Y: data[i].LOCATION_Y,
    //   LOCATION_DATA: data[i].LOCATION_DATA,
    //   DATA_DESC: data[i].DATA_DESC,
    // };
    // position.push(content);
    // console.log(position);

    // 마커 이미지의 이미지 주소
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // 마커 이미지의 이미지 크기
    var imageSize = new window.kakao.maps.Size(35, 35);
    // 마커 이미지를 생성합니다
    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new window.kakao.maps.LatLng(
        data[i].LOCATION_Y,
        data[i].LOCATION_X
      ), // 마커를 표시할 위치
      title: data[i].DATA_DESC, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
      image: markerImage, // 마커 이미지
    });
  }
};
