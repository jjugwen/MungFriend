import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMungAX } from "../redux/modules/mungSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function DogPlusModal(props) {
  //이미지를 한번 추가해볼게요
  const navigate = useNavigate();
  const [mungImage, setMungImage] = useState({
    image: "",
    previewUrl: "",
  });

  const addImage = (event) => {
    //어떤 이벤트를 명시적으로 처리하지 않은경우,
    //해당 이벤트에 대한 기본동작을 실행하지 않음
    event.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (e) => {
      setMungImage({
        image: event.target.files[0],
        previewUrl: e.target.result,
      });
      // console.log(event.target.files[0]);
    };
  };
  const dispatch = useDispatch();
  //강아지 정보
  //age는 숫자로 받아와야 함
  const [puppy, setpuppy] = useState({ isRepresentative: false });
  // 강아지 정보 input 입력값 넣어두기
  //나이는 숫자데이터 . if문 사용해서 숫자로 감싸주기
  const handleChange = (prop) => (e) => {
    
    if (prop === "age") {
      setDogAge(true);
      setpuppy({ ...puppy, [prop]: Number(e.target.value) });
    } else {
      if(prop ==="name"){
        setDogName(true);
      }if(prop ==="size"){
        setDogSize(true);
      }if(prop === "gender"){
        setDogGender(true);
      }if(prop ==="info"){
        setDogInfo(true);
      }
      setpuppy({ ...puppy, [prop]: e.target.value });
    }
    // console.log(puppy);
  };
  //밸리데이션 INPUT창 정보
  const[dogAge, setDogAge]=useState();
  const[dogGender, setDogGender]=useState();
  const[dogSize, setDogSize]=useState();
  const[dogName, setDogName]=useState();
  const[dogInfo, setDogInfo]=useState();
  const plusDog = () => {
    if(puppy.age===undefined){
      setDogAge(false);
      window.addEventListener((event) => { 
        event.preventDefault();
    })}else if(puppy.gender===undefined){
      setDogGender(false===undefined);
      window.addEventListener((event) => { 
        event.preventDefault();
    })
    }else if(puppy.size===undefined){
      setDogSize(false);
      window.addEventListener((event) => { 
        event.preventDefault();
    })
    }else if(puppy.name===undefined){
      setDogName(false);
      window.addEventListener((event) => { 
        event.preventDefault();
    })
    }else if(puppy.info===undefined){
      setDogInfo(false);
      window.addEventListener((event) => { 
        event.preventDefault();
    })
    }
    const formData = new FormData();
    formData.append("image", mungImage.image);
    const json = JSON.stringify(puppy);
    const blob = new Blob([json], { type: "application/json" });
    //infos 추가
    formData.append("infos", blob);
    // console.log(formData);

    dispatch(createMungAX(formData));

    // 에러 발생시 창이 닫기지 않아야 하므로 주석처리
    // props.setMungModal(!props.modal)
    // window.location.replace('/mypage')

  };

  //글자수 세기
  const [text, setText] = useState("");

  const onChangeText = (e) => {
    return setText(e.target.value);
  };

  //유효성 검사
  const ageCheck =  /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g || /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
  const nameCheck = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]*$/;
