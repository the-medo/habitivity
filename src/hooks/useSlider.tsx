import {ReduxState} from '../store';
import {useSelector} from "react-redux";

interface SliderState {
    sliderAutomaticallyCollapsed: boolean;
    sliderManuallyCollapsed: boolean;
    isCollapsed: boolean;
}

export function useSlider(): SliderState {
    const {sliderAutomaticallyCollapsed, sliderManuallyCollapsed} = useSelector((state: ReduxState) => state.menuLeftReducer);

    return {
        sliderAutomaticallyCollapsed,
        sliderManuallyCollapsed,
        isCollapsed: sliderAutomaticallyCollapsed || sliderManuallyCollapsed
    };
}