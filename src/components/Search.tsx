import React,{useState} from "react";
import CCTV from "./MapContainer";
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
      {/* <MapContainer searchPlace={Place}/> */}
    </>
  )
}

export default Search