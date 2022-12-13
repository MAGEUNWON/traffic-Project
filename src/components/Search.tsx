import React,{useState} from "react";
import MapContainer from "./MapContainer";

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

  return(
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText}/>
        <button type ="submit">검색</button>
      </form>
      <MapContainer searchPlace={Place}/>
    </>
  )
}

export default Search