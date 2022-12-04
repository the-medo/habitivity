import styled from "styled-components";
import React from "react";
import {COLORS} from "../../styles/CustomStyles";


interface StyledSvgProps {
    height?: string;
    width?: string;
    $colorPrimary?: string;
    $colorSecondary?: string;
    $colorPrimaryHover?: string;
    $colorSecondaryHover?: string;
}

export const StyledSvg = styled.div<StyledSvgProps>`
  height: ${({height}) => height ?? 'fit-content'};
  width: ${({width}) => width ?? 'fit-content'};
  line-height: 0;
  transition: .5s all;
  
  svg {
    height: 100%;
    width: 100%;
  }
  
  svg g {
    transition: .3s all;
  }

  svg > .svg-color-primary {
    fill: ${({$colorPrimary}) => $colorPrimary ?? COLORS.WHITE};
    stroke: ${({$colorPrimary}) => $colorPrimary ?? COLORS.WHITE};
  }

  svg > .svg-color-secondary {
    fill: ${({$colorSecondary}) => $colorSecondary ?? COLORS.BLUE_DARK};
    stroke: ${({$colorSecondary}) => $colorSecondary ?? COLORS.BLUE_DARK};
  }
  
  &:hover {
    svg > .svg-color-primary {
      fill: ${({$colorPrimaryHover}) => $colorPrimaryHover ?? COLORS.BLUE_DARK};
      stroke: ${({$colorPrimaryHover}) => $colorPrimaryHover ?? COLORS.BLUE_DARK};
    }

    svg > .svg-color-secondary {
      fill: ${({$colorSecondaryHover}) => $colorSecondaryHover ?? COLORS.WHITE};
      stroke: ${({$colorSecondaryHover}) => $colorSecondaryHover ?? COLORS.WHITE};
    }
  }
`;

interface SvgProps extends StyledSvgProps{
    svgImage: React.FC;
}

const Svg: React.FC<SvgProps> = ({svgImage, ...rest}) => {
    const SvgImage = svgImage;

    return (
        <StyledSvg {...rest}>
            <SvgImage />
        </StyledSvg>
    )
}


export default Svg;

