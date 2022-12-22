export const parkingEvent = (data: any, map: any) => {
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
        window.kakao.maps.event.addListener(
            parkingMarker,
            "mouseout",
            function () {
                overlay.setMap(null);
            }
        );
    }
};

export const markerEvent = (data: any, map: any) => {
    console.log("마커이벤트");
    for (let i = 0; i < data.length; i++) {
        // console.log("마커");
        let position = new window.kakao.maps.LatLng(
            data[i].locationDataY,
            data[i].locationDataX
        );
        const imageSize = new window.kakao.maps.Size(25, 25);
        const constructionSize = new window.kakao.maps.Size(20, 20);
        const constructionSrc = "/asset/construction.png";
        const cautionSrc = "/asset/caution.png";
        const stopSrc = "/asset/stop.png";

        const accidentMarker = new window.kakao.maps.Marker({
            map: map,
            position: position, // 마커를 표시할 위치
            // image: new kakao.maps.MarkerImage(constructionSrc, imageSize),
            image: data[i].incidentTitle?.includes("[공사]")
                ? new window.kakao.maps.MarkerImage(
                      constructionSrc,
                      constructionSize
                  )
                : data[i].incidentTitle?.includes("[사고]")
                ? new window.kakao.maps.MarkerImage(cautionSrc, imageSize)
                : new window.kakao.maps.MarkerImage(stopSrc, imageSize),
        });

        const content = `
        <div class="content-box">
          <span>${data[i].addressJibun}</span>
          <span>${data[i].incidentTitle}</span>
        </div>
      `;
        // 돌발 상황 정보 오버레이 생성
        const overlay = new window.kakao.maps.CustomOverlay({
            position: position,
            content: content,
        });

        // 돌발정보 마커에 마우스오버하면, 해당 돌발 상황 정보 오버레이가 보인다.
        window.kakao.maps.event.addListener(
            accidentMarker,
            "mouseover",
            function () {
                overlay.setMap(map);
            }
        );

        // 돌발정보 마커를 마우스오버 하면, 해당 돌발 상황 정보 오버레이가 사라진다.
        window.kakao.maps.event.addListener(
            accidentMarker,
            "mouseout",
            function () {
                overlay.setMap(null);
            }
        );
    }
};

// -------------------------------------------------------

export const cctvFc = (datas: any, map: any) => {
    let ImageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_cctv.png",
        imageSize = new window.kakao.maps.Size(24, 27),
        imageOption = { offset: new window.kakao.maps.Point(24, 27) };

    // 다른 마커 클릭시 기존 인포윈도우 닫기 위한 빈배열 선언
    let info: any = [];

    // 반복문을 사용하여 마커 표시
    for (let i = 0; i < datas.length; i++) {
        // db에서 가져온 데이터에서 이름, x좌표,y좌표 추출
        let name = datas[i].NAME;
        let url = datas[i].URL;
        let xcode = datas[i].XCODE;
        let ycode = datas[i].YCODE;

        //마커 생성
        let marker = new window.kakao.maps.Marker({
            title: name,
            map: map,
            position: new window.kakao.maps.LatLng(ycode, xcode),
            image: new window.kakao.maps.MarkerImage(
                ImageSrc,
                imageSize,
                imageOption
            ),
        });

        let iwCotent = `<div style="padding:5px;">${name}</div><iframe width="330" height ="280" src = "${url}"></iframe><div style="font-size:5px;background-color:#333;color:#fff">경찰청(UTIC)(LIVE)제공</div>`,
            iwPosition = new window.kakao.maps.LatLng(ycode, xcode),
            iwRemoveable = true;

        let infowindow = new window.kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwCotent,
            removable: iwRemoveable,
        });
        info.push(infowindow);

        const close = () => {
            for (let i = 0; i < info.length; i++) {
                info[i].close();
            }
        };

        window.kakao.maps.event.addListener(marker, "click", () => {
            close();
            infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(map, "click", () => {
            close();
        });
    }
    //infowindow를 배열에 push
};
