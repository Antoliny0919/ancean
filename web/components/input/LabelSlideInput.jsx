import styled from 'styled-components';

const StyledLabelSlideInput = styled.div`
  font-family: inherit;
  label {
    position: absolute;
    left: 0;
    font-size: 0.8em;
    color: ${({ theme }) => theme.colors.mainColor[7]};
    transition: 0.5s;
    transform: translateY(30%);
    opacity: 0.5;
  }
  input {
    border: none;
    outline: none;
    font-size: inherit;
    width: 20em;
    padding: 0.5em;
    border-bottom: solid ${({ theme }) => theme.colors.mainColor[4]} 0.15em;
    opacity: 0.8;
    &:focus + label,
    &:valid + label {
      transform: translate(-5em, 30%);
      color: ${({ theme }) => theme.colors.mainColor[0]};
      opacity: 1;
    }
    &:focus,
    &:valid {
      opacity: 1;
    }
  }
  & + & {
    margin-top: 1.5em;
  }
`;

export default function LabelSlideInput({ labelProps = {}, inputProps = {} }) {
  return (
    <StyledLabelSlideInput>
      <input {...inputProps}></input>
      <label {...labelProps}></label>
    </StyledLabelSlideInput>
  );
}
