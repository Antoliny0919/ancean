import styled from 'styled-components';

export const StyledSignatureText = styled.h1`
  font-size: 6em;
  letter-spacing: 0.15em;
  margin: 0;
  font-family: inherit;
  text-transform: uppercase;
  color: ${(props) => props.$fontColor};
  text-shadow: ${(props) => props.$textShadow};
`;

export default function SignatureText({
  children,
  props = {},
  style = {},
  colorHSL = {},
}) {
  // SignatureText measure the through the value to used props(fontSize)

  const { hue, saturation, lightness } = colorHSL;

  const lightnessDecrease = lightness * 0.08;

  const fontColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  let textShadow = ``;
  for (let step = 1; step <= 10; step++) {
    let size = 0.01 * step;
    if (step === 10) {
      textShadow += `${size}em ${size}em ${size * 3}em rgba(0,0,0,.5);`;
    }
    textShadow += `${size}em ${size}em hsl(${hue}, ${saturation}%, ${
      lightness - lightnessDecrease * step
    }%),`;
  }

  return (
    <StyledSignatureText
      $colorHSL={colorHSL}
      $fontColor={fontColor}
      $textShadow={textShadow}
      {...props}
      style={style}
    >
      {children}
    </StyledSignatureText>
  );
}
