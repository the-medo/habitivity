import {ReduxState} from '../store';
import {useSelector} from "react-redux";
import {RightDrawerStatus} from "../components/menu/RightDrawer";

interface SliderState {
    leftMenuAutomaticallyCollapsed: boolean;
    leftMenuManuallyCollapsed: boolean;
    isLeftMenuCollapsed: boolean;

    rightDrawerStatus: RightDrawerStatus;
    isRightDrawerCollapsed: boolean;
    isRightDrawerHidden: boolean;
}

export function useSlider(): SliderState {
    const {
        leftMenuAutomaticallyCollapsed,
        leftMenuManuallyCollapsed,
        rightDrawerStatus,
    } = useSelector((state: ReduxState) => state.menuReducer);

    return {
        leftMenuAutomaticallyCollapsed,
        leftMenuManuallyCollapsed,
        isLeftMenuCollapsed: leftMenuAutomaticallyCollapsed || leftMenuManuallyCollapsed,
        rightDrawerStatus,
        isRightDrawerCollapsed: ["collapsed", "automaticallyCollapsed"].includes(rightDrawerStatus),
        isRightDrawerHidden: rightDrawerStatus === "hidden"
    };
}