import React from "react";
import {
    BorderOutlined,
    HomeFilled,
    HomeOutlined,
    HomeTwoTone, LogoutOutlined,
    RightCircleOutlined,
    SettingOutlined
} from "@ant-design/icons";

export enum IconType {
    HomeTwoTone = 1,
    HomeFilled,
    HomeOutlined,
    BorderOutlined,
    RightCircleOutlined,
    SettingOutlined,
    LogoutOutlined,
}

export const icons: Record<IconType, React.ReactNode> = {
    [IconType.HomeTwoTone]: React.createElement(HomeTwoTone),
    [IconType.HomeFilled]: React.createElement(HomeFilled),
    [IconType.HomeOutlined]: React.createElement(HomeOutlined),
    [IconType.BorderOutlined]: React.createElement(BorderOutlined),
    [IconType.RightCircleOutlined]: React.createElement(RightCircleOutlined),
    [IconType.SettingOutlined]: React.createElement(SettingOutlined),
    [IconType.LogoutOutlined]: React.createElement(LogoutOutlined),
}