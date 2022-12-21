import React,{ReactEventHandler, useEffect,useState} from "react";
import axios from "axios"
//카카오 버전
declare global {
  interface Window {
    kakao: any;
  }
}
const CCTV = () =>{
  const [cctv,setCctv]=useState<any>(true)
  const cctvclick=(e:React.MouseEvent<HTMLButtonElement>)=>{
    setCctv(e.currentTarget.value)
    console.log(cctv)
  }


  //useState를 활용하여 db에서 불러온 값 저장
  const [datas,setDatas] = useState<any>(''); 
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fetchData = async ()=>{      
      try{
        const res = await axios.get(`http://127.0.0.1:5000/cctv`);         
        setDatas(res.data);        
    }catch(e:any){
      console.log(e)
    }    
  }
  fetchData()  
},[]);
// 처음 지도에 보일 화면 
useEffect(()=>{ 
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
    
    
      // 다른 마커 클릭시 기존 인포윈도우 닫기 위한 빈배열 선언
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
        let iwCotent = `<div style="padding:5px;">${name}</div><iframe width="330" height ="280" src = "${url}"></iframe><div style="font-size:5px;background-color:#333;color:#fff">경찰청(UTIC)(LIVE)제공</div>`,
        iwPosition = new window.kakao.maps.LatLng(ycode,xcode),
        iwRemoveable = true;
        
        let infowindow = new window.kakao.maps.InfoWindow({      
          position : iwPosition,
          content : iwCotent, 
          removable : iwRemoveable,      
        })
    
        //infowindow를 배열에 push
        info.push(infowindow)
        
        //반복문을 통하여 인포윈도우를 전부 닫기
        const close = ()=>{
          for(let i = 0; i<info.length;i++){
            info[i].close();
          }
        }
    
        //인포윈도우를 전부 닫은후 클릭한 마커 인포윈도우 오픈
        window.kakao.maps.event.addListener(marker,"click",()=>{
          close();
          infowindow.open(map,marker)
        })   
    
        //지도 아무곳이나 클릭시 열려있던 인포 윈도우 닫기
        window.kakao.maps.event.addListener(map,"click",()=>{
          close();      
        })       
      } 
    })
  return(
    <>
      <div id="map" style={{width : "100vw", height : "100vh", display:"none"}}>          
      </div>
    </>
  );

}

export default CCTV;