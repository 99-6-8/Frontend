import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RootComment from "./RootComment";

import styled from "styled-components";
import commentApis from "../../apis/commentApis";
import GlobalButton from "../UI/GlobalButton";

import { IoAlertCircle } from "react-icons/io5";
import GlobalModal from "../../components/UI/GlobalModal";

import { getCookie } from "../../shared/cookies";

const Comments = ({ cardId }) => {
  const token = getCookie("token");
  const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const [content, setContent] = useState("");
  const isTextareaDisabled = content.length === 0;
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    commentApis
      .getComments(cardId)
      .then((data) => {
        setAllComments(data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cardId]);

  const sendCommentdataHandler = (data) => {
    setAllComments(data);
  };

  const onSubmitHandler = async () => {
    if (!token) {
      alert("로그인이 필요한 기능입니다. ");
      return;
    }
    if (isTextareaDisabled) {
      alert("내용을 작성해주세요.");
      return;
    }

    const data = { contents: content, rootId: cardId, rootName: "interview" };
    try {
      const response = await commentApis.addComment(data);
      console.log(response);
      setContent("");
      setAllComments(response.comments);
    } catch (err) {
      console.log("댓글 작성 오류", err);
    }
  };

  const linkToSignInHandler = () => {
    navigate("/signin");
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };
  return (
    <CommentsContainer>
      <GlobalModal
        title="알림"
        confirmText="로그인하러 가기"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => linkToSignInHandler()}
        isConfirm
        isIcon
        icon={<AlertIcon />}
      >
        로그인이 필요한 기능입니다.
      </GlobalModal>
      <Form>
        <div className="comment_count">피드백 {0}개</div>

        <div className="textarea_box">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요"
            maxLength={500}
            rows={5}
            value={content}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmitHandler();
              }
            }}
          ></textarea>
        </div>

        <div className="button_box">
          {isTextareaDisabled ? (
            <GlobalButton
              _width="70px"
              _height="15px"
              text="작성"
              onClick={token ? onSubmitHandler : openModalHandler}
            />
          ) : (
            <GlobalButton
              _width="70px"
              _height="15px"
              hover
              text="작성"
              onClick={token ? onSubmitHandler : openModalHandler}
            />
          )}
        </div>
      </Form>
      <div className="comments-container">
        {allComments?.map((rootComment) => {
          return (
            <RootComment
              key={rootComment.id}
              rootComment={rootComment}
              cardId={cardId}
              setAllComments={sendCommentdataHandler}
            />
          );
        })}
      </div>
    </CommentsContainer>
  );
};

const AlertIcon = styled(IoAlertCircle)`
  font-size: 24px;
  color: #ec5959;
`;

const CommentsContainer = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  & .title {
    font-size: 16px;
  }

  & .comments-container {
  }
`;

const Form = styled.div`
  padding: 30px 0;

  & .comment_count {
    font-size: ${({ theme }) => theme.calRem(16)};
    margin-bottom: 10px;
  }
  & textarea {
    margin-top: 8px;
    padding: 11px 16px;
    border: 1px solid rgba(130, 130, 130, 0.2);
    border-radius: 4px;
    width: 100%;
  }
  & .textarea_box {
    padding-bottom: 10px;
  }
  & .button_box {
    display: flex;
    justify-content: flex-end;
    button {
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }
`;
export default Comments;