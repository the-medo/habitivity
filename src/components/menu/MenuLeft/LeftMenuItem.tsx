import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {MenuLeftItem} from "./MenuLeft";
import React from "react";
import {useSlider} from "../../../hooks/useSlider";
import {icons, IconType} from "../../icons/icons";
import {COLORS} from "../../../styles/CustomStyles";

export interface LeftMenuNavLinkStyledProps {
    $isCollapsed: boolean;
}

const LeftLinkIcon = styled.span``;
const LeftLinkLabel = styled.span``;

export const LeftMenuNavLinkStyled = styled(NavLink)<LeftMenuNavLinkStyledProps>`
  //border: 1px solid red;
  border-radius: .5rem;
  padding: .5rem .5rem;

  display: block;
  height: 2rem;
  
  font-size: 1rem;
  line-height: 1rem;
  transition: .3s all;

  & > ${LeftLinkIcon} > span[role="img"].anticon {
    line-height: 1rem;
    color: ${COLORS.PRIMARY_DARK};
  }
  
  ${LeftLinkLabel} {
    padding-left: .5rem;
    display: ${ p => p.$isCollapsed ? 'none' : 'inline-block' };
  }

  &:hover, &[aria-current="page"].active {
    background-color: #d8e6df;
  }
`;

interface LeftMenuNavLinkProps {
    item: MenuLeftItem;
}

const LeftMenuItem: React.FC<LeftMenuNavLinkProps> = ({item,}) => {
    const {isLeftMenuCollapsed} = useSlider();

    return (
        <LeftMenuNavLinkStyled to={item.to} $isCollapsed={isLeftMenuCollapsed}>
            <LeftLinkIcon>{item.icon ? icons[item.icon] : (isLeftMenuCollapsed ? icons[IconType.RightCircleOutlined] : null)}</LeftLinkIcon>
            <LeftLinkLabel>{item.label}</LeftLinkLabel>
        </LeftMenuNavLinkStyled>
    );
}

export default LeftMenuItem;