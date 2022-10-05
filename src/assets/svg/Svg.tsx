import styled from "styled-components";
import React from "react";

const SVG_COLOR_PRIMARY = 'white';
const SVG_COLOR_PRIMARY_HOVER = 'rgb(77 92 106)';
const SVG_COLOR_SECONDARY = 'rgb(77 92 106)';
const SVG_COLOR_SECONDARY_HOVER = 'white';

interface StyledSvgProps {
    height?: string;
    width?: string;
    colorPrimary?: string;
    colorSecondary?: string;
    colorPrimaryHover?: string;
    colorSecondaryHover?: string;
}

const StyledSvg = styled.div<StyledSvgProps>`
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
    fill: ${({colorPrimary}) => colorPrimary ?? SVG_COLOR_PRIMARY};
    stroke: ${({colorPrimary}) => colorPrimary ?? SVG_COLOR_PRIMARY};
  }

  svg > .svg-color-secondary {
    fill: ${({colorSecondary}) => colorSecondary ?? SVG_COLOR_SECONDARY};
    stroke: ${({colorSecondary}) => colorSecondary ?? SVG_COLOR_SECONDARY};
  }
  
  &:hover {
    svg > .svg-color-primary {
      fill: ${({colorPrimaryHover}) => colorPrimaryHover ?? SVG_COLOR_PRIMARY_HOVER};
      stroke: ${({colorPrimaryHover}) => colorPrimaryHover ?? SVG_COLOR_PRIMARY_HOVER};
    }

    svg > .svg-color-secondary {
      fill: ${({colorSecondaryHover}) => colorSecondaryHover ?? SVG_COLOR_SECONDARY_HOVER};
      stroke: ${({colorSecondaryHover}) => colorSecondaryHover ?? SVG_COLOR_SECONDARY_HOVER};
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

