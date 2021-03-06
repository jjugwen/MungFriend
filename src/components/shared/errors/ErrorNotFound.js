//404 페이지

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../elements/Button";

function ErrorNotFound(props) {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Wrap2>
        <Body>
          <Img
            src={`${props.imgURL}/Errors/img-dog-error.png`}
            alt="dogError"
          />
          <ErrorTextArea>
            <h1>404</h1>
            <h2>페이지를 찾을 수 없습니다.</h2>
            <span>존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의</span>
            <span>주소가 변경/삭제되어 찾을 수 없습니다.</span>
            <Button
              orange_medium
              margin="40px 0 0 0"
              _onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              홈으로
            </Button>
          </ErrorTextArea>
        </Body>
      </Wrap2>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  top: -4.5em;
  background-color: white;
  width: 100%;
  z-index: 5;
  min-width: 1440px;
`;
const Wrap2 = styled.div`
  position: relative;
  bottom: -18em;
  background-color: white;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  gap: 3.75%;
  margin: 0% 10% auto;
`;

const Img = styled.img`
  margin-left: 17%;
  width: 27.5%;
`;

const ErrorTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  h1 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 100%;
    color: #e3e5e9;
    margin: 0.625% 0;
  }

  h2 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
    margin: 0 0 32px 0;
  }

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;
export default ErrorNotFound;
