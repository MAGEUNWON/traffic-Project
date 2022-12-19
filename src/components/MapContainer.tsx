import React,{useEffect,useState} from "react";
import axios from "axios"
//카카오 버전
declare global {
  interface Window {
    kakao: any;
  }
}
const MapContainer = () =>{

  //useState를 활용하여 db에서 불러온 값 저장
  const [datas,setDatas] = useState<string>(''); 
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fetchData = async ()=>{      
      try{
        const res = await axios.get(`http://127.0.0.1:5000/daejeon`);         
        setDatas(res.data);        
    }catch(e:any){
      console.log(e)
    }    
  }
  fetchData()  
},[]);
useEffect(()=>{ 
  // 처음 지도에 보일 화면 
  let container = document.getElementById('map'),
  options = {
    center : new window.kakao.maps.LatLng(36.348991, 127.377069),
    level : 7
  };
  //지도를 생성!
  let map = new window.kakao.maps.Map(container, options);
  let ImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_cctv.png',
  imageSize = new window.kakao.maps.Size(24, 27),
  imageOption = {offset: new window.kakao.maps.Point(24, 27)};

  // const zoomIn=()=>{
  //   let level = map.getlevel();

  //   map.setLevel(level-1);

  //   displayLevel();

  // }

  // displayLevel();
  
  let info:any = []
  // 반복문을 사용하여 마커 표시
  for(let i = 0; i <datas.length;i++){

    // db에서 가져온 데이터에서 이름, x좌표,y좌표 추출
    let name= datas[i].NAME
    let url = datas[i].URL
    let xcode = datas[i].XCODE
    let ycode = datas[i].YCODE

    //마커 생성
    let marker = new window.kakao.maps.Marker({
      title : name,
      map:map,  
      position : new window.kakao.maps.LatLng(ycode,xcode),
      image : new window.kakao.maps.MarkerImage(ImageSrc,imageSize,imageOption)
    });
    
    
    
    //infowindow 설정
    let iwCotent = `<div style="padding:5px;">${name}</div><iframe width="330" height ="280" src = "${url}"/>`,
    iwPosition = new window.kakao.maps.LatLng(ycode,xcode),
    iwRemoveable = true;
    
    let infowindow = new window.kakao.maps.InfoWindow({      
      position : iwPosition,
      content : iwCotent, 
      removable : iwRemoveable,      
    })
    info.push(infowindow)
    console.log(info)

    const close = ()=>{
      for(let i = 0; i<info.length;i++){
        info[i].close();
      }
    }

  
    window.kakao.maps.event.addListener(marker,"click",()=>{
      close();
      infowindow.open(map,marker)
    })    
    // window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    
  }
  
  function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}



})



  // useEffect(()=>{

  //   const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

  //   //지도를 담을 DOM 영역
  //   //지도를 생성할 때 필요한 기본 옵션

    

    
  //   //키워드 검색이 완료됐을때 호출되는 콜백 함수
  //   const placesSearchCB = (data:any,status:any,pagination:any):any =>{
  //     if(status===window.kakao.maps.services.Status.OK){
        
  //       //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 
  //       // latLngBounds 객체에 좌표를 추가한다.
  //       let bounds = new window.kakao.maps.LatLngBounds();
  //       for (let i = 0 ; i < datas.length; i++){
  //         displayMaker(datas[i]);
  //         bounds.extend(new window.kakao.maps.LatLng(data[i].y,data[i].x));
  //       }
  //       //검색된 장소 위치를 기준으로 지도 위치를 재설정
  //       map.setBounds(bounds)
  //     }
  //   }
  //   //장소 검색 객체를 생성
  //   let ps = new window.kakao.maps.services.Places();
  //   // search.tsx에서 입력된 키워드를 검색
  //   ps.keywordSearch(searchPlace,placesSearchCB);
    

  //   // 마커 생성
  //   const displayMaker = (place:any):any =>{
  //     //마커를 생성하고 지도에 출력
      // for(let i = 0; i <datas.length;i++){
      //   let xcode = datas[i].XCODE
      //   let ycode = datas[i].yCODE

      //   let maker = new window.kakao.maps.Marker({
      //     map:map,  
      //     position : new window.kakao.maps.LatLng(ycode.y,xcode.x)
      //   });
  //       // 마커에 클릭 이벤트를 추가
  //       window.kakao.maps.event.addListener(maker,'click',()=>{
  //         // 마커를 클릭하면 장소명이 인포윈도우에 출력된다.
  //         infowindow.setContent('<iframe width="500" height ="300" src = "http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=GVjHkAH6NW3wdeJs3xypMhq52MGhEen3IP85ShkXpZ5dkKm81mXBfHzyduE0BFv&cctvid=E07002&cctvName=%25EA%25B0%2580%25EC%259E%25A5%25EA%25B5%2590%25EC%2598%25A4%25EA%25B1%25B0%25EB%25A6%25AC&kind=E&cctvip=118&cctvch=null&id=CCTV15&cctvpasswd=null&cctvport=null"/>');        
  //         infowindow.open(map,maker)
  //       })
  //     }
  //   }
  // },[searchPlace])
  return(
    <div id="map" style={{width : "100vw", height : "100vh"}}>
      
    </div>
  );

}

export default MapContainer;