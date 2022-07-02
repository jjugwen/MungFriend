import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMungAX } from '../redux/modules/mungSlice';


function MungPlusModal (){
  //이미지를 한번 추가해볼게요
  const [mungImage, setMungImage] = useState({
    image:"",
    previewUrl:""
  });
  const [loaded, setLoaded] = useState(false);

  const addImage = (e) => {
    //어떤 이벤트를 명시적으로 처리하지 않은경우,
    //해당 이벤트에 대한 기본동작을 실행하지 않음
    e.preventDefault();
    const fileReader = new FileReader();

    if(e.target.files[0]){
      fileReader.readAsDataURL(e.target.files[0])
    }
    fileReader.onload =()=>{
      setMungImage({
          image_file: e.target.files[0],
          preview_URL: fileReader.result
      })
    }

  }
  const dispatch = useDispatch();
  //강아지 정보
  //age는 숫자로 받아와야 함
  const [puppy, setpuppy] =useState({});
  // 강아지 정보 input 입력값 넣어두기
  //나이는 숫자데이터 . if문 사용해서 숫자로 감싸주기 
  const handleChange = (prop) => (e) => {
    if(
      prop !== "age"
    ){setpuppy({ ...puppy, [prop]: e.target.value })}
    else{setpuppy({ ...puppy, [prop]: Number(e.target.value) })};
    console.log(puppy)
  };
  
  const signUp=()=>{
    const formData = new FormData();
    formData.append("image", mungImage.image )
    // const json =JSON.stringify(puppy);
    // const blob = new Blob([json],{type: "application/json"});
    //infos 추가ㅜ추가
    formData.append("name", puppy.name)
    formData.append("age", puppy.age)
    formData.append("info", puppy.info)
    formData.append("gender", puppy.gender)
    formData.append("size", puppy.size)
    formData.append("isRepresentative", puppy.isRepresentative)

    dispatch(createMungAX(formData))
    //이미지 서버에 다 보내고 나서 다시 초기값 만들기
    setMungImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });

  }
return(
  <>
  <div style={{fontFamily:"Pretendard"}}>멍친구 등록</div>
  <div>이미지 등록 부분
    <label onChange={addImage}>
    <input type="file" accept="images/*"/> {/*스타일 diaplay none으로, 커스텀할려면 라벨링*/}
    </label>
  </div>
  <div>이름</div>
  <input onChange={handleChange("name")}/>
  <div>성별</div>
  <select onChange={handleChange("gender")}>
    <option value='no'>성별을 선택해 주세요</option>
    <option value='남' >남</option>
    <option value='여' >여</option>
  </select>
  <div>나이</div>
  <input type='number' max='30' onChange={handleChange("age")}/>
  <div>사이즈</div>
  <select onChange={handleChange("size" )}>
    <option value='no'>크기를 선택해 주세요</option>
    <option value='소형'>소형</option>
    <option value='중형'>중형</option>
    <option value='대형'>대형</option>
  </select>
  <div>견종이나 유의사항 등 추가할 정보</div>
  <textarea onChange={handleChange("info")}/>
  <button type="submit" onClick={signUp}>
          등록하기
   </button>
  </>
)
}

export default MungPlusModal;