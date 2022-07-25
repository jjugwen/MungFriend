// react
import React, { useRef } from "react";

// style
import styled from "styled-components";

// pages
import { Chatting } from "./Chatting";
import NoRoom from "./NoRoom";

// redux
import { useDispatch, useSelector } from "react-redux";

// router
import { useNavigate, useParams } from "react-router-dom";

// toolkit - Slice
import { loadChat } from "../../redux/modules/chat/chatSlice";
import { loadChannel } from "../../redux/modules/chat/channelSlice";

const Chat = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const chatroom = useRef("");
  // state에 axiso get한 데이터 불러오기
  const channel_data = useSelector((state) => state.channel.list);
  //매칭하기 눌렀을 때의 신청자 nickname

  // 첫 렌더링
  React.useEffect(() => {
    dispatch(loadChannel());
  }, [dispatch]);

  React.useEffect(() => {
    if (id) {
      // console.log("useEffect >> LoadChat넘기기전 id : " + id);
      dispatch(loadChat(id));
    }
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Container>
        <div
          style={{
            display: "flex",
            position: "relative",
            height: "133%",
            background: "white",
          }}
        >
          <LeftContainer>
            <ChannelList2>
              <h1>개설된 채팅방</h1>
              {channel_data &&
                channel_data.map((list, index) => {
                  return (
                    <>
                      {Number(id) === list.id ? (
                        <SelectedChannelListBox
                          // id={list.id}
                          key={index}
                          onClick={() => {
                            navigate(`/chat/${list.id}`);
                            // clearStorage('channelId');
                            // setStorage('channelId', `${list.id}`);
                          }}
                        >
                          <p ref={chatroom}>{list.channel}</p>
                        </SelectedChannelListBox>
                      ) : (
                        <ChannelListBox
                          // id={list.id}
                          key={index}
                          onClick={() => {
                            navigate(`/chat/${list.id}`);
                            // clearStorage('channelId');
                            // setStorage('channelId', `${list.id}`);
                          }}
                        >
                          <p ref={chatroom}>{list.channel}</p>
                        </ChannelListBox>
                      )}
                    </>
                  );
                })}
            </ChannelList2>
          </LeftContainer>

          {/* 우측 메인 화면 */}
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <ChatBox>
              <ChatList>
                {!id && <NoRoom />}
                {id && <Chatting id={id} />}
              </ChatList>
            </ChatBox>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  /* padding: 0 0 12.18em 0%; */
  position: relative;
  z-index: 2;
  /* background-color: #f2f3f6; */
  /* height: 100%; */
  height: 610px;
  width: 100%;
`;

const LeftContainer = styled.div`
  position: relative;
  /* z-index: 6; */
  background: #f2f3f6;
  min-width: 274px; //19.05%
  /* max-width: 15%; */
  overflow-y: scroll;

  /* 스크롤바 설정*/
  ::-webkit-scrollbar {
    /*  스크롤바 막대 너비 설정 */
    width: 8px;
  }

  /* 스크롤바 막대 설정*/
  ::-webkit-scrollbar-thumb {
    /* 스크롤바 막대 높이 설정    */
    height: 16%;
    background-color: #fa5a30;
    border-radius: 10px;
  }
  /* 스크롤바 뒷 배경 설정*/
  ::-webkit-scrollbar-track {
    background-color: #f2f3f6;
  }

  /* width: 100%; */
`;

const ChannelList2 = styled.div`
  & h1 {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    padding: 13.3% 0 5% 13.3%; //40px
    margin: 2% 0 10% 0;
  }
`;

const SelectedChannelListBox = styled.div`
  width: 100%;
  min-width: 205px;
  max-width: 15%;
  margin: 4% 8%;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 1% 5%;
  background-color: #fa5a30;
  & p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    color: white;
  }
  & div {
    cursor: pointer;
    top: 0;
    right: 0px;
  }
  & img {
    width: 25px;
    margin-top: 7px;
  }
`;
const ChannelListBox = styled.div`
  width: 100%;
  min-width: 205px;
  max-width: 15%;
  margin: 4% 8%;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 1% 5%;
  background-color: #fff;
  & p {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    color: black;
  }
  & div {
    cursor: pointer;
    top: 0;
    right: 0px;
  }
  & img {
    width: 25px;
    margin-top: 7px;
  }
`;

const ChatBox = styled.div`
  /* position: relative; */
  width: 100%;
  height: 600px;
  background-color: #ffffff;
  margin: 5px & p {
    color: black;
    padding: 15px;
  }
`;

const ChatList = styled.div`
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  min-width: 1166px;
  height: 600px;

  & p {
    color: black;
    padding: 15px;
  }
`;

export default Chat;
