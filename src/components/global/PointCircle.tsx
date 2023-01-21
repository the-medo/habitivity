import styled, { css } from 'styled-components';
import { generate } from '@ant-design/colors';
import { COLORS } from '../../styles/CustomStyles';

interface PointCircleProps {
  $visible?: boolean;
  $size?: 'small' | 'default' | 'large' | 'ultra';
  $color?: string;
  $mode?: 'dark' | 'light';
  $shape?: 'circle' | 'square';
}

export const PointCircle = styled.div<PointCircleProps>`
  align-items: center;
  justify-content: center;
  border-radius: ${p => (p.$shape === 'square' ? '.5rem' : '50%')};

  ${p => {
    let size = 2;
    let fontSize = 0.8;
    let fontWeight = 'normal';
    let colorBg = p.$color ? p.$color : COLORS.PRIMARY_DARK;
    let colorText = generate(colorBg)[0];

    if (p.$mode === 'light') {
      const temp = colorBg;
      colorBg = colorText;
      colorText = temp;
    } else {
      colorText = 'white';
    }

    if (p.$size === 'small') {
      size = 1.5;
      fontSize = 0.6;
    } else if (p.$size === 'large') {
      size = 2.5;
      fontSize = 1;
    } else if (p.$size === 'ultra') {
      size = 3.5;
      fontSize = 1.25;
      fontWeight = '500';
    }

    return css`
      display: ${p.$visible !== false ? 'flex' : 'none'};
      height: ${size}rem;
      width: ${size}rem;
      padding: ${size / 2}rem;
      background-color: ${colorBg};
      color: ${colorText};
      font-size: ${fontSize}rem;
      font-weight: ${fontWeight};
    `;
  }}
`;