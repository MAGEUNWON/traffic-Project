import React,{ useEffect } from "react"

const NaverMap = () =>{
  useEffect(()=>{
    let map = null
    let marker = null
    const initMap = () => {
      map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.4965454, 127.0269749),
        zoom: 18
      })

      // marker = new naver.maps.Marker({
      //   position: new NaverMap.maps.LatLng(37.4965454, 127.0269749)
      // })
    }
  })

  const mapStyle = {
    width: '45vw',
    heigth: '22vw'
  }

  return(
    <NaverMap>
      <div id = "map" style={mapStyle} />
    </NaverMap>
  )
}

export default NaverMap
// var mapOptions = new naver.maps.Map('map', {
//   center: new naver.maps.LatLng(37.4965454, 127.0269749),
//   zoom: 18
// });

// var map = new naver.maps.Map({
// position: new naver.maps.LatLng(37.4965454, 127.0269749),
// map: mapOptions
// });