import styled from 'styled-components'

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  
  background: #f2f2f2;
  color: #2a2a2a;

  font-family: -apple-system, Helvetica, Arial, sans-serif;
  padding: 1rem;

  .title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #444;
    display: block;
  }

  .subtitle {
    color: #444;
    font-weight: 400;
  }

  .Wrapper {
    display: flex;
    flex-direction: row;
  }

  .row {
    width: 50%;
  }

  input {
    color: #2a2a2a;
    width: 100%;
    border: none;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  button,
  input {
    padding: 0.625rem 1.5rem;
  }
  
  label {
    color #444;
    font-weight: 600;
  }

  button {
    display: inline-block;
    margin-top: 8px;
    
    border: none;
    background-image: none;
    background-color: #3b5998;
    color: white;

    letter-spacing: 1px;
    transition: all 0.1s linear;
    
    &:hover {
      cursor: pointer;
      background: darken(#3b5998, 15%);
    }    
  }
`