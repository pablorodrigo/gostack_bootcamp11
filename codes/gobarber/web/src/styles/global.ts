import * as styled from 'styled-components';

export default styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased; /*it let the letter mode detailed*/
  }

  body,
  input,
  button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 500;
  }

  /*#root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }*/

  button {
    cursor: pointer;
  }
`;
