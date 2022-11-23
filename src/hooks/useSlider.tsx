import {ReduxState} from '../store';
import {useSelector} from "react-redux";
import {RightDrawerStatus} from "../components/menu/DrawerRight/RightDrawer";

interface SliderState {
    leftMenuAutomaticallyCollapsed: boolean;
    leftMenuManuallyCollapsed: boolean;
    isLeftMenuCollapsed: boolean;
    isLeftMenuWithContent: boolean;

    rightDrawerStatus: RightDrawerStatus;
    isRightDrawerCollapsed: boolean;
    isRightDrawerHidden: boolean;
}

export function useSlider(): SliderState {
    const {
        leftMenuAutomaticallyCollapsed,
        leftMenuManuallyCollapsed,
        rightDrawerStatus,
        items,
    } = useSelector((state: ReduxState) => state.menuReducer);

    return {
        leftMenuAutomaticallyCollapsed,
        leftMenuManuallyCollapsed,
        isLeftMenuCollapsed: leftMenuAutomaticallyCollapsed || leftMenuManuallyCollapsed,
        isLeftMenuWithContent: items.length > 0,
        rightDrawerStatus,
        isRightDrawerCollapsed: ["collapsed", "automaticallyCollapsed"].includes(rightDrawerStatus),
        isRightDrawerHidden: rightDrawerStatus === "hidden"
    };
}