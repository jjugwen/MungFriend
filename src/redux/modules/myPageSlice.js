import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

//axios
//나중에 멤버 아이디값 받아와서 넘겨주기
export const loadMyPageAX = (id) => {
  return async function (dispatch) {
    await instance
      // await axios.get(`http://localhost:5001/mypage`)
      // await instance
      .get(`/mypage/${id}`)
      .then((response) => dispatch(loadMyPage(response.data)));
  };
};

export const patchIntroduceAX = (introduce) => {
  return async function (dispatch) {
    axios
      .patch(`http://localhost:5001/mypage`, introduce)
      // await instance
      //   .patch(`/mypage/introduce`, introduce)
      .then(() => dispatch(patchIntroduce(introduce)));
  };
};

export const patchPhoneNumAX = (phoneNum) => {
  return function (dispatch) {
    axios
      .patch(`http://localhost:5001/mypage`, phoneNum)
      // instance
      //   .patch(`/mypage/phoneNum`, phoneNum)
      .then(() => dispatch(patchPhoneNum(phoneNum)));
  };
};

//툴킷
const myPageSlice = createSlice({
  name: "mypage",
  initialState: {},
  reducers: {
    loadMyPage(state, action) {
      state.mypage = action.payload;
    },
    patchIntroduce(state, action) {
      state.mypage.introduce = action.payload.introduce;
    },
    patchPhoneNum(state, action) {
      state.mypage.phoneNum = action.payload.phoneNum;
    },
    deleteMyMung(state, action) {
      console.log(action.payload);
      state.mypage.dogList = state.mypage.dogList.filter((element) => {
        if (element.id !== action.payload) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
});

export const { loadMyPage, patchIntroduce, patchPhoneNum, deleteMyMung } =
  myPageSlice.actions;
export default myPageSlice.reducer;
