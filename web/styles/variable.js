export const flex = (direction, justify, align) => `
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export const shadow = {
  signatureBoxShadow: (thickness) => {
    let boxShadow = ``;
    for (let i = 1; i <= thickness; i++) {
      if (i === thickness) {
        boxShadow += `${i}px ${i}px 0 0 #273237;`;
      }
      boxShadow += `${i}px ${i}px 0 0 #273237,`;
    }
    return `box-shadow: ${boxShadow}`;
  },
  hslShadow: ({ type, thickness, hsl }) => {
    let shadow = ``;
    let { hue, saturation, lightness } = hsl;
    const lightnessDecrease = (lightness / thickness) * 0.8;

    for (let i = 1; i <= thickness; i++) {
      if (i === thickness) {
        shadow += `${i}px ${i}px ${thickness * 3}px ${
          type === 'box' ? 0 : ''
        } rgba(0, 0, 0, 0.7);`;
      }
      shadow += `${i}px ${i}px 0 ${
        type === 'box' ? 0 : ''
      } hsl(${hue}, ${saturation}%, ${lightness - lightnessDecrease * i}%),`;
    }
    if (type === 'box') {
      return `box-shadow: ${shadow}`;
    } else {
      return `text-shadow: ${shadow}`;
    }
  },
  linearHslShadow: ({ type, thickness, hsl }) => {
    let shadow = ``;
    let eachThickness = Math.ceil(thickness / 2);
    for (let i = 0; i <= hsl.length - 1; i++) {
      let { hue, saturation, lightness } = hsl[i];
      const lightnessDecrease = (lightness / thickness) * 0.8;
      for (
        let thickness = eachThickness * i + 1;
        thickness <= eachThickness * (i + 1);
        thickness++
      ) {
        if (i == hsl.length - 1 && thickness == eachThickness * (i + 1)) {
          shadow += `${thickness}px ${thickness}px ${thickness * 3}px ${
            type === 'box' ? 0 : ''
          } rgba(0, 0, 0, 0.7);`;
        }
        shadow += `${thickness}px ${thickness}px 0 ${
          type === 'box' ? 0 : ''
        } hsl(${hue}, ${saturation}%, ${lightness - lightnessDecrease * i}%),`;
      }
    }
    if (type === 'box') {
      return `box-shadow: ${shadow}`;
    } else {
      return `text-shadow: ${shadow}`;
    }
  },
  signatureTextShadow: (thickness) => {
    let textShadow = ``;
    let lightness = Math.ceil(20 / thickness);
    for (let i = 1; i <= thickness; i++) {
      if (i === thickness) {
        textShadow += `${i}px ${i}px hsl(0, 0%, 14%);`;
      }
      textShadow += `${i}px ${i}px hsl(0, 0%, ${20 - lightness * i}%),`;
    }
    return `text-shadow: ${textShadow}`;
  },
};

export const textColor = {
  linearGradient: (color) => `
    background: ${color};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,
};

export const miniPostContent = {
  titleEllipsis: () =>
    `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  `,
  contentEllipsis: (line = 5) =>
    `
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;
  `,
};

export const footer = {
  smallBox: () =>
    `
  width: 100%;
  font-size: 8px;
  font-family: 'GmarketSansMedium';
  `,
};
