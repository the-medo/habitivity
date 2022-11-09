import React, {useMemo} from "react";
import {LogoBig, LogoSmall} from "../../assets/svg";
import {LEFT_MENU_WIDTH, SIDER_COLLAPSED_SIZE} from "../../styles/GlobalStyleAndTheme";
import Svg, {
    StyledSvg,
    SVG_COLOR_PRIMARY,
    SVG_COLOR_PRIMARY_HOVER,
    SVG_COLOR_SECONDARY_HOVER
} from "../../assets/svg/Svg";
import styled from "styled-components";
import {initials} from "../../helpers/initials";

interface LogoWithTaskListProps {
    version: 'small' | 'big';
    title?: string;
}


const StyledHeader = styled.h2<{$fontSize: string}>`
  ${({$fontSize}) => `
    font-size: ${$fontSize};
  `}
`;

const StyledLogoWrapper = styled.div<{$width: string, $height: string}>`
  ${({$width, $height}) => `
    width: ${$width};
    height: ${$height};
  `}
  position: relative;
  
  ${StyledSvg}{
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover {
    ${StyledHeader} {
      color: ${SVG_COLOR_PRIMARY_HOVER};
    }

    .svg-color-secondary {
      fill: ${SVG_COLOR_SECONDARY_HOVER};
      stroke: ${SVG_COLOR_SECONDARY_HOVER};
    }
  }
  
  ${StyledHeader}{
    ${({$height}) => ` line-height: ${$height};`}
    transition: .3s all;
    font-weight: 6000;
    color: ${SVG_COLOR_PRIMARY};
    position: absolute;
    top: -8%;
    width: 100%;
    text-align: center;
    letter-spacing: -.5px;    
    padding-left: .25rem;
    padding-right: .25rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const LogoWithTaskList: React.FC<LogoWithTaskListProps> = ({version, title}) => {
    const titleToDisplay = useMemo(() => title
        ? (version === 'small' ? (title[0] + title[1]) : title)
        : undefined,
        [title, version]);

    let fontSize = 145;
    if (titleToDisplay && titleToDisplay.length > 13) {
        fontSize -= (Math.min(titleToDisplay.length, 20) - 13) * 5 ;
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
                colorPrimary={title ? "transparent" : undefined}
                colorPrimaryHover={title ? "transparent" : undefined}
            />
            {title && <StyledHeader $fontSize={`${fontSize}%`}>{titleToDisplay}</StyledHeader>}
        </StyledLogoWrapper>
    );
}

export default LogoWithTaskList;