import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//미들웨어
export const loginDB = (username, password) => {
  // console.log(username, password);
  return function (dispatch) {
    axios
      .post(
        `http://13.125.232.116:8080/member/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "true") {
          // console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          window.alert(response.data.message);
          window.location.replace("/");
        } else if (response.data.status === "false") {
          console.log(response.data.status);
          window.alert(response.data.message);
          // return
        }
      })
      .catch((err) => {
        window.alert("에러가 발생했어요!");
        console.log(err);
      });
  };
};

//redux
export const userSlice = createSlice({
  name: "userinfo",
  initialState: { list: [{ is_login: false }] },
  reducers: {
    userLOGIN: (state, action) => {
      state.list = action.payload;
    },
  },
});

const actionCreators = { loginDB };
export { actionCreators };
export const { userLOGIN } = userSlice.actions;
export default userSlice.reducer;
