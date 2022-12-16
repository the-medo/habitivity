import React, { useMemo } from 'react';
import { LogoBig, LogoSmall } from '../../assets/svg';
import Svg, { StyledSvg } from '../../assets/svg/Svg';
import styled from 'styled-components';
import { COLORS, LEFT_MENU_WIDTH, SIDER_COLLAPSED_SIZE } from '../../styles/CustomStyles';

interface LogoWithTaskListProps {
  version: 'small' | 'big';
  title?: string;
}

const StyledHeader = styled.h2<{ $fontSize: string }>`
  ${({ $fontSize }) => `
    font-size: ${$fontSize};
  `}
`;

const StyledLogoWrapper = styled.div<{ $width: string; $height: string }>`
  ${({ $width, $height }) => `
    width: ${$width};
    height: ${$height};
  `}
  position: relative;

  ${StyledSvg} {
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover {
    ${StyledHeader} {
      color: ${COLORS.BLUE_GREY_DARK};
    }

    .svg-color-secondary {
      fill: ${COLORS.WHITE};
      stroke: ${COLORS.WHITE};
    }
  }

  ${StyledHeader} {
    ${({ $height }) => ` line-height: ${$height};`}
    transition: .3s all;
    font-weight: 6000;
    color: ${COLORS.WHITE};
    position: absolute;
    top: -8%;
    width: 100%;
    text-align: center;
    letter-spacing: -0.5px;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LogoWithTaskList: React.FC<LogoWithTaskListProps> = ({ version, title }) => {
  const titleToDisplay = useMemo(() => {
    if (title) return version === 'small' ? title[0] + title[1] : title;
    return undefined;
  }, [title, version]);

  let fontSize = 145;
  if (titleToDisplay && titleToDisplay.length > 13) {
    fontSize -= (Math.min(titleToDisplay.length, 20) - 13) * 5;
  }

  return (
    <StyledLogoWrapper
      $height={version === 'small' ? '2.5rem' : '3rem'}
      $width={version === 'small' ? `${SIDER_COLLAPSED_SIZE}rem` : `${LEFT_MENU_WIDTH}rem`}
    >
      <Svg
        svgImage={version === 'small' ? LogoSmall : LogoBig}
        height={version === 'small' ? '2.5rem' : '3rem'}
        width={version === 'small' ? `${SIDER_COLLAPSED_SIZE}rem` : `${LEFT_MENU_WIDTH}rem`}
        $colorPrimary={title ? 'transparent' : undefined}
        $colorPrimaryHover={title ? 'transparent' : undefined}
      />
      {title && <StyledHeader $fontSize={`${fontSize}%`}>{titleToDisplay}</StyledHeader>}
    </StyledLogoWrapper>
  );
};

export default LogoWithTaskList;
