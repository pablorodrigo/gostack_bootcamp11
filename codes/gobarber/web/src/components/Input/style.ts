import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;

  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;
  color: #666360;
  border: 2px solid #232129;
  & + div {
    margin-top: 8px;
  }


       // when error ocurr change border color
    ${(props) =>
      props.isErrored &&
      css`
        border: 2px solid #c53030;
      `}


  // when input focused change the color
  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border: 2px solid #ff9000;
    `}

   // when input is filled maintain icon color
    ${(props) =>
      props.isFilled &&
      css`
        color: #ff9000;
      `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
