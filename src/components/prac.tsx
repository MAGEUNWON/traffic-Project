export default function parkingEvent(data: any, map: any) {
  console.log("파킹");
  for (let i = 0; i < data.length; i++) {
    let position = new window.kakao.maps.LatLng(data[i].lat, data[i].lon);
    const imageSize = new window.kakao.maps.Size(16, 20);
    const imgSrc = "/asset/parkinglot.png";

    const parkingMarker = new window.kakao.maps.Marker({
      map: map,
      position: position, // 마커를 표시할 위치
      // image: new kakao.maps.MarkerImage(constructionSrc, imageSize),
      image: new window.kakao.maps.MarkerImage(imgSrc, imageSize),
    });

    const content = `
      <div class="content-box">
        <span>${data[i].name}</span>
      </div>
    `;

    // 주차장 오버레이 생성
    const overlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
    });

    // 돌발정보 마커에 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.
    window.kakao.maps.event.addListener(
      parkingMarker,
      "mouseover",
      function () {
        overlay.setMap(map);
      }
    );

    // 돌발정보 마커를 마우스오버 하면, 해당 돌발 상황 정보 오버레이가 사라진다.
    window.kakao.maps.event.addListener(parkingMarker, "mouseout", function () {
      overlay.setMap(null);
    });
  }
}
