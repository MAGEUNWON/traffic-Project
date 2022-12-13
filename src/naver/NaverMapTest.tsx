import { useEffect, useState } from 'react';

const { naver } = window;

function MapTest() {
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  // get current position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  const otherLatLngs = [
    { lat: 37.6859, lng: 126.597865 },
    { lat: 37.68528, lng: 126.597227 },
    { lat: 37.685535, lng: 126.599528 },
    { lat: 37.684234, lng: 126.599292 },
  ];

  useEffect(() => {
    if (typeof myLocation !== "string") {
      const currentPosition = [myLocation.latitude, myLocation.longitude];

      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
      });

      // 내 위치 마커 표시
      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        map,
        icon: {
          url: './img/marker.png',
          size: new naver.maps.Size(25, 25),
          scaledSize: new naver.maps.Size(25, 25),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 34),
        },
      });

      // 주변 마커 나타내기
      const markers: naver.maps.Marker[] = [];
      const infowindows: naver.maps.InfoWindow[] = [];
      const contentTags =
        '<div class="naver-container"><p class="ptag">여깁니다</p><span class="spantag">맞아요</span></div>';

      // show other markers
      for (let i = 0; i < otherLatLngs.length; i += 1) {
        const otherMarkers = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            otherLatLngs[i].lat,
            otherLatLngs[i].lng
          ),
          map,
        });

        const infowindow = new naver.maps.InfoWindow({
          content: contentTags,
          borderWidth: 1,
          anchorSize: new naver.maps.Size(10, 10),
          pixelOffset: new naver.maps.Point(10, -10),
        });

        markers.push(otherMarkers);
        infowindows.push(infowindow);
      }

      naver.maps.Event.addListener(map, "idle", () => {
        updateMarkers(map, markers);
      });

      const updateMarkers = (
        isMap: naver.maps.Map,
        isMarkers: naver.maps.Marker[]
      ) => {
        const mapBounds: any = isMap.getBounds();
        let marker;
        let position;

        for (let i = 0; i < isMarkers.length; i += 1) {
          marker = isMarkers[i];
          position = marker.getPosition();

          if (mapBounds.hasLatLng(position)) {
            showMarker(isMap, marker);
          } else {
            hideMarker(marker);
          }
        }
      };

      const showMarker = (isMap: naver.maps.Map, marker: naver.maps.Marker) => {
        marker.setMap(isMap);
      };

      const hideMarker = (marker: naver.maps.Marker) => {
        marker.setMap(null);
      };

      const getClickHandler = (seq: number) => {
        return () => {
          const marker = markers[seq];
          const infoWindow = infowindows[seq];

          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        };
      };

      for (let i = 0; i < markers.length; i += 1) {
        naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
      }
    }
  }, [myLocation]);

  return <div id='map' style={{ width: "100%", height: "500px" }} />;
}

export default MapTest;