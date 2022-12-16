import React,{useState} from "react";
import MapContainer from "./MapContainer";
//검색 인풋
const Search = () =>{
  const [InputText, setInputText] = useState('')
  const [Place,setPlace] = useState('')

  const onChange = (e:any) =>{
    setInputText(e.target.value)
  }

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  // form과 input을 이용하여 검색창 구현 + 카카오 mapcontainer추가
  return(
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText}/>
        <button type ="submit">검색</button>        
      </form>
      
        <iframe src = "http://www.utic.go.kr/view/map/openDataCctvStream.jsp?key=GVjHkAH6NW3wdeJs3xypMhq52MGhEen3IP85ShkXpZ5dkKm81mXBfHzyduE0BFv&cctvid=E07002&cctvName=%25EA%25B0%2580%25EC%259E%25A5%25EA%25B5%2590%25EC%2598%25A4%25EA%25B1%25B0%25EB%25A6%25AC&kind=E&cctvip=118&cctvch=null&id=CCTV15&cctvpasswd=null&cctvport=null"/>
      
      
      <MapContainer searchPlace={Place}/>
    </>
  )
}

export default Search