import React from "react";
import styled, { css } from "styled-components";

const GlobalButton = (props) => {
  const {
    text,
    onClick,
    children,
    color,
    margin,
    background,
    padding,
    _width,
    border,
    hover,
    type,
  } = props;

  const styles = {
    margin,
    color,
    background,
    padding,
    _width,
    border,
    hover,
  };

  return (
    <Button {...styles} onClick={onClick} type={type}>
      {text ? text : children}
    </Button>
  );
};

GlobalButton.defaultProps = {
  children: null,
  text: false,
  background: false,
  padding: false,
  _width: false,
  border: false,
  onClick: () => {},
  color: "white",
  marginBottom: "12px",
  hover: false,
  type: "text",
};

const Button = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem } = theme;
    return css`
      width: ${(props) => (props._width ? props._width : "max-content")};
      height: 50px;
      border-radius: 4px;
      border: ${(props) => (props.border ? props.border : "")};
      padding: ${(props) => (props.padding ? props.padding : "11px 18px")};
      margin: ${(props) => (props.margin ? props.margin : "")};
      font-size: ${calRem(16)};
      color: ${(props) => (props.color ? props.color : colors.white)};
      background: ${(props) =>
        props.background ? props.background : colors.darkGrey};
      ${device.mobile} {
        width: ${(props) => (props._width ? props._width : "max-content")};
        height: 30px;
        font-size: ${calRem(12)};
        padding: ${(props) => (props.padding ? props.padding : "0 16px")};
      }
      &:hover {
        background: ${(props) =>
          props.hover ? colors.mediumGrey : props.background};
      }
    `;
  }}//
`;
export default GlobalButton;