//  console.log(nameCheck.test(puppy.name))
  return (
    <Container>
      <p className="font-24">
        <b>멍프로필 등록</b>
      </p>
      <PreviewImg
        src={
          mungImage.previewUrl
            ? mungImage.previewUrl
            : `${process.env.REACT_APP_IMAGE_URL}/Yebin/addProfile.png`
        }
        alt=""
      />
      <PreviewBtn>
        <label className="input-button" htmlFor="input-file">
          <img src={`${process.env.REACT_APP_IMAGE_URL}/Yebin/previewBtn.png`} alt="" />
        </label>
        <input
          type="file"
          accept="images/*"
          onChange={addImage}
          id="input-file"
          className="filebtn"
        />{" "}
        {/*스타일 diaplay none으로, 커스텀할려면 라벨링*/}
      </PreviewBtn>
      <div className="wrap">
        <div className="row-box">
          <div className="column-box">
            <div className="row-box">
              <b>이름</b>
              {nameCheck.test(puppy.name) ? "":<ValidationText>이름은 한글과 영어만 가능해요!</ValidationText>}
              {dogName=== false? <ValidationText>이름을 입력해 주세요</ValidationText>:""}
            </div>
            
            <input
              className="box-size"
              onChange={handleChange("name")}
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="column-box">
            <div className="row-box">
            <b>성별</b>
            {dogGender=== false? <ValidationText>성별을 선택해 주세요</ValidationText>:""}
            </div>
            <select className="box-size" onChange={handleChange("gender")}>
              <option value="no">성별을 선택해 주세요</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>
        </div>
        <div className="row-box">
          <div className="column-box ">
            <div className="row-box">
            <b>나이</b>
            {ageCheck.test(puppy.age) && puppy.age !== undefined? <ValidationText>숫자만 입력 가능해요</ValidationText>:""}
            {dogAge=== false? <ValidationText>나이를 입력해 주세요</ValidationText>:""}
            {puppy.age > 30 ? <ValidationText >나이는 최대 30살 이에요!</ValidationText>:""}
            </div>
            <input
              className="box-size"
              type="text"
              onChange={handleChange("age")}
              placeholder="나이를 입력해주세요."
              maxLength={2}
            />
          </div>
          <div className="column-box">
            <div className="row-box">
            <b>사이즈</b>
            {dogSize=== false? <ValidationText>사이즈를 선택해 주세요</ValidationText>:""}
            </div>
            <select className="box-size" onChange={handleChange("size")}>
              <option value="no">크기를 선택해 주세요</option>
              <option value="소형">소형</option>
              <option value="중형">중형</option>
              <option value="대형">대형</option>
            </select>
          </div>
        </div>
        
          <b>몸무게별 사이즈 안내</b>
        
        <div className="info-box">
          ~10키로 : 소형견
          <br />
          10~20키로 : 중형견
          <br />
          20키로 이상 : 대형견
          <br />
        </div>
        <div className="row-box">
        
          <b>견종이나 유의사항 등 추가할 정보</b>
        {dogInfo===false? <ValidationText>강아지 정보를 입력해주세요!</ValidationText>:""}
        {puppy?.info?.length===255?<ValidationText> 최대 글자 수는 255자에요!</ValidationText>:""}
        </div>
        <textarea
          onChange={
            handleChange("info")
          }
          placeholder="멍멍이의 유의사항을 알려주세요!&#13;&#10;(Ex. '입질 때문에 다른 강아지 근처에 가지 못하게 주의해주세요', '예방 접종을 마쳤습니다.')"
          maxLength="255"
        />
      </div>
      <div className="btn-box">
        <button
          onClick={() => {
            props.setMungModal(!props.modal);
          }}
        >
          취소
        </button>
        <button className="okbutton" type="button" onClick={plusDog}>
          확인
        </button>
      </div>
    </Container>
  );
}
const Container = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 520px;

  ::-webkit-scrollbar-button:start{
    display:block;
  height:20px;  
  background-color: transparent;
  } 
  ::-webkit-scrollbar-button:end {
  display:block;
  height:20px;  
  background-color: transparent;
} 

  ::-webkit-scrollbar {
    width: 6px;
  
  }
  ::-webkit-scrollbar-thumb {
    background-color: #FA5A30;
    border-radius: 15px;
   
  }
  max-height: calc(100vh - 50px);
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 3;
  border-radius: 24px;
  align-items: center;
  text-align: center;
  /* position: absolute;
left: 460px;
top: 73px; */
  .wrap {
    width: 450px;
    margin: auto;
    text-align: left;
 
    textarea {
      box-sizing: border-box;
      width: 445px;
      height: 180px;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      font-family: "Pretendard";
      font-size: 16px;
      padding: 10px;
      resize: none;
      line-height: 25px;
      margin: 15px 0px;
      :focus {
        outline: none;
      }
    }
    .info-box {
      box-sizing: border-box;
      padding: 15px;
      height: 92px;
      background: #efefef;
      border-radius: 4px;
      margin: 15px 0px;
    }
    input{
      margin-bottom: 15px;
    }
    select{
      margin-bottom: 15px;
    }
    .column-box {
      text-align: left;
      margin: auto;
    }
  }
  .box-size {
    width: 214px;
    height: 48px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }
  .btn-box {
    margin-top: 20px;
    button {
      margin: 10px;
      width: 45%;
      height: 48px;
      border: none;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      font-weight: 500;
      font-size: 16px;
    }
    .okbutton {
      background-color: #fa5a30;
      color: #efefef;
    }
  }
`;

const PreviewImg = styled.img`
  width: 140px;
  height: 140px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-bottom: 20px;
  /* border: none; */
`;
const PreviewBtn = styled.div`
  position: absolute;
  left: 57%;
  top: 21%;

  img {
    width: 20px;
    height: 20px;
  }
  .input-button {
    width: 40px;
    line-height: 40px;
    padding: 13px 9px 4px 9px;
    background-color: #fa5a30;
    border-radius: 50%;

    /* cursor: pointer; */
  }
  .filebtn {
    display: none;
  }
`;
const ValidationText=styled.div`
color: red;
margin-left: 10px;
font-size: 15px;
`

const CountText = styled.span`
  position: absolute;
  right: 9%;
  bottom: 13.5%;
  font-weight: 400;
  font-size: 16px;
  color: #7a7a80;
`;

export default DogPlusModal;
