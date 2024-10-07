import styled from 'styled-components';

const StyledRadioInput = styled.label`
  input[type='radio'] {
    appearance: none;
    width: 1.25em;
    height: 1.25em;
    border-radius: 50%;
    border: max(2px, 0.2em) solid grey;
    transition:
      border 0.5s ease-in-out,
      box-shadow 0.5s;
  }

  input[type='radio']:checked {
    border: 0.4em solid ${(props) => props.$checkedColor};
  }
  input[type='radio']:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) ${({ theme }) => theme.colors.lightGray};
    cursor: pointer;
  }

  input[type='radio']:hover + span {
    cursor: pointer;
  }
  input[type='radio']:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    box-shadow: none;
    opacity: 0.7;
  }
  input[type='radio']:disabled + span {
    cursor: default;
    opacity: 0.7;
  }
`;

export default function RadioInput({ children, checkedColor, props = {} }) {
  return (
    <StyledRadioInput htmlFor="radio-input" $checkedColor={checkedColor}>
      <input type="radio" id="radio-input" name="contact" {...props}></input>
      <p>{children}</p>
    </StyledRadioInput>
  );
}
