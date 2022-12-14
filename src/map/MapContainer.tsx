import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById('map'), 
          options = { 
              center: new window.kakao.maps.LatLng(36.3493, 127.3776), 
              level: 3 
          };
    const map = new window.kakao.maps.Map(container, options); 
    const markerPosition = new window.kakao.maps.LatLng(36.3493, 127.3776); 
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    }); 
    marker.setMap(map);
    marker.setDraggable(true); 
  }, [])

  return (
    <>
      <h1>Map</h1>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
}

export default MapContainer; 