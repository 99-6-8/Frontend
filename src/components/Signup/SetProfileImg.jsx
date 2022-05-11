import React, { useRef } from "react";

import defaultUserImage from "../../assets/defaultUserImage.jpg";
import styled, { css } from "styled-components";
import GlobalButton from "../UI/GlobalButton";

const SetProfileImg = (props) => {
  const { getImage, image } = props;
  const inputFileRef = useRef(null);

  const handleImageUrl = (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filetype = ["png", "PNG", "jpg", "JPG", "jpeg", "gif"];
    if (!filetype.includes(fileExt)) {
      alert("jpg, png, gif 파일만 Upload 가능합니다.");
      return;
    }
    setFileReader(file);
  };

  const setFileReader = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(file);
      getImage({ image: reader.result, file });
    };
  };

  const handleChangeImageBtn = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const DeleteImgHandler = (e) => {
    e.preventDefault();
    getImage(null);
  };

  return (
    <Div>
      <Img
        alt="not fount"
        width={"250px"}
        src={image ? image : defaultUserImage}
      />
      <Input
        type="file"
        name="myImage"
        ref={inputFileRef}
        onChange={handleImageUrl}
      />
      <div className="flex_colum">
        <GlobalButton
          onClick={handleChangeImageBtn}
          margin="0 0 6px 0"
          _height="30px"
          hover
        >
          {getImage ? "다른 사진 등록" : "사진 등록"}
        </GlobalButton>
        <GlobalButton
          onClick={DeleteImgHandler}
          margin="0 0 6px 0"
          _height="30px"
          hover
        >
          사진 삭제
        </GlobalButton>
      </div>
    </Div>
  );
};

SetProfileImg.defaultProps = {
  img_src: defaultUserImage,
};

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  & .flex_colum {
    display: flex;
    flex-direction: column;
  }
`;

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      border-radius: 4px;
      background: ${colors.darkGrey};
      color: ${colors.white};
      width: 96px;
      height: 60px;
      font-size: ${calRem(16)};
      margin: 0 0 6px 0;

      ${device.mobile} {
        width: 80px;
        height: 30px;
        font-size: ${calRem(12)};
      }
      &:hover {
        background: ${colors.mediumGrey};
      }
    `;
  }}
`;

const Img = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
`;

const Input = styled.input`
  display: none;
`;

export default SetProfileImg;
